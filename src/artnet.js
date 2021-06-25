const {
    promisify
} = require('util');

class Dmx {

    constructor() {

        this.colEnum = Object.freeze({
            static: [204, 191, 178],
            white: [204, 191, 178],
            off: [0, 0, 0],
            red: [255, 102, 76],
            green: [153, 255, 127],
            blue: [127, 166, 255],
            peach: [70, 60, 40],
            rg1: [166, 25, 10],
            rg2: [110, 134, 0],
            gb1: [0, 205, 115],
            gb2: [133, 187, 255],
            rb1: [140, 72, 221],
            rb2: [255, 80, 80]
        });

        this.groups = Object.freeze({
            sector1: [1, 4, 9],
            sector2: [11, 5, 2],
            sector3: [7, 8, 10, 12],
            sector4: [13, 16],
            sector5: [14, 15]
        });

        this.groupsArray = [
            [1, 4, 9],
            [11, 5, 2],
            [7, 8, 10, 12],
            [13, 16],
            [14, 15]
        ]



        this.colorArr = [];
        this.nmbLights = 18; //nmb +1
        this.fadeTime = 7;
        this.fadeSteps = 100;

        for (var i = 0; i < (this.nmbLights * 3); i++) {
            this.colorArr.push(0);
        }

        this.workers = [];


        var options = {
            host: '192.168.0.100'
        }

        this.artnet = require('artnet')(options);


    }


    transmit() {

        var options = {
            host: '192.168.0.100'
        }

        this.artnet = require('artnet')(options);
        let a = this.artnet;
        a.set(1, 1, this.colorArr, function (err, res) {
            if (err) {
                console.error('error sending to universe ', err);
                a.close();

            } else {
                // console.error('sent: ' + res + ' bytes');
                a.close();
            }
        });
    }

    // [0-5] [x, x, x]
    setColor(sector, colors){
        const group = this.groupsArray[sector];
        let amnt = 0;
        ["red", "green", "blue"].forEach(c=>{
            if (colors[c]){
                amnt++;
            }
        })

        if (amnt == 3){
            group.forEach(i=>{
                this.FadeTo(i, this.colEnum.white).then(() => {})
            })
        } else if (amnt == 2){
            if (colors.red && colors.green){
                this.setGradient(group, this.colEnum.rg1, this.colEnum.rg2)
            } else if (colors.red && colors.blue){
                this.setGradient(group, this.colEnum.rb1, this.colEnum.rb2)
            } else if (colors.green && colors.blue){
                this.setGradient(group, this.colEnum.gb1, this.colEnum.gb2)
            } 
        } else if (amnt == 1){
            if (colors.red){
                this.setGradient(group, this.colEnum.white, this.colEnum.red);
            } else if (colors.green){
                this.setGradient(group, this.colEnum.white, this.colEnum.green);
            } else {
                this.setGradient(group, this.colEnum.white, this.colEnum.blue);
            }
        } else {
            group.forEach(i=>{
                this.FadeTo(i, this.colEnum.off).then(() => {})
            })
        }
    }

    setGradient(lights, col1, col2) {
        for (var i=0; i<lights.length; i++){
            const index = i;
            if (i%2 ==0){
                this.FadeTo(lights[index], col1).then(() => {
                this.FadeTo(lights[index], col2);
                })
            } else {
                this.FadeTo(lights[index], col2).then(() => {
                    this.FadeTo(lights[index], col1);                       
                })
            }
        }
    }

    changeCol(light, col) {

        let idx = (light * 3) - 3;
        for (var i = 0; i < 3; i++) {
            this.colorArr[idx + i] = col[i];
        }
    }


    setAll(col) {
        for (var i = 0; i < this.nmbLights; i++) {
            this.changeCol(i, col);
        }
        this.transmit();
    }

    setOne(light, col) {
        this.changeCol(light, col);
        this.transmit();
    }

    getOne(light) {
        var res = [];
        let idx = (light * 3) - 3;
        for (var i = 0; i < 3; i++) {
            res[i] = this.colorArr[idx + i];
        }
        return res;
    }

    async FadeTo(light, col) {
        const sleep = promisify(setTimeout);
        this.workers.push(light);
        let cl = this.getOne(light);
        let rc = (cl[0] - col[0]) / this.fadeSteps,
            gc = (cl[1] - col[1]) / this.fadeSteps,
            bc = (cl[2] - col[2]) / this.fadeSteps;

        for (var i = 0; i < this.fadeSteps; i++) {
            await sleep(this.fadeTime);
            this.setOne(light, cl);
            setTimeout(()=>{
                this.workers.pop();
            }, 1500)
            cl = [cl[0] - rc, cl[1] - gc, cl[2] - bc];
        }
    }

    

    setRed(lights) {
        this.FadeTo(lights[0], this.colEnum.red).then(() => {
            this.FadeTo(lights[1], this.colEnum.white).then(() => {
                this.FadeTo(lights[2], this.colEnum.red).then(() => {
                    this.FadeTo(lights[3], this.colEnum.white);
                });
            });
        });
    }


    setGreen(lights) {
        this.FadeTo(lights[0], this.colEnum.green).then(() => {
            this.FadeTo(lights[1], this.colEnum.white).then(() => {
                this.FadeTo(lights[2], this.colEnum.green).then(() => {
                    this.FadeTo(lights[3], this.colEnum.white);
                });
            });
        });
    }

    setBlue(lights) {
        this.FadeTo(lights[0], this.colEnum.blue).then(() => {
            this.FadeTo(lights[1], this.colEnum.white).then(() => {
                this.FadeTo(lights[2], this.colEnum.blue).then(() => {
                    this.FadeTo(lights[3], this.colEnum.white);
                });
            });
        });
    }

    setRg(lights) {
        this.FadeTo(lights[0], this.colEnum.rg1).then(() => {
            this.FadeTo(lights[1], this.colEnum.rg2).then(() => {
                this.FadeTo(lights[2], this.colEnum.rg1).then(() => {
                    this.FadeTo(lights[3], this.colEnum.rg2);
                });
            });
        });
    }

    setGb(lights) {
        this.FadeTo(lights[0], this.colEnum.gb1).then(() => {
            this.FadeTo(lights[1], this.colEnum.gb2).then(() => {
                this.FadeTo(lights[2], this.colEnum.gb1).then(() => {
                    this.FadeTo(lights[3], this.colEnum.gb2);
                });
            });
        });
    }

    
    setRb(lights) {
        this.FadeTo(lights[0], this.colEnum.rb1).then(() => {
            this.FadeTo(lights[1], this.colEnum.rb2).then(() => {
                this.FadeTo(lights[2], this.colEnum.rb1).then(() => {
                    this.FadeTo(lights[3], this.colEnum.rb2);
                });
            });
        });
    }

    FadeAll(col1, col2) {
        for (var i = 0; i < this.nmbLights; i++) {
            this.FadeTo(i, col1).then(() => {
                for (var i = 0; i < this.nmbLights; i++) {
                    this.FadeTo(i, col2)
                }
            });
        };
    }



}

exports.default = Dmx;


// dm = new Dmx();

// dm.setAll(dm.colEnum.white)

//sector 1
//dm.setRed(dm.groups.sector1);
// dm.setGreen(dm.groups.sector1);
// dm.setBlue(dm.groups.sector1);

// dm.setRg(dm.groups.sector1);
// dm.setRb(dm.groups.sector1);
// dm.setGb(dm.groups.sector1);

//sector 2

// dm.setRed(dm.groups.sector2);
// dm.setGreen(dm.groups.sector2);
// dm.setBlue(dm.groups.sector2);

// dm.setRg(dm.groups.sector2);
//dm.setRb(dm.groups.sector2);
//dm.setGb(dm.groups.sector2);

//sector 3

// dm.setRed(dm.groups.sector3);
// dm.setGreen(dm.groups.sector3);
// dm.setBlue(dm.groups.sector3);

// dm.setRg(dm.groups.sector3);
//dm.setRb(dm.groups.sector3);
// dm.setGb(dm.groups.sector3);

//sector 4

//dm.setRed(dm.groups.sector4);
//dm.setGreen(dm.groups.sector4);
//dm.setBlue(dm.groups.sector4);

// dm.setRg(dm.groups.sector4);
// dm.setRb(dm.groups.sector4);
// dm.setGb(dm.groups.sector4);

//sector 5

// dm.setRed(dm.groups.sector5);
// dm.setGreen(dm.groups.sector5);
// dm.setBlue(dm.groups.sector5);

// dm.setRg(dm.groups.sector5);
// dm.setRb(dm.groups.sector5);
//  dm.setGb(dm.groups.sector5);