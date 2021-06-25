
/* * * * * * * * * * * * * * * * * * * * * * * * 

                  F L O W E R

 * * * * * * * * * * * * * * * * * * * * * * * *

Draws a full flower with a specified number of segments and a stroke color:

Main segments: the outer ring of segments (biggest)
Secondary segments: the middle ring of segments (bit smaller)
Tertiary segments: inner ring of segments (smallest)
Stroke color: a P5 color

Call the function setColor(c) to change the color of the flower

You can experiment with the random ranges in the constructor to change the scale and number 
of segments in the three types of segments. There is a bit of randomness built in to make 
the flower appear a bit different even with the same number of segments.

The different segments have a gentle rotation. Each ring of segments rotates at a slightly different speed
Call the function setRotationFactor(f) to make the flower temporarily rotate faster. The function
will apply the faster rotation and then gradually decrease the rotation speed again, 
which can be useful for an animation effect like when a light beam hits it.

*/

export class Flower {
    constructor(mainSegments, secondarySegments, tertiarySegments, strokeColor, p5) {
        this.rotationFactor = 1;
        this.p5 = p5;
        this.mainSegments = [];
        this.secondarySegments = [];
        this.tertiarySegments = [];

        let mainSegmentScale = this.p5.random(2,3);
        let mainStartpoint = this.p5.random(0, (Math.PI*2)/mainSegments);
        let secondarySegmentscale = this.p5.random(1, 2);
        let secondaryStartpoint = this.p5.random(0, (Math.PI*2)/secondarySegments);
        let tertiarySegmentscale = this.p5.random(3,5);
        let tertiaryStartpoint = this.p5.random(0, (Math.PI*2)/tertiarySegments);

        this.strokeColor = strokeColor;

        // main segments
        for(let i=0; i<mainSegments; i++) {
            let s1 = new BigSpine(mainSegmentScale, this.strokeColor, p5);
            s1.setstrokeWeight(1/mainSegmentScale);
            s1.setRotation(mainStartpoint+(i*((Math.PI*2)/mainSegments)));
            s1.enableRotation();
            s1.setRotationSpeed(0.001);

            let s2 = new BigSpine(mainSegmentScale, this.strokeColor, p5);
            s2.setstrokeWeight(1/mainSegmentScale);
            s2.setRotation(mainStartpoint-(i*((Math.PI*2)/mainSegments)));
            s2.flipVertical();
            s2.enableRotation();
            s2.setRotationSpeed(0.001);

            this.mainSegments .push(s1);
            this.mainSegments .push(s2);
        }

        for(let i=0; i<secondarySegments; i++) {
            let s1 = new BigSpine(secondarySegmentscale, this.strokeColor, p5);
            s1.setstrokeWeight(1/secondarySegmentscale);
            s1.setRotation(secondaryStartpoint+(i*((Math.PI*2)/secondarySegments)));
            s1.enableRotation();
            s1.setRotationSpeed(0.0015);

            let s2 = new BigSpine(secondarySegmentscale, this.strokeColor, p5);
            s2.setstrokeWeight(1/secondarySegmentscale);
            s2.flipVertical();
            s2.setRotation(secondaryStartpoint+(i*((Math.PI*2)/secondarySegments)));
            s2.enableRotation();
            s2.setRotationSpeed(0.0015);

            this.secondarySegments .push(s1);
            this.secondarySegments .push(s2);
        }

        for(let i=0; i<tertiarySegments; i++) {
            let s1 = new SmallSpine(tertiarySegmentscale, this.strokeColor, p5);
            s1.setstrokeWeight(1/tertiarySegmentscale);
            s1.setRotation(tertiaryStartpoint+(i*((Math.PI*2)/tertiarySegments)));
            s1.enableRotation();
            s1.setRotationSpeed(0.0025);

            let s2 = new SmallSpine(tertiarySegmentscale, this.strokeColor, p5);
            s2.setstrokeWeight(1/tertiarySegmentscale);
            s2.setRotation(tertiaryStartpoint+(i*((Math.PI*2)/tertiarySegments)));
            s2.flipVertical();
            s2.enableRotation();
            s2.setRotationSpeed(0.0025);

            this.tertiarySegments .push(s1);
            this.tertiarySegments .push(s2);
        }
    }

    draw() {

        // main
        for(let i=0; i<this.mainSegments.length; i++) {
            this.p5.push();
            this.mainSegments[i].setRotationFactor(this.rotationFactor);
            this.mainSegments[i].draw();
            this.p5.pop();
        }

        // secondary
        for(let i=0; i<this.secondarySegments.length; i++) {
            this.p5.push();
            this.secondarySegments[i].setRotationFactor(this.rotationFactor);
            this.secondarySegments[i].draw();
            this.p5.pop();
        }

        // tertiary
        for(let i=0; i<this.tertiarySegments.length; i++) {
            this.p5.push();
            this.tertiarySegments[i].setRotationFactor(this.rotationFactor);
            this.tertiarySegments[i].draw();
            this.p5.pop();
        }

        // rotation factor
        if(this.rotationFactor>1) {
            this.rotationFactor--;
        }
    }

    setRotationFactor(f) {
        this.rotationFactor = f;
    }

    setColor(c) {
        this.strokeColor = c;

        // loop through all segments to set color:
        for(let i=0; i<this.mainSegments.length; i++) {
            this.mainSegments[i].setColor(this.strokeColor);
        }

        for(let i=0; i<this.secondarySegments.length; i++) {
            this.secondarySegments[i].setColor(this.strokeColor);
        }

        for(let i=0; i<this.tertiarySegments.length; i++) {
            this.tertiarySegments[i].setColor(this.strokeColor);
        }
    }
}


// // Describes an individual segment of a flower
class FlowerSegment {
    constructor(scaleFactor, strokeColor, p5) {
        this.scaleFactor = scaleFactor;
        this.rotation = 0.0;
        this.scale = {x: 1, y: 1};
        this.translation = { x: 0, y: 0 };
        this.branches = [];
        this.branchPoints = [];
        this.strokeWeight = 1;
        this.rotationSpeed = 0;
        this.rotationFactor = 1;
        this.strokeColor = strokeColor;
        this.p5 = p5;
    }

    setRotation(r) {
        // add some random adjust to the rotation
        let randomAdjust = this.p5.random(-r/40, r/40);
        this.rotation = r + randomAdjust;
    }

    setTranslation(t) {
        this.translation = t;
    }

    setstrokeWeight(sw) {
        this.strokeWeight = sw;
    }

    setColor(c) {
        this.strokeColor = c;
    }

    flipHorizontal() {
        this.scale.x = -this.scale.x;
    }

    flipVertical() {
        this.scale.y = -this.scale.y;
    }

    enableRotation() {
        this.rotate = true;
    }

    setRotationSpeed(r) {
        this.rotationSpeed = r;
    }

    setRotationFactor(f) {
        this.rotationFactor = f;
    }

}

// // Describes a big spine and its branches and leaves
class BigSpine extends   FlowerSegment{
    constructor(scaleFactor, strokeColor, p5) {
        super(scaleFactor, strokeColor, p5);

        // branch points
        this.branchPoints = [{x: 6, y: 70, r: -0.3}, {x: 5.8, y: 40, r: -0.8}, {x: -20.392, y: 7.463, r: -1.65}];

        for(let i=0; i<this.branchPoints.length; i++) {
            // either pick a leaf or a smaller spine
            let seed = Math.random()*10;
            if(seed<=6) {
                // branch a smaller spine
                let newBranch = new SmallSpine(1, this.strokeColor, this.p5);
                newBranch.setTranslation(this.branchPoints[i]);
                newBranch.setRotation(this.branchPoints[i].r);
                newBranch.setstrokeWeight(1/this.scaleFactor);
                this.branches.push(newBranch);

            } else {
                // branch a leaf
                let newLeaf = new Leaf(1.5, this.strokeColor, this.p5);
                newLeaf.setstrokeWeight(1/this.scaleFactor);
                newLeaf.setTranslation(this.branchPoints[i]);
                newLeaf.setRotation(this.branchPoints[i].r);
                this.branches.push(newLeaf);
            }
        }
    }

    setColor(c) {
        this.strokeColor = c;

        for(let i=0; i<this.branches.length; i++) {
            this.branches[i].setColor(c);
        }
    }

    draw() {
        this.p5.push();
        // adjust rotation
        this.p5.rotate(this.rotation);
        // adjust size
        this.p5.scale(this.scaleFactor);
        // this sets the orientation
        this.p5.scale(this.scale.x, this.scale.y);
        // move to center
        this.p5.translate(this.translation.x, this.translation.y);
        // set the stroke
        this.p5.strokeWeight(this.strokeWeight);
        this.p5.stroke(this.strokeColor);
        this.p5.noFill();

        // SVG coordinates
        this.p5.translate(0,-83.565);
        // start drawing the Bigspine segment
        this.p5.bezier(0, 83.565, 15.384, 56.919, 6.254, 22.847, -20.392, 7.463);
        this.p5.bezier(-20.392, 7.463, -28.86, 2.574, -38.467, 0, -48.247, 0);
        this.p5.bezier(0, 84.856, 10.564, 68.225, 11.09, 48.082, 3.162, 31.532);
        this.p5.bezier(3.162, 31.532, -1.138, 22.558, -7.923, 14.64, -16.942, 8.911);
        this.p5.bezier(-16.942, 8.911, -26.28, 2.979, -37.189, 0, -48.247, 0);
        
        // add some visualization for debugging purposes: 
        if(this.debug) {
            // marker for start point
            this.p5.circle(0, 83.565, 3);
            
            // branch points
            for(let i=0; i<this.branchPoints.length; i++) {
                let bp = this.branchPoints[i];
                this.p5.circle(bp.x, bp.y, 3);
            }
            // marker for end point
            this.p5.circle(-48.247, 0, 3);
        }
        
        for(let i=0; i<this.branches.length; i++) {
            this.branches[i].draw();
        }

        if(this.rotate) {
            this.rotation += this.rotationSpeed * this.rotationFactor;
        }
        this.p5.pop();
    }
}


// // draw a smaller, slightly less curvy segment, with leaves
class SmallSpine extends  FlowerSegment {
    constructor(scaleFactor, strokeColor, p5) {
        super(scaleFactor, strokeColor, p5);

        // branch points
        this.branches = [];
        this.branchPoints = [{x: 10, y: -9.2, r: -0.4}];

        for(let i=0; i<this.branchPoints.length; i++) {
            // 50% chance to spawn a leaf
            let seed = Math.random()*10;
            if(seed<=5) {
                // branch a smaller spine
                let newLeaf = new Leaf(1, this.strokeColor, this.p5);
                newLeaf.setstrokeWeight(1/this.scaleFactor*this.strokeWeight);
                newLeaf.setTranslation(this.branchPoints[i]);
                newLeaf.setRotation(this.branchPoints[i].r);
                this.branches.push(newLeaf);

            }
        }
    }

    setColor(c) {
        this.strokeColor = c;

        for(let i=0; i<this.branches.length; i++) {
            this.branches[i].setColor(c);
        }
    }

    draw() {
        this.p5.push();
        this.p5.translate(this.translation.x, this.translation.y);
        this.p5.rotate(this.rotation);
        this.p5.scale(this.scale.x, this.scale.y);
        this.p5.scale(this.scaleFactor);
        this.p5.stroke(this.strokeColor);
        this.p5.strokeWeight(this.strokeWeight);
        this.p5.noFill();
        
        this.p5.scale(1, 1);

        this.p5.translate(0.921, 3.212);
        this.p5.bezier(-0.921, -3.212, 4.297, -7.26, 11.593, -7.26, 16.81, -3.212);
        this.p5.translate(-0.65, 5);
        this.p5.rotate(-Math.PI/18)
        this.p5.bezier(-1.692, -5.037, 4.072, -10.174, 12.773, -10.174, 18.537, -5.037);

        if(this.debug) {
            // marker for start point
            this.p5.circle(1.15, -8.15, 3);

            // branchpoints
            for(let i=0; i<this.branchPoints.length; i++) {
                let bp = this.branchPoints[i];
                this.p5.circle(bp.x, bp.y, 3);
            }
        }

        
        for(let i=0; i<this.branches.length; i++) {
            this.branches[i].draw();
        }

        if(this.rotate) {
            this.rotation += this.rotationSpeed * this.rotationFactor;
        }
        
        this.p5.pop();
    }
}


// // draws a leaf
class Leaf extends  FlowerSegment {
    constructor(scaleFactor, strokeColor, p5) {
        super(scaleFactor, strokeColor, p5);
    }

    draw() {
        this.p5.push();
        this.p5.translate(this.translation.x, this.translation.y);
        this.p5.rotate(this.rotation);
        this.p5.scale(this.scale.x, this.scale.y);
        this.p5.scale(this.scaleFactor);
        this.p5.translate(1.01, 2.246);
        this.p5.stroke(this.strokeColor);
        //this.p5.strokeWeight(this.strokeWeight);
        this.p5.noFill();

        // leaf middle line
        this.p5.bezier(-1.01, -2.246, 0.912, -3.034, 3.068, -3.034, 4.99, -2.246);
        
        // add some visualization for debugging purposes: 
        if(this.debug) {
            // marker for start point
            this.p5.circle(-1.01, -2.246, 3);
        }
        
        // adjust leaf position and orientation
        this.p5.scale(1, -1);
        this.p5.rotate(-Math.PI/3.6);
        this.p5.translate(-1.25, 5.35);
        
        // first leaf half
        this.p5.bezier(0, -2.368, 0.72, -2.309, 1.394, -1.988, 1.893, -1.466);
        this.p5.bezier(1.893, -1.466, 2.127, -1.22, 2.3, -0.921, 2.395, -0.596);
        this.p5.bezier(2.395, -0.596, 2.494, -0.363, 2.649, -0.159, 2.845, 0);
        
        // second half
        this.p5.bezier(0, -2.368, 0.008, -1.544, 0.467, -0.791, 1.194, -0.403);
        this.p5.bezier(1.194, -0.403, 1.446, -0.27, 1.726, -0.198, 2.01, -0.195);
        this.p5.bezier(2.01, -0.195, 2.299, -0.191, 2.584, -0.125, 2.845, 0);
        this.p5.pop();
    }
}





