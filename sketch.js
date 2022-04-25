//reference

// 1. nature of Code - 2.8 Air and Fluid Resistance
// https://natureofcode.com/book/chapter-2-forces/
// 2. Coding Train - Seeking Target
// https://www.youtube.com/watch?v=p1Ws1ZhG36g&list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM&t=0s
// 3. shooter by carrefinho
// https://editor.p5js.org/carrefinho/sketches/Sk7ZvoMn7


let movers = [];
let player;
let enemys = [];
let bullets = [];
let liquid;
let rebutton;
let stbutton;
let difficulty;
let spawndelay;
let timer;
let score;
let started;

function preload() {
}

function setup() {
  let text1 = createP("Move : keep pressing ↑ ← → ↓ or WASD");
  let text2 = createP("Mouse : bullet direction");
  let text3 = createP("Left Click : fire bullet");  
  createCanvas(600, 600);
  angleMode(DEGREES);
  rebutton = createButton('restart');
  rebutton.position(150, height+10);
  rebutton.size(100,25);
  rebutton.style('background-color','#202020');
  rebutton.style('color','#FFFFFF');

  stbutton = createButton('start');
  stbutton.position(20, height+10);
  stbutton.size(100,25);
  stbutton.style('background-color','#202020');
  stbutton.style('color','#FFFFFF');

  liquid = new Liquid(0, 0, width, height, 0.1);
  reset();

  // Here we call methods of each element to set the position and id, try changing these values.
  text1.position(10,height+20);
  text2.position(10,height+40);
  text3.position(10,height+60);
  

}

function draw() {
  //background
  background(0);
  //liquid
  liquid.display();
  //mouse
  drawReticle();

  //game
  timer += 1;
  difficulty += 0.001;
  spawndelay = int(100/difficulty);
  if (timer % spawndelay == 0) {
    let anenemy = new Enemy();
    enemys.push(anenemy);
  }
  textSize(20);
  fill(0);
  let s1 = 'score : '+score;
  let s2 = 'hp : '+player.hp;
  let s3 = 'difficulty : '+int(difficulty*10)/10;
  text(s1,10,30);
  text(s2,10,60);
  text(s3,10,90);
  rebutton.mousePressed(reset);
  stbutton.mousePressed(starts);

  //bullet
	for (let i = 0; i < bullets.length; i++){
    if (liquid.contains(bullets[i])) {
      let dragForce = liquid.calculateDrag(bullets[i]);
      bullets[i].applyForce(dragForce.mult(0.5));
    }
    let gravity = createVector(0, 0.01 * bullets[i].mass);
    bullets[i].applyForce(gravity);
		bullets[i].update();
		bullets[i].display();
		if (bullets[i].outOfBounds()){
      bullets.splice(i,1);
      continue;
    }
    if (bullets[i].hitScan()) {
      bullets.splice(i,1);
      continue;
    }
	}

  //enemy
  for (let i = 0; i < enemys.length; i++) {
    if (liquid.contains(enemys[i])) {
      let dragForce = liquid.calculateDrag(enemys[i]);
      enemys[i].applyForce(dragForce.mult(0.3));
    }
    let gravity = createVector(0, 0.01 * enemys[i].mass);
    enemys[i].applyForce(gravity);
    enemys[i].update();
    enemys[i].display();
    enemys[i].applyForce(enemys[i].seek());
    if (enemys[i].outOfBounds()){
          enemys.splice(i,1);
    } 
  }

  //player
  movers[0] = player;

  for (let i = 0; i < movers.length; i++) {
    if (liquid.contains(movers[i])) {
      let dragForce = liquid.calculateDrag(movers[i]);
      movers[i].applyForce(dragForce);
    }
    let gravity = createVector(0, 0.1 * movers[i].mass);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
    movers[i].move();
    movers[i].hitScan();
  }

  if (player.hp < 1) {
    gameOver();
  }

  if (!started) {
    beforeStart();
  }

}

function beforeStart() {
  push();

  noStroke();
  fill(130,200,240);
  rect(0,200,600,200);
  textAlign(CENTER);
  textSize(50);
  fill(20);
  text('Ready?',width/2,height/2);

  textSize(18);
  fill(20);
  let s = "press Start button to play";
  text(s,width/2,height/2+40);

  pop();
  noLoop();
}

function starts() {
  started = true;
  bullets = [];
  enemys = [];
  difficulty = 1;
  timer = 0;
  score = 0;
  loop();
  stbutton.hide();
}

function gameOver() {
  push();

  noStroke();
  fill(130,200,240);
  rect(0,200,600,200);
  textAlign(CENTER);
  textSize(50);
  fill(20);
  text('Game Over',width/2,height/2);

  textSize(18);
  fill(20);
  let s = "score : " + score;
  text(s,width/2,height/2+40);

  pop();
  noLoop();
}

function mousePressed() {
	let mouseVector = getMouseVector();
	abullet = new Bullet(mouseVector);
	bullets.push(abullet);
}

function getMouseVector() {
  let mouseXa = mouseX - player.position.x;
  let mouseYa = mouseY - player.position.y;
  let ans = createVector(mouseXa,mouseYa);
  ans.normalize();
  return ans;
}

function drawReticle() {
  noFill();
  strokeWeight(2);
  stroke(0,100,125,125);
  ellipse(mouseX,mouseY,30);
  strokeWeight(1);
  stroke(80,160,200,125);
  line(mouseX,mouseY-18,mouseX,mouseY+18);
  line(mouseX-18,mouseY,mouseX+18,mouseY);
}

function reset() {
  bullets = [];
  movers = [];
  enemys = [];
  player = new Mover(3.5,width/2,height/2);
  difficulty = 1;
  timer = 0;
  score = 0;
  started = false;
  stbutton.show();
  loop();
}


