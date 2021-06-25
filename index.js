// /**
//  * GLOBALS
//  */
const express               = require('express');
const app                   = express();
const path                  = require('path');
const http                  = require('http');
const server                = http.createServer(app);
const io                    = require('socket.io')(server);
const config                = require('./package.json');
const settings              = require('./settings.json');
const logo                  = require('./src/logo').default(config, settings);
const database              = require('./src/database').default(settings);
const cleanup               = require('./src/cleanup').default();
const gameWorld             = require('./src/setupGameWorld').default(settings.game.resolution);
const dmx                   = new (require("./src/artnet.js").default)();
const hue                   = new(require("./src/hue").default)();
const osc                   = new(require("./src/osc").default)();
let clusterController = null;
const { nanoid } = require('nanoid')



const PHASES = Object.freeze({
    LOAD: "load",
    RUNNING: "running",
    END: "ended"
  });

let phase = PHASES.END;

const players = {
    red: false,
    green: false,
    blue: false,
    reds: false,
    greens: false,
    blues: false
}

const state = {
    score : {red: 0, green: 0, blue: 0},
    mirrors: [],
    plants: [],
    red: 0,
    green: 0,
    blue: 0
}

const scoreHistory = []

// database.connect()
// .then(({client, list, add, getData, close})=>{
    // cleanup.init(close);
    // list();

    const onUpdate = (plantclusters)=>{
        io.emit("/updateSensors", plantclusters);
    }
    clusterController = new (require('./src/ClusterController').default)(settings.sensorTypes, settings.plantClusters, onUpdate);

    /**
     * SOOCKET SETUP
     */
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });

        // kick it
        socket.emit("/sensortypes", clusterController.sensorTypes);
        socket.emit("/gamesettings", {...settings.game});
        socket.emit("/players", players);

        const updatePhase = (np)=>{
            phase = np;
            io.emit("/phase", np);
        }

        const sendHighScores = ()=>{
            let HS1 = 0;
            let HSA = 0;

            scoreHistory.forEach(({red, green, blue})=>{
                if (red > HS1){
                    HS1 = red;
                }  
                
                if (green > HS1){
                    HS1 = green;
                } 
                
                if (blue > HS1){
                    HS1 = blue;
                }
                const a = red+green+blue;
                if (a > HSA){
                    HSA  = a;
                }
            })

            socket.emit("/highscore", {HS1, HSA});
        }   

        socket.on("/startgame", (player)=>{
            players[player] = true;
            io.emit("/players", players);
            sendHighScores();


            if (phase == PHASES.END){
                
                updatePhase(PHASES.LOAD);

                scoreHistory.push(state.score);
                sendHighScores();

                while(scoreHistory.length > 100){
                    scoreHistory.pop();
                }

                state.score = {red: 0, green: 0, blue: 0};
                state.red = {x: 0, y: 0};
                state.green = {x: 0, y: 0};
                state.blue = {x: 0, y: 0};
                state.mirrors = [];
                state.plants = [];

                setTimeout(()=>{
                    for (let index = 0; index < settings.game.mirrorsPerPlayer; index++) {
                        for (let c = 0; c < 3; c++) {
                            let color = ["red", "green", "blue"][c];

                            if (players[color]){
                                state.mirrors.push({
                                    player: color,
                                    x: Math.random(),
                                    y: Math.random(),
                                    rx : Math.random(),
                                    ry : Math.random() ,
                                    ID: nanoid()
                                })   
                            }
                        }
                    }
    
                    for (let index = 0; index < settings.game.plantsAmount; index++) {
                        state.plants.push({
                            x: Math.random(),
                            y: Math.random(),
                            red: false,
                            green: false,
                            blue: false,
                            ID: nanoid()
                        })
                    }
                    updatePhase(PHASES.RUNNING);
                    dmx.setAll(dmx.colEnum.off)
                    hue.off1();
                    hue.off2();
                    osc.enable = true;
                    
                }, settings.game.beginningTime * 1000);

                
                setTimeout(()=>{
                    for (const key in players) {
                        players[key] = false;
                    }
                    updatePhase(PHASES.END);
                    sendHighScores();
                    dmx.setAll(dmx.colEnum.peach)
                    hue.on1();
                    hue.on2();
                    osc.enable = false;
                    io.emit("/players", players);
                }, (settings.game.duration + settings.game.beginningTime) * 1000)
            }
        })

        // socket.on("/updatePlant", (np)=>{
        //     state.plants.forEach((p, i, arr)=>{
        //         if (p.ID == np.ID){
        //             arr[i] = np;
        //         }
        //     })
        // })

        socket.on("/updateMirror", ({index, x, y, rx, ry})=>{
            const m = state.mirrors[index];
            if (m){
                m.x = x;
                m.y = y;
                m.rx = rx;
                m.ry = ry;
            }
        });

        socket.on("/updateLight", ({color, rotation})=>{
            state[color] = rotation;
        })

        socket.on("/givePlayers", ()=>{
            socket.emit("players", players);
        });

        socket.on("/giveGameUpdate", ()=>{
            socket.emit("/gameUpdate", state);
        })

        socket.on("/score", ({player, score})=>{
            state.score[player] += score;
            socket.emit("/score_", state.score);
        })

        socket.on("/selected", (v)=>{
            socket.emit("/selected_", v);
        })

        socket.on("/rotateMirror_", (v)=>{
            io.emit("/rotateMirror", v);
        })

        socket.on("/moveMirror_", (v)=>{
            io.emit("/moveMirror", v);
        })

        socket.on("/lights", (lights)=>{
            // change lights here....
            // console.log(lights);
            if (dmx.workers.length == 0){
                lights.forEach((l)=>{
                    dmx.setColor(l.index, l.colors);    
                })
            }
        })

      });

    /**
     * SERVER SETUP
     */
    app
    .use(express.static(path.join(__dirname, 'public/build/')))
    .get('/push', (req, res)=>{
        const err = [];
        const values = {};
        settings.requiredFields.forEach((fieldname)=>{
            if (! req.query[fieldname]){
                err.push(`Field ${fieldname} is required`);
            } else {
                values[fieldname] = req.query[fieldname];
            }
        })

        values.createdAt = new Date();

        if (err.length == 0){
            add(values)
            res.send(`New data has been added added: ${JSON.stringify(values)} `)
        } else {
            res.send(err);
        }
    })
    .get('/data', (req, res)=>{
        getData(req.query)
        .then((result)=>{
            res.send( result);
        })
    })
    .get('/gameStat', (req, res)=>{
        res.send({players, phase});
    })
    .get('*', (req, res) => res.sendFile(path.join(__dirname+'/public/frontx/build/index.html')))

    server
    .listen(process.env.PORT || settings.port, () => {
        logo();
        dmx.setAll(dmx.colEnum.peach);
        hue.on1();
        hue.on2();
        osc.enable = false;
    })
// }).catch(console.error)

