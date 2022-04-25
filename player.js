class Mover {
    constructor(m, x, y) {
      this.mass = m;
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.rad = this.mass*16
      this.hp = 100;
      this.hurt = 0;
    }
    // Newton's 2nd law: F = M * A
    // or A = F / M
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
      noStroke();
      translate(this.position);

      let heading = getMouseVector().heading();
      let headRight = abs(heading) < 90;

      if (headRight) {
        rotate(heading);// right Heading image
        fill(255);
        rect(0,0.7*this.rad,this.rad,0.1*this.rad);
        fill(100);
        rect(-this.rad*(100-this.hp)/200,0.7*this.rad,this.rad*this.hp/100,0.1*this.rad);
        fill(255,0,0, 127);
        rect(0,0, this.rad*1.2, this.rad*0.9,0,30,30,30); //body
        rect(-1.05*0.75*this.rad, -0.3*this.rad,0.375*this.rad,0.3*this.rad,30,0,0,30);
        fill(50); // behind part
        rect(-1.3*0.75*this.rad, -0.5*this.rad,0.1*this.rad,0.3*this.rad,2,2,2,2);
        rect(-1.3*0.75*this.rad, -0.1*this.rad,0.1*this.rad,0.3*this.rad,2,2,2,2);
        fill(255,0,0,127); // upper part
        rect(0,-0.6*this.rad,0.15*this.rad,0.375*this.rad,2,0,0,0);
        rect(0.149*this.rad,-0.71*this.rad,0.15*this.rad,0.15*this.rad,0,2,2,0);
        fill(50); // upper part black
        rect(0,-0.45*this.rad,0.3*this.rad,0.075*this.rad,2,2,0,0);
        fill(0); // eye
        if (this.hurt > 0) {
          this.hurt -= 1;
          textAlign(CENTER);
          textSize(15);
          text('> <',this.rad*0.3,0.05*this.rad);
        } else {
          ellipse(this.rad*0.2,-this.rad*0.01,5,10);
          ellipse(this.rad*0.4,-this.rad*0.01,5,10);
        }

      } else {
        rotate(heading-180);
        fill(255);
        rect(0,0.7*this.rad,this.rad,0.1*this.rad);
        fill(100);
        rect(-this.rad*(100-this.hp)/200,0.7*this.rad,this.rad*this.hp/100,0.1*this.rad);
        fill(255,0,0, 127);
        rect(0,0, this.rad*1.2, this.rad*0.9,30,0,30,30); // left Heading image
        rect(1.05*0.75*this.rad, -0.3*this.rad,0.375*this.rad,0.3*this.rad,0,3,30,0);
        fill(50);
        rect(1.3*0.75*this.rad, -0.5*this.rad,0.1*this.rad,0.3*this.rad,2,2,2,2);
        rect(1.3*0.75*this.rad, -0.1*this.rad,0.1*this.rad,0.3*this.rad,2,2,2,2);
        fill(255,0,0,127);
        rect(0,-0.6*this.rad,0.15*this.rad,0.375*this.rad,2,0,0,0);
        rect(-0.149*this.rad,-0.71*this.rad,0.15*this.rad,0.15*this.rad,2,0,0,2);
        fill(50);
        rect(0,-0.45*this.rad,0.3*this.rad,0.075*this.rad,2,2,0,0);
        fill(0);
        if (this.hurt > 0) {
          this.hurt -= 1;
          textAlign(CENTER);
          textSize(15);
          text('> <',-this.rad*0.3,0.05*this.rad);          
        } else {
          ellipse(-this.rad*0.2,-this.rad*0.01,5,10);
          ellipse(-this.rad*0.4,-this.rad*0.01,5,10);
        }

      }

      pop();
    }

    move() {
        let force = 0.5;
        if ((keyIsDown(65) || keyIsDown(LEFT_ARROW))) {
            this.acceleration.x -= force;
          }
          if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW))) {
            this.acceleration.x += force;
          }
          if ((keyIsDown(87) || keyIsDown(UP_ARROW))) {
            this.acceleration.y -= force;
          }
          if ((keyIsDown(83) || keyIsDown(DOWN_ARROW))) {
            this.acceleration.y += force;
          }
    }
  
    checkEdges() {
        let padding = this.rad/2 + 20;
        let rev = 0.99;
      if (this.position.x > width-padding) {
        this.velocity.x *= -rev;
        this.position.x = width-padding;
      }
      if (this.position.x < padding) {
        this.velocity.x *= -rev;
        this.position.x = padding;          
      }
      if (this.position.y > height-padding) {
        this.velocity.y *= -rev; // A little dampening when hitting the bottom
        this.position.y = height-padding;
      }
      if (this.position.y < padding) {
        this.velocity.y *= -rev;
        this.position.y = padding;          
      }
    }
    
    hitScan() {
      for (let i=0; i < enemys.length; i++) {
        let isCollided = collideCircleCircle(this.position.x,this.position.y,this.rad,enemys[i].getX(),enemys[i].getY(),enemys[i].getR());
        if (isCollided) {
          this.hp -= int(enemys[i].mass);
          enemys.splice(i,1);
          this.hurt = 30;
          return true;
        }
      }
    return false;
    }

  }