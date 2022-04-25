class Enemy {
    constructor() {
        this.side = int(random(0,4));
        switch (this.side) {
            case 0:
                this.position = createVector(0,int(random(height)));
                break;
            case 1:
                this.position = createVector(width,int(random(height)));
                break;
            case 2:
                this.position = createVector(int(random(width)),0);
                break;
            case 3:
                this.position = createVector(int(random(width)),height);
                break;
            default:
                fill(255);
                textSize(32);
                text('error',width/2,height/2);
        }
        
        this.mass = 5*difficulty;
        this.targetX = player.position.x;
        this.targetY = player.position.y;
        this.head = createVector(this.targetX - this.position.x, this.targetY - this.position.y);
        this.head.normalize();
        this.velocity = p5.Vector.mult(this.head,difficulty*1.2+4);
        this.acceleration = createVector(0,0);
        this.rad = this.mass*3;
        this.hp = 100;
        this.color = color(random(100),random(100),100);
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        // Velocity changes according to acceleration
        this.velocity.add(this.acceleration);
        // position changes by velocity
        this.position.add(this.velocity);
        // We must clear acceleration each frame
        this.acceleration.mult(0);
    }
    
    display() {
        push();
        rectMode(CENTER);
        stroke(0);
        strokeWeight(2);
        fill(this.color, 127);
        translate(this.position);
        ellipse(0,0, this.rad, this.rad);
        pop();
    }
    outOfBounds(){
        let padding = 30;
        return (this.position.x > width+padding ||
                this.position.x < -padding ||
                this.position.y > height+padding ||
                this.position.y < -padding);
    }

    getX() {
        return this.position.x;
    }
    getY() {
        return this.position.y;
    }
    getR() {
        return this.rad;
    }

    seek() {
        let force = p5.Vector.sub(player.position, this.position);
        force.setMag(mag(this.velocity));
        force.sub(this.velocity);
        force.sub(createVector(0, 0.01 * this.mass));
        force.sub(liquid.calculateDrag(this));
        return createVector(force.x,force.y/20);
    }

}