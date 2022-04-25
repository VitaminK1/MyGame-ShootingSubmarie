class Bullet{
  constructor(da) {
    this.mass = 10;
    this.position = createVector(player.position.x,player.position.y);
    this.velocity = createVector(0,0);
    this.acceleration = da.mult(30);
    this.rad = 5;
  }
	
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  }

  display() {
    push();
    stroke(0);
    strokeWeight(0.5);
    fill(255,0,0,127);
    ellipse(this.position.x, this.position.y, this.rad, this.rad);
    pop();
  }
	
	outOfBounds(){
    let padding = 10;
    return (this.position.x > width+padding ||
            this.position.x < -padding ||
            this.position.y > height+padding ||
            this.position.y < -padding);
	}
	
	hitScan(){
  for (let i=0; i<enemys.length;i++) {
    let isCollided = collideCircleCircle(this.position.x,this.position.y,this.rad,enemys[i].getX(),enemys[i].getY(),enemys[i].getR());
    if (isCollided) {
      enemys.splice(i,1);
      score += 10*int(difficulty*10)/10;
      return true;
    }
  }
  return false;
  }
}