class Dmx {

    constructor(){

        this.colEnum = Object.freeze({white:[255,255,255], off:[0,0,0], red:[255,0,0],green:[0,255,0], blue:[0,0,255]});

        this.colorArr = [];
        this.nmbLights = 17;

        for (var i = 0; i < (this.nmbLights*3); i++) {
            this.colorArr.push(0);
        }


        var options = {
            host: '192.168.0.100'
        }

        this.artnet = require('artnet')(options);

    }


    transmit(){
        let a = this.artnet;
        a.set(1, 1, this.colorArr, function (err, res) {
            if (err) {
                console.error('error sending to universe ' + i, err);
                a.close();

            } else {
                console.error('sent: ' + res + ' bytes');
                a.close();
            }});
    }


    changeCol(light, col) {

        let idx = (light*3)-3;
        for (var i = 0; i < 3; i++) {
            this.colorArr[idx+i]= col[i];
        }
    }


    setAll(col){
        for (var i = 0; i < this.nmbLights; i++) {
            this.changeCol(i, col);
        }
        this.transmit();
    }

    setOne(light, col){
        this.changeCol(light, col);
        this.transmit();
    }

}



//dm = new Dmx();

//dm.setAll(dm.colEnum.blue);