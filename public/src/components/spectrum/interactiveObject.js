// ========================================
//      I N T E R A C T I V E  O B J E C T
// ========================================
// an interactive object, that knows when clicked or dragged
// currently assumes it is round

export const IO_STATE = Object.freeze({
    UNSELECTED: "unselected",
    CLICKED: "clicked",
    HOVERING: "hovering",
    DRAGGED: "dragged"
})

export class InteractiveObject {
    
    constructor(location, size){
        this.location = location;
        this.size = size;
        this.state = IO_STATE.UNSELECTED;
        this.changed = false;
        this.easing = 0.05;
    }

    easer = (target, value)=>{
        const dx = target - value;
        value += dx * this.easing;
        return value;
    }

    checkChanged = ()=>{
        const rv = this.changed;
        this.changed = false;
        return rv;
    }

    isOver(loc){
        return loc.dist(this.location) < this.size/2;
    }

    isCurrentOver(p5){
        return this.isOver(p5.createVector(p5.mouseX, p5.mouseY));
    }

    mousePressed(p5){
        if (this.isCurrentOver(p5)){
            this.state = IO_STATE.CLICKED;
        }
    }

    mouseReleased(p5){
        this.state = IO_STATE.UNSELECTED;
        this.mouseMoved(p5);
        this.changed = true;
    }

    mouseDragged(p5){
        if (this.state !== IO_STATE.UNSELECTED){
            this.state = IO_STATE.DRAGGED;
        }   
        this.changed = true;
    }

    mouseMoved(p5){
        if (this.state === IO_STATE.UNSELECTED && this.isCurrentOver(p5)){
            this.state = IO_STATE.HOVERING;
        } else if (this.state === IO_STATE.HOVERING && !this.isCurrentOver(p5)){
            this.state = IO_STATE.UNSELECTED;
        }
    }
}