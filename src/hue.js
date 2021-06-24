class Hue {
    constructor() {

        this.v3 = require('node-hue-api').v3;
        this.LightState = this.v3.lightStates.LightState;
        this.host = '192.168.0.150'
        this.USERNAME = 'lfhTLfdMvLoyWQUxPWG5hOAIqCNPpU7YxplGoiUM'
        // The name of the light we wish to retrieve by name
        this.LIGHT_ID;
        this.con =  this.v3.api.createLocal(this.host).connect(this.USERNAME);

    }




    on(lID){
        const state = new this.LightState().on();
        this.con.then( api => {return api.lights.setLightState(lID, state);}).then(result => {
            console.log(`Light state change was successful? ${result}`);
        })
    }

    off(lID){
        const state = new this.LightState().off();
        this.con.then( api => {return api.lights.setLightState(lID, state);}).then(result => {
            console.log(`Light state change was successful? ${result}`);
        })
    }



    on1(){
        this.on(4);
    }

    off1(){
        this.off(4);
    }


    on2(){
        this.on(5);
    }

    off2(){
        this.off(5);
    }

}



// Usage;
// var h = new Hue();
//
// h.on1();
// h.on2();