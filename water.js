// Reference : https://natureofcode.com/book/chapter-2-forces/

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  // Is the Mover in the Liquid?
  contains(m) {
    let l = m.position;
    return l.x > this.x && l.x < this.x + this.w &&
      l.y > this.y && l.y < this.y + this.h;
  }

  // Calculate drag force
  calculateDrag(m) {
    // Magnitude is coefficient * speed squared
    let speed = m.velocity.mag();
    let dragMagnitude = this.c * speed * speed;

    // Direction is inverse of velocity
    let dragForce = m.velocity.copy();
    dragForce.mult(-1);

    // Scale according to magnitude
    // dragForce.setMag(dragMagnitude);
    dragForce.normalize();
    dragForce.mult(dragMagnitude);
    return dragForce;
  }

  display() {
    noStroke();
    fill(150,240,240);
    rect(this.x, this.y, this.w, this.h);
  }
}