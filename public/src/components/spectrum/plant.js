import {IO_STATE, InteractiveObject} from './interactiveObject.js'

import {distToSegment} from './auxi'
import {Flower as FlowerGraphic} from './graphics';

// ===============================
//      P L A N T
// ===============================
// Them plants

class Plant extends InteractiveObject {
    constructor({location, size, color, alternativeColor, onClick, p5, grid, collisionColor}){
        super(location, size);
        this.color = color;
        this.alternativeColor = alternativeColor;
        this.collisionColor = collisionColor;
        this.colorplaceholder = color;
        this.onClick = onClick;
        this.currentColors = {
            red: false,
            green: false,
            blue: false
        };

        this.flower = new FlowerGraphic(Math.ceil(p5.random(4,6)), Math.ceil(p5.random(2,4)), Math.ceil(p5.random(5, 8)), p5.color(p5.random(75, 128), p5.random(75, 128), p5.random(75, 128)), p5);
        this.coords = grid.nearestGridPoint({ x: p5.random(0, 1), y: p5.random(0, 1)});
    }

    detectCollision(lights){
        let col = false;
        this.currenctColors = {
            red: false,
            green: false,
            blue: false
        };
        for (let light of lights.values()) {
            for (let j = 0; j < light.beam.segments.length; j++) {
                var segment = light.beam.segments[j];

                let line_v = {x: segment.p1_x, y: segment.p1_y};

                let line_w = {x: segment.p2_x, y: segment.p2_y};

                let point =  {x: this.location.x, y: this.location.y};
                if (distToSegment(point, line_v, line_w) < this.size/2){   // collision
                    col = true;
                    this.currentColors[light.color] = true;
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
        p5.push();
        p5.translate(this.location.x, this.location.y);
        this.flower.draw();

        p5.pop();

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