import React from "react";
import Sketch from "react-p5";
import {getPointOnCircle} from './auxi'
import Plant from './plant'
import Light from './light'
import Mirror from "./mirror";
import { IO_STATE } from "./interactiveObject";
import { ACTIONS as DATA_ACTIONS } from "../../reducers/DataReducer"
import { Grid } from "./grid";


// ===============================
// ===============================
//      G A M E
// ===============================
// ===============================
export default ({socket, player, players, safeDistance, scoreUpdate}) => {

    // enumerations

    // globals
    const lights        = new Map();
    const plants        = [];
    const mirrors        = [];
    let grid;

    // -- keep track of all objects we want to draw 
    // --- expects they implemented a draw(p5) method
    const toDraw        = [];

    // -- keep track of all objects we want to interact with 
    // --- expects they implemented all interactive methods as defined in the InteractiveObject class
    const toInteract    = [];

    const settings = {
        background: "black"
    }

    const lightSettings = {
        size: 30, 
        controlOffset: 20,
        offset: .4,
        strokeWeight: 2
    };

    const plantSettings = {
        amount: 1,
        size: 40,
        color: "white",
        alternativeColor: "lightgreen"
    }

    const mirrorSettings = {
        size: 50,
        alternativeColor: "0f0"
    }
    
    // ===============================
    //      A U X
    // ===============================
    const getCenter = (p5)=>{
        return p5.createVector(p5.width*.5, p5.height*.5);
    }

    // const getRandomPoint = (p5)=> p5.createVector(Math.random()*p5.width, Math.random()*p5.height);
    
    // ===============================
    //      S E T U P
    // =============================== 
	const setup = (p5, canvasParentRef) => {
        console.log("game started")
        // setup canvas
        if (canvasParentRef && canvasParentRef.offsetWidth){
            console.log(canvasParentRef.offsetWidth)
            p5.createCanvas(canvasParentRef.offsetWidth, window.screen.height).parent(canvasParentRef);
        } else {
            throw "canvas not found"
        }

        grid = new Grid(100, "grey", p5);

        // setup sockets
        socket.on("/gameUpdate", (gameUpdate)=>{
            const colors = ["red", "green", "blue"];
            if (plants.length){
                // update location

            } else {
                //  instantiate 
                gameUpdate.plants.forEach((p, i, arr)=>{
                    plants[i] = new Plant({location: p5.createVector(p.x*p5.width, p.y*p5.height), ID: p.ID,
                        onClick: ()=>{
                            socket.emit("/selected", {type: "plant", index: i});
                        },...plantSettings});
                    toDraw.push(plants[i]);
                    toInteract.push(plants[i]);
                });
            }

            if (mirrors.length){
                // update
                mirrors.forEach((mirror, i)=>{
                    if (mirror && mirror.state == IO_STATE.UNSELECTED && mirror.handle.state == IO_STATE.UNSELECTED && gameUpdate.mirrors[i]){
                        const newmirror = gameUpdate.mirrors[i];
                        mirror.handle.target = p5.createVector(newmirror.rx, newmirror.ry);
                        mirror.setNormalizedLocation(newmirror.x, newmirror.y, p5);
                    }
                })
            } else {
                gameUpdate.mirrors.forEach((m, i, arr)=>{
                    mirrors[i] = new Mirror({location: p5.createVector(m.x*p5.width, m.y*p5.height), player, color: m.player, ID: m.ID || Math.random(),
                        onClick: ()=>{
                            socket.emit("/selected", {type: "mirror", index: i});
                        },
                        ...mirrorSettings}, p5);
                    const dir = p5.createVector(m.rx, m.ry);
                    mirrors[i].handle.direction  = dir;
                    mirrors[i].handle.target = dir;
                    toDraw.push(mirrors[i]);
                    toInteract.push(mirrors[i]);
                });

                colors.forEach((color, i)=>{
                    
                        lights.set(color, new Light(
                            {
                                color, 
                                player,
                                hide: !players[color],
                                location: getPointOnCircle(p5, getCenter(p5), p5.width*lightSettings.offset, 3, i),
                                ...lightSettings
                        }, mirrors, p5));
                        toDraw.push(lights.get(color));
                        toInteract.push(lights.get(color));
                    
                })
            }

            if (lights){
                // update lights position
                colors.forEach(c=>{
                    const l = lights.get(c);
                    if (l && l.state == IO_STATE.UNSELECTED){
                        l.handle.target = p5.createVector(gameUpdate[c].x,gameUpdate[c].y);
                    }
                })
            }
        })

        socket.on("/rotateMirror", ({index, value})=>{
            if (index && value){
                mirrors[index].rotate(value);
            }
        });

        socket.on("/moveMirror", ({index, value})=>{
            if (index && value){
                mirrors[index].location.x += value.x || 0;
                mirrors[index].location.y += value.y || 0;
            }
        })
	};


    // ===============================
    //      D R A W
    // =============================== 
	const draw = (p5) => {
		p5.background(settings.background);
        grid.draw();
        
        toDraw.forEach(td=>td.draw(p5));
        plants.forEach(mr=>mr.detectCollision(lights));

        ["red", "green", "blue"].forEach(c=>{
            const l = lights.get(c);
            if (l && l.handle.checkChanged()){
                socket.emit("/updateLight", {color: c, rotation: {
                    x: l.handle.target.x,
                    y: l.handle.target.y
                }})
            }
        })

        mirrors.forEach((mirror, index)=>{
            if (mirror && mirror.handle.checkChanged() || mirror.checkChanged()){
                socket.emit("/updateMirror", 
                    {
                        index,
                        x: mirror.location.x / p5.width,
                        y: mirror.location.y / p5.height,
                        rx : mirror.handle.target.x,
                        ry : mirror.handle.target.y
                    }
                )
            }
        })


        if (p5.frameCount%scoreUpdate == 0){
            let score = 0;

            socket.emit("/giveGameUpdate");
            if (plants && plants[0]){
                socket.emit("/lights", plants.map((p, index)=>{
                    if (p.currentColors[player]){
                        score++;
                    }

                    const colors = {
                        red: p.currentColors.red,
                        green: p.currentColors.green,
                        blue: p.currentColors.blue
                    }

                    p.currentColors = {
                        red: false,
                        green: false,
                        blue: false
                    };
                    return {
                    index,
                    colors
                }}))
            }



            socket.emit("/score", {player, score})

        }
	};

    // ===============================
    //      I / O
    // =============================== 
	const mousePressed = (p5)=>{
        toInteract.forEach(ti=>ti.mousePressed(p5));
	}

    const mouseReleased = (p5)=>{
        toInteract.forEach(ti=>ti.mouseReleased(p5));
    }

    const mouseDragged = (p5)=>{
        toInteract.forEach(ti=>ti.mouseDragged(p5));
    }

    const mouseMoved = (p5)=>{
        toInteract.forEach(ti=>ti.mouseMoved(p5));
    }

	return <Sketch  setup={setup} 
                    draw={draw} 
                    mousePressed={mousePressed} 
                    mouseReleased={mouseReleased} 
                    mouseDragged={mouseDragged}
                    mouseMoved={mouseMoved}
                    
                    />;
};
