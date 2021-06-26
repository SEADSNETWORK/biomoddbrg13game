const { Client }  = require('node-osc');

const SimplexNoise = require('simplex-noise');
const simplex = new SimplexNoise(Math.random);

const   WINO_AMOUNT = 2;
const WINO_SPEED = 100000.0;

const PLANT_AMOUNT = 3;
const PLANT_SPEED = 1000.0;

const  HUMIDITY_AMOUNT = 1;
const HUMIDITY_SPEED = 1200.0;

const  GAME_AMOUNT = 1;
const  GAME_SPEED = 1000;

let game_running = true;

const SPEED = 1000;

class DataSender {
  constructor(ID_){
    this.ID = ID_;
    this.seed = Math.random()*12345;
    this.value;
    this.counter = 0;
  }
  
    setValue(v){
      this.value = v;
    }
  
    type(){
        return "undefined";
    }
  
    addr(){
        return "/"+this.type()+"/"+this.ID;
    }
  
    message(){
    return this.addr() + "   " + this.value + "\n";
  }
   
    update(){
        this.counter++;
        return {
            addr: this.addr(),
            value: this.value
        }
    }

    noise(seed, val){
        return simplex.noise2D(seed, val)
    }
  
}


class Winogradsky extends DataSender {
   
  constructor(ID_){
    super(ID_);
  }
  
    type(){
        return "winogradsky";
    }
  
    update(){
        this.setValue(this.noise(this.seed, this.counter));
        return super.update();
  } 
};

class Plant extends DataSender {
   
  constructor(ID_){
    super(ID_);
  }
  
  type(){
    return "plant";
  }
  
  update(){
    this.setValue(this.noise(this.seed, this.counter));
    return super.update();
  } 
}

class Humidity extends DataSender {
   
    constructor(ID_){
    super(ID_);
  }
  
  type(){
    return "humidity";
  }
  
  update(){
    this.setValue(this.noise(this.seed, this.counter));
    return super.update();
  } 
}

class GamePress extends DataSender {
   
  constructor(ID_){
    super(ID_);
    this.target = 0;
    this.setTarget();
  }
  
  setTarget(){
    this.target = this.count + Math.floor(Math.random()*GAME_SPEED);
  }
  
    type(){
    return "gamepress";
  }
  
    update(){
    let check = (this.count == this.target);
    
    this.value = check?1.0:0.0;
    if(check){
      setTarget();
    }  
    return super.update();
  }
  
  message(){
    return this.addr() + "   " + this.target + "->" + this.frameCount +"\n";
  }
  
}


class OscSound {
    constructor() {

        this.address = 'localhost'
        this.port = 12345
        this.client = new Client(this.address, this.port);
        this.senders = [];
        this.enable = false;

        for (let i = 0; i < WINO_AMOUNT; i++){
            this.senders.push(new Winogradsky(i));
         }
         
         for (let i = 0; i < PLANT_AMOUNT; i++){
            this.senders.push(new Plant(i));
         }
         
         for (let i = 0; i < HUMIDITY_AMOUNT; i++){
            this.senders.push(new Humidity(i));
         }
         
         for (let i = 0; i < GAME_AMOUNT; i++){
            this.senders.push(new GamePress(i));
         }

         const parent = this;
            setInterval(()=>{
                const v = parent.update();
            }, SPEED)

    }

    send(address, message) {
        this.client.send(address, message, () => {
            //client.close();
        });
    }

    close() {
        this.client.close();
    }

    update(){
        if (this.enable){
            this.startGame();
        } else {
            this.endGame();
        }

        this.send("/installationactive", 1);

        this.senders.forEach(sender=>{
            const v = sender.update();
            this.send(v.addr, v.value);
        })
    }

    startGame(){
        this.send("/gameactive/0", 1);
    }

    endGame(){
        this.send("/gameactive/0", 0);
    }







}

exports.default = OscSound;