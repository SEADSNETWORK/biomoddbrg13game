// /* * * * * * * * * * * * * * * * * * * * * * * * 

//                   L I G H T

//  * * * * * * * * * * * * * * * * * * * * * * * *

//     Draws the graphics for the light in a color c
// */

export class Light {
    constructor(scaleFactor, color, p5) {
        this.scaleFactor = scaleFactor;
        this.strokeColor = color;
        this.strokeWeight = 1/scaleFactor;
        this.debug = false;
        this.p5 = p5;
    }

    draw() {
        this.p5.push();
        //this.p5.translate(width/2, height/2);
        this.p5.stroke(this.strokeColor);
        this.p5.strokeWeight(this.strokeWeight);
        this.p5.scale(this.scaleFactor);
        
        // triangle
        this.p5.push();
        this.p5.translate(0, 10.5);
        this.p5.line(0, -31.341, -18.1, -0.008);
        this.p5.line(-18.1, -0.008, 18.085, 0);
        this.p5.line(18.085,0, 0,-31.341);
        this.p5.pop();

        // triangle
        this.p5.push();
        this.p5.translate(18.2, 21);
        this.p5.line(0, -31.326, -18.099, 0.007);
        this.p5.line(-18.099, 0.007, -36.185, -31.333);
        this.p5.line(-36.185, -31.333, 0,-31.326);
        this.p5.pop();

        // line
        this.p5.push();
        this.p5.rotate(Math.PI/3);
        this.p5.translate(-6, 10.5);
        this.p5.line(-6.033, -10.447, 18.09, -10.447);
        this.p5.pop();

        // line
        this.p5.push();
        this.p5.rotate(-Math.PI/3);
        this.p5.translate(-6, -10.5);
        this.p5.line(-6.029, 10.444, 18.095, 10.445);
        this.p5.pop();

        // top filled bit
        this.p5.beginShape();
        this.p5.fill(this.strokeColor);
        this.p5.vertex(0, 0);
        this.p5.vertex(-6, -10.5);
        this.p5.vertex(0, -20.5);
        this.p5.vertex(6, -10.5);
        this.p5.vertex(0, 0);
        this.p5.endShape();

        // bottom filled bit
        let c = this.p5.color(0);
        this.p5.fill(c);
        this.p5.beginShape();
        this.p5.vertex(0, 0);
        this.p5.vertex(-6, 10.5);
        this.p5.vertex(0, 21);
        this.p5.vertex(6, 10.5);
        this.p5.vertex(0, 0);
        this.p5.endShape();

        this.p5.noFill();

        this.p5.push();
        // hexagon
        this.p5.translate(-48.206/2, 0);
        this.p5.line(0, -0.01, 12.066, -20.899);
        this.p5.line(12.066, -20.899, 36.189, -20.894);
        this.p5.line(36.189, -20.894, 48.206, 0.07);
        this.p5.line(48.206, 0.07, 36.18, 20.889);
        this.p5.line(36.18, 20.889, 12.057, 20.884);
        this.p5.line(12.057, 20.884, 0, -0.01);

        this.p5.pop();
        if(this.debug) {
            this.p5.circle(0, 0, 3);
        }
        this.p5.pop();

    }
}