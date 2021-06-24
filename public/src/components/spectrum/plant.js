import {IO_STATE, InteractiveObject} from './interactiveObject.js'

import {distToSegment} from './auxi'

// ===============================
//      P L A N T
// ===============================
// Them plants

class Plant extends InteractiveObject {
    constructor({location, size, color, alternativeColor, onClick}){
        super(location, size);
        this.color = color;
        this.alternativeColor = alternativeColor;
        this.collisionColor = 'red';
        this.colorplaceholder = color;
        this.onClick = onClick;
        this.currenctColors = [];
    }

    detectCollision(lights){
        let col = false;
        this.currenctColors = [];
        for (let light of lights.values()) {
            for (let j = 0; j < light.beam.segments.length; j++) {
                var segment = light.beam.segments[j];

                let line_v = {x: segment.p1_x, y: segment.p1_y};

                let line_w = {x: segment.p2_x, y: segment.p2_y};

                let point =  {x: this.location.x, y: this.location.y};
                if (distToSegment(point, line_v, line_w) < this.size/2){   // collision
                    col = true;
                    this.currenctColors.push(light.color);
                }
            }
        }
        if (col) {
            this.color = this.collisionColor;
        } else {
            this.color = this.colorplaceholder
        }

    }
    draw(p5){

        if (this.currenctColors){
            console.log(this.currenctColors);
        }

        p5.noStroke();
        if (this.state === IO_STATE.UNSELECTED || this.state === IO_STATE.HOVERING){
            p5.fill(this.color);
        } else {
            if (this.state === IO_STATE.CLICKED ){
                this.onClick();
            }
            p5.fill(this.alternativeColor);
        }

        let size = this.size;
        if (this.state === IO_STATE.HOVERING){
            size+=Math.sin(p5.millis())*5;
        }
        
        p5.circle(this.location.x, this.location.y, size);
    }
}

export default Plant;