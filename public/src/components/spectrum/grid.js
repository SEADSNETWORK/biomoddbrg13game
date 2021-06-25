export class Grid {
    constructor(spacing, color, p5) {
        this.spacing = spacing;
        this.strokeColor = color;
        this.xCnt = p5.width / this.spacing;
        this.yCnt = p5.height / this.spacing;
        this.diam = this.spacing*2;
        this.debug = false;
        this.p5 = p5;
    }

    draw() {
        this.p5.noFill();
        this.p5.stroke(this.strokeColor);
        this.p5.strokeWeight(1);
        // draw the circle background pattern
        for(let i=0; i<=Math.ceil(this.xCnt); i++) {
            for(let j=0; j<=Math.ceil(this.yCnt); j++) {
                this.p5.circle(i*this.spacing, j*this.spacing, this.diam);

                if(this.debug) {
                    // put a marker on the intersections
                    this.p5.circle(i*this.spacing, j*this.spacing, 10);
                }
            }
        }
    }

    // gets a point with x & y and converts it to the nearest grid point
    nearestGridPoint(loc) {
        let x = Math.round(loc.x/this.spacing) * this.spacing;
        let y = Math.round(loc.y/this.spacing) * this.spacing;
        return {x: x, y: y };
    }
}