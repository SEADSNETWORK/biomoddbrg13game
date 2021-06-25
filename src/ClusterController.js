const SimplexNoise = require('simplex-noise');

const MODE = Object.freeze({
    "SIMULATION": 1,
    "HYBRID": 2,
    "FORCED": 3
})

const mode = MODE.HYBRID;//SIMULATION;
const updateSpeed = 3000;
const maxAmountOfFailed = 10;

class Sensor {
    constructor(_type, _name) {
        this.type = _type;
        this.name = _name;
        this.value = 0;
        this.seed = Math.random() * 123;
        this.simplex = new SimplexNoise(Math.random);
        this.counter = 0;
        this.updated = true;
        this.failedRequest = 0;
    }

    simulateValue() {
        this.setValue(Math.abs(this.simplex.noise2D(this.seed, this.counter)), false, true)
    }

    setValue(_newvalue, sens, untouchFailed) {
        this.counter++;


        if (sens) {
            _newvalue = JSON.stringify(_newvalue);

            if (_newvalue !== "NaN") {


                if (this.type === "Humidity") {
                    _newvalue = _newvalue.split(",")[0];
                } else if (this.type === "Temperature") {
                    _newvalue = _newvalue.split(",")[1];
                }

                _newvalue = parseFloat(_newvalue.split(":")[1]);
                this.value = _newvalue;
            } else {
                untouchFailed = true;
            }


            this.value = _newvalue;
            this.updated = true;

            if (!untouchFailed) {
                this.failedRequest = 0;
            }
        }
    }

    wasUpdated() {
        switch (mode) {
            case MODE.SIMULATION:
                this.simulateValue();
                break;
            case MODE.HYBRID:
                if (this.failedRequest > maxAmountOfFailed) {
                    this.simulateValue();
                }
                break;
            case MODE.FORCED:
                break;
        }

        let rval = this.updated;
        if (!rval) {
            this.failedRequest++;
        } else {
            this.failedRequest = 0;
        }
        this.updated = false;
        return rval;
    }
}

class PlantCluster {
    constructor(_name, _sensors) {
        this.name = _name;
        this.sensors = [];
        _sensors.forEach(s => {
            this.sensors.push(new Sensor(s.type, s.name))
        })
    }

    wasUpdated(){
        let rv = false;
        let counter = 0;
        this.sensors.forEach(s=>{
            const uval = s.wasUpdated();
            rv = rv || uval;
        })
        return rv;
    }
}


class ClusterController {
    constructor(_sensorTypes, _plantClusters, _onUpdate) {
        this.plantclusters = [];
        this.sensorTypes = [];
        this.onUpdate = _onUpdate;

        _sensorTypes.forEach(st => {
            this.sensorTypes.push(st);
        })

        _plantClusters.forEach(pc => {
            this.plantclusters.push(new PlantCluster(pc.name, pc.sensors))
        });

        const parent = this;

        setInterval(() => {
            parent.update();
        }, updateSpeed);
        parent.update();
    }

    sensorUpdate(data){
        let espid = data.clientName;
        for (var i = 0; i< this.plantclusters.length; i++ ){

                        if (this.plantclusters[i].name === espid){
                            this.plantclusters[i].sensors[0].setValue(data.sensorData, true);
                        }
        }
    }




    update(){
        let newvalues = false;

        this.plantclusters.forEach(pc=>{
            pc.sensors.forEach(sensor=>{
                const nval = pc.wasUpdated();
                newvalues = newvalues || nval;
            })

        })

        if (newvalues){
            let pc = JSON.stringify(this.plantclusters)
            pc = JSON.parse(pc);

            pc.forEach(plant=>{
                plant.sensors.forEach((sensor, index)=>{
                    plant.sensors[index] = {
                        name: sensor.name,
                        value: sensor.value,
                        type: sensor.type
                    }
                    
                })
            })

            this.onUpdate(this.plantclusters);

        }

    }
};



exports.default = ClusterController;