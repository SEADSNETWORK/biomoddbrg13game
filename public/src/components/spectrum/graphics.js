
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

// export class Flower {
//     constructor(mainSegments, secondarySegments, tertiarySegments, strokeColor) {
//         this.rotationFactor = 1;
        
//         this.mainSegments = [];
//         this.secondarySegments = [];
//         this.tertiarySegments = [];

//         let mainSegmentScale = random(2,3);
//         let mainStartpoint = random(0, (Math.PI*2)/mainSegments);
//         let secondarySegmentscale = random(1, 2);
//         let secondaryStartpoint = random(0, (Math.PI*2)/secondarySegments);
//         let tertiarySegmentscale = random(3,5);
//         let tertiaryStartpoint = random(0, (Math.PI*2)/tertiarySegments);

//         this.strokeColor = strokeColor;

//         // main segments
//         for(let i=0; i<mainSegments; i++) {
//             let s1 = new BigSpine(mainSegmentScale, this.strokeColor);
//             s1.setStrokeWeight(1/mainSegmentScale);
//             s1.setRotation(mainStartpoint+(i*((Math.PI*2)/mainSegments)));
//             s1.enableRotation();
//             s1.setRotationSpeed(0.001);

//             let s2 = new BigSpine(mainSegmentScale, this.strokeColor);
//             s2.setStrokeWeight(1/mainSegmentScale);
//             s2.setRotation(mainStartpoint-(i*((Math.PI*2)/mainSegments)));
//             s2.flipVertical();
//             s2.enableRotation();
//             s2.setRotationSpeed(0.001);

//             this.mainSegments.push(s1);
//             this.mainSegments.push(s2);
//         }

//         for(let i=0; i<secondarySegments; i++) {
//             let s1 = new BigSpine(secondarySegmentscale, this.strokeColor);
//             s1.setStrokeWeight(1/secondarySegmentscale);
//             s1.setRotation(secondaryStartpoint+(i*((Math.PI*2)/secondarySegments)));
//             s1.enableRotation();
//             s1.setRotationSpeed(0.0015);

//             let s2 = new BigSpine(secondarySegmentscale, this.strokeColor);
//             s2.setStrokeWeight(1/secondarySegmentscale);
//             s2.flipVertical();
//             s2.setRotation(secondaryStartpoint+(i*((Math.PI*2)/secondarySegments)));
//             s2.enableRotation();
//             s2.setRotationSpeed(0.0015);

//             this.secondarySegments.push(s1);
//             this.secondarySegments.push(s2);
//         }

//         for(let i=0; i<tertiarySegments; i++) {
//             let s1 = new SmallSpine(tertiarySegmentscale, this.strokeColor);
//             s1.setStrokeWeight(1/tertiarySegmentscale);
//             s1.setRotation(tertiaryStartpoint+(i*((Math.PI*2)/tertiarySegments)));
//             s1.enableRotation();
//             s1.setRotationSpeed(0.0025);

//             let s2 = new SmallSpine(tertiarySegmentscale, this.strokeColor);
//             s2.setStrokeWeight(1/tertiarySegmentscale);
//             s2.setRotation(tertiaryStartpoint+(i*((Math.PI*2)/tertiarySegments)));
//             s2.flipVertical();
//             s2.enableRotation();
//             s2.setRotationSpeed(0.0025);

//             this.tertiarySegments.push(s1);
//             this.tertiarySegments.push(s2);
//         }
//     }

//     draw() {

//         // main
//         for(let i=0; i<this.mainSegments.length; i++) {
//             push();
//             this.mainSegments[i].setRotationFactor(this.rotationFactor);
//             this.mainSegments[i].draw();
//             pop();
//         }

//         // secondary
//         for(let i=0; i<this.secondarySegments.length; i++) {
//             push();
//             this.secondarySegments[i].setRotationFactor(this.rotationFactor);
//             this.secondarySegments[i].draw();
//             pop();
//         }

//         // tertiary
//         for(let i=0; i<this.tertiarySegments.length; i++) {
//             push();
//             this.tertiarySegments[i].setRotationFactor(this.rotationFactor);
//             this.tertiarySegments[i].draw();
//             pop();
//         }

//         // rotation factor
//         if(this.rotationFactor>1) {
//             this.rotationFactor--;
//         }
//     }

//     setRotationFactor(f) {
//         this.rotationFactor = f;
//     }

//     setColor(c) {
//         this.strokeColor = c;

//         // loop through all segments to set color:
//         for(let i=0; i<this.mainSegments.length; i++) {
//             this.mainSegments[i].setColor(this.strokeColor);
//         }

//         for(let i=0; i<this.secondarySegments.length; i++) {
//             this.secondarySegments[i].setColor(this.strokeColor);
//         }

//         for(let i=0; i<this.tertiarySegments.length; i++) {
//             this.tertiarySegments[i].setColor(this.strokeColor);
//         }
//     }
// }


// // Describes an individual segment of a flower
// class FlowerSegment {
//     constructor(scaleFactor, strokeColor) {
//         this.scaleFactor = scaleFactor;
//         this.rotation = 0.0;
//         this.scale = {x: 1, y: 1};
//         this.translation = { x: 0, y: 0 };
//         this.branches = [];
//         this.branchPoints = [];
//         this.strokeWeight = 1;
//         this.rotationSpeed = 0;
//         this.rotationFactor = 1;
//         this.strokeColor = strokeColor;
//     }

//     setRotation(r) {
//         // add some random adjust to the rotation
//         let randomAdjust = random(-r/40, r/40);
//         this.rotation = r + randomAdjust;
//     }

//     setTranslation(t) {
//         this.translation = t;
//     }

//     setStrokeWeight(sw) {
//         this.strokeWeight = sw;
//     }

//     setColor(c) {
//         this.strokeColor = c;
//     }

//     flipHorizontal() {
//         this.scale.x = -this.scale.x;
//     }

//     flipVertical() {
//         this.scale.y = -this.scale.y;
//     }

//     enableRotation() {
//         this.rotate = true;
//     }

//     setRotationSpeed(r) {
//         this.rotationSpeed = r;
//     }

//     setRotationFactor(f) {
//         this.rotationFactor = f;
//     }

// }

// // Describes a big spine and its branches and leaves
// class BigSpine extends FlowerSegment {
//     constructor(scaleFactor, strokeColor) {
//         super(scaleFactor, strokeColor);

//         // branch points
//         this.branchPoints = [{x: 6, y: 70, r: -0.3}, {x: 5.8, y: 40, r: -0.8}, {x: -20.392, y: 7.463, r: -1.65}];

//         for(let i=0; i<this.branchPoints.length; i++) {
//             // either pick a leaf or a smaller spine
//             let seed = Math.random()*10;
//             if(seed<=6) {
//                 // branch a smaller spine
//                 let newBranch = new SmallSpine(1, this.strokeColor);
//                 newBranch.setTranslation(this.branchPoints[i]);
//                 newBranch.setRotation(this.branchPoints[i].r);
//                 newBranch.setStrokeWeight(1/this.scaleFactor);
//                 this.branches.push(newBranch);

//             } else {
//                 // branch a leaf
//                 let newLeaf = new Leaf(1.5, this.strokeColor);
//                 newLeaf.setStrokeWeight(1/this.scaleFactor);
//                 newLeaf.setTranslation(this.branchPoints[i]);
//                 newLeaf.setRotation(this.branchPoints[i].r);
//                 this.branches.push(newLeaf);
//             }
//         }
//     }

//     setColor(c) {
//         this.strokeColor = c;

//         for(let i=0; i<this.branches.length; i++) {
//             this.branches[i].setColor(c);
//         }
//     }

//     draw() {
//         push();
//         // adjust rotation
//         rotate(this.rotation);
//         // adjust size
//         scale(this.scaleFactor);
//         // this sets the orientation
//         scale(this.scale.x, this.scale.y);
//         // move to center
//         translate(this.translation.x, this.translation.y);
//         // set the stroke
//         strokeWeight(this.strokeWeight);
//         stroke(this.strokeColor);
//         noFill();

//         // SVG coordinates
//         translate(0,-83.565);
//         // start drawing the Bigspine segment
//         bezier(0, 83.565, 15.384, 56.919, 6.254, 22.847, -20.392, 7.463);
//         bezier(-20.392, 7.463, -28.86, 2.574, -38.467, 0, -48.247, 0);
//         bezier(0, 84.856, 10.564, 68.225, 11.09, 48.082, 3.162, 31.532);
//         bezier(3.162, 31.532, -1.138, 22.558, -7.923, 14.64, -16.942, 8.911);
//         bezier(-16.942, 8.911, -26.28, 2.979, -37.189, 0, -48.247, 0);
        
//         // add some visualization for debugging purposes: 
//         if(this.debug) {
//             // marker for start point
//             circle(0, 83.565, 3);
            
//             // branch points
//             for(let i=0; i<this.branchPoints.length; i++) {
//                 let bp = this.branchPoints[i];
//                 circle(bp.x, bp.y, 3);
//             }
//             // marker for end point
//             circle(-48.247, 0, 3);
//         }
        
//         for(let i=0; i<this.branches.length; i++) {
//             this.branches[i].draw();
//         }

//         if(this.rotate) {
//             this.rotation += this.rotationSpeed * this.rotationFactor;
//         }
//         pop();
//     }
// }


// // draw a smaller, slightly less curvy segment, with leaves
// class SmallSpine extends FlowerSegment {
//     constructor(scaleFactor, strokeColor) {
//         super(scaleFactor, strokeColor);

//         // branch points
//         this.branches = [];
//         this.branchPoints = [{x: 10, y: -9.2, r: -0.4}];

//         for(let i=0; i<this.branchPoints.length; i++) {
//             // 50% chance to spawn a leaf
//             let seed = Math.random()*10;
//             if(seed<=5) {
//                 // branch a smaller spine
//                 let newLeaf = new Leaf(1, this.strokeColor);
//                 newLeaf.setStrokeWeight(1/this.scaleFactor*this.strokeWeight);
//                 newLeaf.setTranslation(this.branchPoints[i]);
//                 newLeaf.setRotation(this.branchPoints[i].r);
//                 this.branches.push(newLeaf);

//             }
//         }
//     }

//     setColor(c) {
//         this.strokeColor = c;

//         for(let i=0; i<this.branches.length; i++) {
//             this.branches[i].setColor(c);
//         }
//     }

//     draw() {
//         push();
//         translate(this.translation.x, this.translation.y);
//         rotate(this.rotation);
//         scale(this.scale.x, this.scale.y);
//         scale(this.scaleFactor);
//         stroke(this.strokeColor);
//         strokeWeight(this.strokeWeight);
//         noFill();
        
//         scale(1, 1);

//         translate(0.921, 3.212);
//         bezier(-0.921, -3.212, 4.297, -7.26, 11.593, -7.26, 16.81, -3.212);
//         translate(-0.65, 5);
//         rotate(-Math.PI/18)
//         bezier(-1.692, -5.037, 4.072, -10.174, 12.773, -10.174, 18.537, -5.037);

//         if(this.debug) {
//             // marker for start point
//             circle(1.15, -8.15, 3);

//             // branchpoints
//             for(let i=0; i<this.branchPoints.length; i++) {
//                 let bp = this.branchPoints[i];
//                 circle(bp.x, bp.y, 3);
//             }
//         }

        
//         for(let i=0; i<this.branches.length; i++) {
//             this.branches[i].draw();
//         }

//         if(this.rotate) {
//             this.rotation += this.rotationSpeed * this.rotationFactor;
//         }
        
//         pop();
//     }
// }


// // draws a leaf
// class Leaf extends FlowerSegment {
//     constructor(scaleFactor, strokeColor) {
//         super(scaleFactor, strokeColor);
//     }

//     draw() {
//         push();
//         translate(this.translation.x, this.translation.y);
//         rotate(this.rotation);
//         scale(this.scale.x, this.scale.y);
//         scale(this.scaleFactor);
//         translate(1.01, 2.246);
//         stroke(this.strokeColor);
//         //strokeWeight(this.strokeWeight);
//         noFill();

//         // leaf middle line
//         bezier(-1.01, -2.246, 0.912, -3.034, 3.068, -3.034, 4.99, -2.246);
        
//         // add some visualization for debugging purposes: 
//         if(this.debug) {
//             // marker for start point
//             circle(-1.01, -2.246, 3);
//         }
        
//         // adjust leaf position and orientation
//         scale(1, -1);
//         rotate(-Math.PI/3.6);
//         translate(-1.25, 5.35);
        
//         // first leaf half
//         bezier(0, -2.368, 0.72, -2.309, 1.394, -1.988, 1.893, -1.466);
//         bezier(1.893, -1.466, 2.127, -1.22, 2.3, -0.921, 2.395, -0.596);
//         bezier(2.395, -0.596, 2.494, -0.363, 2.649, -0.159, 2.845, 0);
        
//         // second half
//         bezier(0, -2.368, 0.008, -1.544, 0.467, -0.791, 1.194, -0.403);
//         bezier(1.194, -0.403, 1.446, -0.27, 1.726, -0.198, 2.01, -0.195);
//         bezier(2.01, -0.195, 2.299, -0.191, 2.584, -0.125, 2.845, 0);
//         pop();
//     }
// }



// /* * * * * * * * * * * * * * * * * * * * * * * * 

//                   L I G H T

//  * * * * * * * * * * * * * * * * * * * * * * * *

//     Draws the graphics for the light in a color c
// */

// export class Light {
//     constructor(scaleFactor, color) {
//         this.scaleFactor = scaleFactor;
//         this.strokeColor = color;
//         this.strokeWeight = 1/scaleFactor;
//         this.debug = false;
//     }

//     draw() {
//         push();
//         //translate(width/2, height/2);
//         stroke(this.strokeColor);
//         strokeWeight(this.strokeWeight);
//         scale(this.scaleFactor);
        
//         // triangle
//         push();
//         translate(0, 10.5);
//         line(0, -31.341, -18.1, -0.008);
//         line(-18.1, -0.008, 18.085, 0);
//         line(18.085,0, 0,-31.341);
//         pop();

//         // triangle
//         push();
//         translate(18.2, 21);
//         line(0, -31.326, -18.099, 0.007);
//         line(-18.099, 0.007, -36.185, -31.333);
//         line(-36.185, -31.333, 0,-31.326);
//         pop();

//         // line
//         push();
//         rotate(Math.PI/3);
//         translate(-6, 10.5);
//         line(-6.033, -10.447, 18.09, -10.447);
//         pop();

//         // line
//         push();
//         rotate(-Math.PI/3);
//         translate(-6, -10.5);
//         line(-6.029, 10.444, 18.095, 10.445);
//         pop();

//         // top filled bit
//         beginShape();
//         fill(this.strokeColor);
//         vertex(0, 0);
//         vertex(-6, -10.5);
//         vertex(0, -20.5);
//         vertex(6, -10.5);
//         vertex(0, 0);
//         endShape();

//         // bottom filled bit
//         let c = color(0);
//         fill(c);
//         beginShape();
//         vertex(0, 0);
//         vertex(-6, 10.5);
//         vertex(0, 21);
//         vertex(6, 10.5);
//         vertex(0, 0);
//         endShape();

//         noFill();

//         push();
//         // hexagon
//         translate(-48.206/2, 0);
//         line(0, -0.01, 12.066, -20.899);
//         line(12.066, -20.899, 36.189, -20.894);
//         line(36.189, -20.894, 48.206, 0.07);
//         line(48.206, 0.07, 36.18, 20.889);
//         line(36.18, 20.889, 12.057, 20.884);
//         line(12.057, 20.884, 0, -0.01);

//         pop();
//         if(this.debug) {
//             circle(0, 0, 3);
//         }
//         pop();

//     }
// }




/* * * * * * * * * * * * * * * * * * * * * * * * 

                  G  R  I  D

 * * * * * * * * * * * * * * * * * * * * * * * *

Draws a grid made up of circles. The grid gets passed a spacing, this determines the size of the 
circles and how far appart they'll be generated.

To make sure that elements are generated on the intersection points of the grid, you can 
call the function nearestGridPoint(loc). 
This will convert the passed location (needs to be an object with x and y variables) to the 
nearest point on the grid. Not necessary, but it may look a little neater if the grid is being used.

*/


