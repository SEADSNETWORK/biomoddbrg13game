import {IO_STATE, InteractiveObject} from './interactiveObject'
import {mouseV} from './auxi'
import p5 from "react-p5"
import Handle from "./handle.js"
import { Light as LightGraphic } from './lightGraphic';

// ===============================
//      L I G H T
// ===============================

/* 
    Contains the objects: 
    - Segment:
        Describes a segment on a beam of light, each segment is the result of a reflection off of a mirror
    - Beam
        Functionality of a full beam, this includes the ability to cast a beam in a direction and detect reflections
    - Light:
        Functionality of the full light, containing a beam, handle, and IO

*/
// The object that emits a beam of light



class Segment {
    constructor(p1_x, p1_y, p2_x, p2_y, color, mirror){
        this.p1_x = p1_x;
        this.p1_y = p1_y;
        this.p2_x = p2_x;
        this.p2_y = p2_y;
        this.color = color;
        this.mirror = mirror;
    }
}


class Beam {

    constructor(origin, direction, color, mirrors, p5){
        this.origin = origin;
        this.direction = direction;
        this.color = color;
        this.segments = [];
        this.mirrors = mirrors;

        // array to keep track of calculated intersection points
        // this is mostly for debugging
        this.intersectPoints = [];
    }

    setDirection(direction, p5){
        this.direction = direction;
        //this.createSegmentZero(p5);
        //this.segments[0].direction = direction;
    }


    /* New function to cast a beam: 
    takes point of origin and direction
    this function creates a beam and then checks if it reflects off a mirror (another new function);
    on reflection it will create a segment, add it to the array and cast a new beam from the reflection point
    */
    cast(direction, startPoint, p5, cnt, mirror){
        // draw from point of origin in direction
        const beam = p5.createVector(startPoint).set(direction);
        // set the beam length to the diagonal of the sketch so it always reaches the end of the screen
        beam.setMag(Math.sqrt(Math.pow(p5.width, 2)+Math.pow(p5.height, 2)));
        beam.add(startPoint);
        
        // check beam for reflection (function)
        let reflectionData = this.reflect(startPoint, beam, direction, p5, mirror);
        if(reflectionData!==false) {
            // create segment and add to segments array
            this.segments.push(new Segment(startPoint.x, startPoint.y, reflectionData.x, reflectionData.y, this.color, mirror));
            // cast new beam from reflectionpoint
            let reflectionStart = p5.createVector(reflectionData.x, reflectionData.y);
            // keep counter to stop excessive recursion
            cnt++;
            if(cnt<1000){
                this.cast(reflectionData.direction, reflectionStart, p5, cnt, reflectionData.mirror);
            }
        } else {
            // no reflection has been detected
            this.segments.push(new Segment(startPoint.x, startPoint.y, beam.x, beam.y, this.color, mirror));
        }
    }



    reflect(beamStart, beamEnd, direction, p5, mirror){

        let intersectionPoints = [];

        // loop through mirrors
        for(let i=0; i<this.mirrors.length; i++) {
            let mirrorStart = this.mirrors[i].getPoints(p5)[0];
            let mirrorEnd = this.mirrors[i].getPoints(p5)[1];

            //if(this.mirrors[i].id == "mirror_0") console.log("x3: "+ mirrorStart.x + ", y3: "+ mirrorStart.y + " | x4: "+ mirrorEnd.x + ", y4: "+ mirrorEnd.y);

            // find the intersection 
            // see algorithm at https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
            let t = ((mirrorEnd.x - mirrorStart.x) * (beamStart.y - mirrorStart.y) - (mirrorEnd.y - mirrorStart.y) * (beamStart.x - mirrorStart.x)) / ((mirrorEnd.y - mirrorStart.y) * (beamEnd.x - beamStart.x) - (mirrorEnd.x - mirrorStart.x) * (beamEnd.y - beamStart.y));
            let u = ((beamEnd.x - beamStart.x) * (beamStart.y - mirrorStart.y) - (beamEnd.y - beamStart.y) * (beamStart.x - mirrorStart.x)) / ((mirrorEnd.y - mirrorStart.y) * (beamEnd.x - beamStart.x) - (mirrorEnd.x - mirrorStart.x) * (beamEnd.y - beamStart.y));

            // check t & u to see if intersection is found
            if((t>=0 && t<=1) && (u>=0 && u<=1)) {
                // calculate intersectionpoint x & y, and the distance to the startpoint
                let x = beamStart.x + t * (beamEnd.x - beamStart.x);
                let y = beamStart.y + t * (beamEnd.y - beamStart.y);
                let distance = p5.dist(beamStart.x, beamStart.y, x, y);
                // save for later
                if(this.mirrors[i].ID!=mirror) {
                    let reflectionNormal = this.mirrors[i].getReflection(p5);
                    intersectionPoints.push({x: x, y: y, distance: distance, mirror: this.mirrors[i].ID, direction: 0, reflectionNormal: reflectionNormal});
                }
            }
            
        }

        // exit if no points have been found
        if(intersectionPoints.length===0) {
            return false;
        } else {
            let intersectionPoint = {};
            // sort the found intersectionpoints by distance
            if(intersectionPoints.length==1) {
                // check if the one hit has a distance of 0
                // this means it is a beam that has already reflected and does not hit anything else other than the starting mirror
                if(intersectionPoints[0].distance==0) {
                    console.log("no reflection except itself");
                    return false;
                } else {
                    intersectionPoint = intersectionPoints[0];
                }
            }  else {
                // sort if there is more than one reflection point
                intersectionPoints.sort((a,b) => (a.distance > b.distance) ? 1 : -1);

                // check if the first hit has a distance of 0 (hit on the mirror from which a beam starts)
                if(intersectionPoints[0].distance==0) {
                    // skip the hit with distance 0
                    intersectionPoint = intersectionPoints[1];
                } else {
                    intersectionPoint = intersectionPoints[0];
                }
                
            }
            
            // calculate angle using P5 reflect function
            let normDirection = p5.createVector(direction.x, direction.y);
            let reflectVector = p5.createVector(intersectionPoint.reflectionNormal.x, intersectionPoint.reflectionNormal.y);
            normDirection.reflect(reflectVector);
            intersectionPoint.direction = normDirection;

            // add to array and return
            this.intersectPoints.push(intersectionPoint);
            return intersectionPoint;
        }
        
    }
    

    draw(p5, direction) {
        
        // reset segments
        this.segments = [];
        // debug: points of intersection
        this.intersectPoints = [];
        // cast first beam (this starts the population of the segments array)
        this.cast(p5.createVector(-direction.x, -direction.y), this.origin, p5, 0, null);
        
        // this debug flag shows or hide the dots that indicate intersection points on the beam
        let debug = true;
        if(debug){
            if(this.intersectPoints.length>0) {
                // console.log("Number of intersection points: "+ this.intersectPoints.length);
                for(let j=0; j<this.intersectPoints.length; j++) {
                    // console.log(this.intersectPoints[j].distance);
                    p5.circle(this.intersectPoints[j].x, this.intersectPoints[j].y, 10);
                }
            }
        }
        
        p5.noFill();

        // loop through and draw segments
        for (let i=0; i<this.segments.length; i++){
            //console.log(this.segments[i].mirror);
            p5.stroke(this.segments[i].color);
            p5.line(this.segments[i].p1_x, this.segments[i].p1_y, this.segments[i].p2_x, this.segments[i].p2_y);
        }
    }
    
}



class Light extends InteractiveObject {
    constructor({color, size, location, controlOffset, hide, strokeWeight, player}, mirrors, p5){
        super(location, size);
        this.color = color;
        this.controlOffset = controlOffset;
        this.strokeWeight = strokeWeight;
        this.player = player;
        this.hide = hide;
        this.lightGraphic = new LightGraphic(1, this.color, p5)
         
        // set random direction (direction needs to come from biomodd server) and create handle
        let randDirection = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
        this.handle = new Handle(this.location, 10, 100, randDirection, this.color, this.strokeWeight);

        // create the beam with the direction from the handle
        this.beam = new Beam(this.location, p5.createVector(-this.handle.getDirection(p5).x, -this.handle.getDirection(p5).y), color, mirrors, p5);        
    }

    iPlay(){
        return this.player == this.color;
    }

    draw(p5){

        if (this.hide){
            return;
        }
        p5.push();
        p5.translate(this.location.x, this.location.y);
        p5.rotate(-this.handle.direction.angleBetween(p5.createVector(1, 1))-Math.PI/4)
        this.lightGraphic.draw();
        p5.pop();

        // draw circle for the light
        p5.noStroke();
        if (this.iPlay()){
            p5.fill(this.color);
        } 
        // p5.circle(this.location.x, this.location.y, this.size);
        p5.noFill();

        // draw handle
        this.handle.draw(p5);

        // draw beam
        this.beam.draw(p5, this.handle.getDirection(p5));
    }

    // ---- I/O stuff 
    // passing interactions down to the handle member
    mousePressed(p5){
        if (this.iPlay()){
            super.mousePressed(p5);
            this.handle.mousePressed(p5);
        }
    }

    mouseReleased(p5){
        if (this.iPlay()){
            super.mouseReleased(p5);
            this.handle.mouseReleased(p5);
        }
    }

    mouseDragged(p5){
        if (this.iPlay()){
            super.mouseDragged(p5);
            this.handle.mouseDragged(p5);
        }
    }

    mouseMoved(p5){
        if (this.iPlay()){
            super.mouseMoved(p5);
            this.handle.mouseMoved(p5);
        }
    }    
}

export default Light;