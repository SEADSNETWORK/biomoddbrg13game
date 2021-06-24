import {IO_STATE, InteractiveObject} from './interactiveObject'
import {mouseV} from './auxi'

// the handle that allows for the rotation of the light
class Handle extends InteractiveObject {
    constructor (location, size, circleSize, direction, color, strokeWeight){
        super(location, size);
        this.color = color;
        this.strokeWeight = strokeWeight;

        this.direction = direction;
        this.circleSize = circleSize;
        this.target = this.direction;
    }

    rotate(p5) {
        // this should just update the direction, the rest will be handled by draw
        let mousePos = mouseV(p5);
        const diff = p5.createVector(0,0).set(this.location).sub(mousePos);
        this.direction = p5.createVector(-diff.normalize().x, -diff.normalize().y);
        this.target = this.direction;
    }

    // return the direction
    // the object calling this might do something with the direction (eg: beam inverses the direction)
    getDirection(p5) {
        return this.direction;
    }

    // overwrite the function to detect hover based on the position of the handle
    isOver(loc){
        return  loc && this.handlePosition && loc.dist(this.handlePosition) < this.size/2;
    }


    draw(p5){
        if(this.state === IO_STATE.DRAGGED){
            this.rotate(p5);
        }

        if (this.target!==this.direction){
            this.direction.x = this.easer(this.target.x, this.direction.x);
            this.direction.y = this.easer(this.target.y, this.direction.y);
        }

        p5.strokeWeight(this.strokeWeight);
        // draw the cirlce on which the handle moves
        p5.noFill();
        p5.stroke(this.color);
        p5.circle(this.location.x, this.location.y, this.circleSize);
        
        let handleOffset = p5.createVector(this.direction.x, this.direction.y);
        handleOffset.setMag(this.circleSize/2);

        // calculate the handle position
        this.handlePosition = p5.createVector(this.location.x, this.location.y).add(handleOffset);

        // offset the handle in the direction needed:
        // draw the handle
        p5.noStroke();
        p5.fill(this.color);
        p5.circle(this.handlePosition.x, this.handlePosition.y, this.state===IO_STATE.UNSELECTED?this.size:this.size*1.2);
    }

}

export default Handle;
