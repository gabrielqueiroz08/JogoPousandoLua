let ground;
let lander;
var lander_img;
var bg_img;
var thrust;
var rcs_left;
var rcs_right;
var lz_image;
var lz;
var landing;
var part1_image;
var part1;

var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 100;

function preload() {
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  thrust = loadAnimation("b_thrust_1.png", "b_thrust_2.png", "b_thrust_3.png");
  crash = loadAnimation("crash1.png", "crash2.png", "crash3.png");
  land = loadAnimation("landing1.png", "landing2.png", "landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png", "left_thruster_2.png");
  normal = loadAnimation("normal.png");
  rcs_right = loadAnimation("right_thruster_1.png", "right_thruster_2.png");
  lz_image = loadImage("lz.png")
  part1_image = loadImage("part1.png")


  thrust.playing = true;
  thrust.looping = false;
  rcs_left.looping = false;
  rcs_right.looping = false;
  land.looping = false;
  crash.looping = false;
}

function setup() {
  createCanvas(1000, 700);
  frameRate(80);
  timer = 1500;

  thrust.frameDelay = 5;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;

  part1 = createSprite(800,637,25,15);
  part1.addImage(part1_image);
  part1.scale = 0.1;
  part1.setCollider("rectangle", 0, 0, 200, 200);
  

  lander = createSprite(100, 50, 30, 30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle", 0, 0, 200, 200)

  //lander.addAnimation('thrust',"b_thrust_1.png","b_thrust_2.png","b_thrust_3.png" );
  lander.addAnimation('thrusting', thrust);
  lander.addAnimation('left', rcs_left);
  lander.addAnimation('normal', normal);
  lander.addAnimation('right', rcs_right);
  lander.addAnimation('crashing', crash);
  lander.addAnimation('landing', land);

  ground = createSprite(500, 690, 1000, 20);

  lz = createSprite(800,610,50,30);
  lz.addImage(lz_image);
  lz.scale = 0.3;
  lz.setCollider("rectangle", 0, 780, 400, 100);

  rectMode(CENTER);
  textSize(15);
}

function draw() {
  background(51);
  image(bg_img, 0, 0);
  push()
  fill(255);
  text("Velocidade Horizontal: " + round(vx, 2), 800, 50);
  text("Combustível: " + fuel, 800, 25);
  text("Velocidade Vertical: " + round(vy), 800, 75);
  pop();

  //descida
  vy += g;
  lander.position.y += vy;
  lander.position.x += vx;

  if (lander.collide(ground) == true) {
    console.log("collided");
    lander.changeAnimation("crashing");
    vx = 0;
    vy = 0;
    g = 0;
  }

  var d = dist(lander.position.x, lander.position.y, lz.position.x, lz.position.y);

  if(d <= 35 && (vy < 2 && vy > -2) && (vx < 2 && vx > -2)) {
    vx = 0;
    vy = 0;
    g= 0;
  }

  // if(lander.collide(part1) == true) {
  //   console.log("colisão")
  //   part1.display = false;
  // }


  drawSprites();
}

function keyPressed() {
  if (keyCode == UP_ARROW && fuel > 0) {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();

  }
  if (keyCode == RIGHT_ARROW && fuel > 0) {
    lander.changeAnimation('left');
    right_thrust();
  }

  if (keyCode == LEFT_ARROW && fuel > 0) {
    lander.changeAnimation('right');
    left_thrust();
  }
}

function upward_thrust() {
  vy = -1;
  fuel -= 1;
}

function right_thrust() {
  vx += 0.2;
  fuel -= 1;
}

function left_thrust() {
  vx -= 0.2;
  fuel -= 1;
}

