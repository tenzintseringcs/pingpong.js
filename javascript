//variable declaring for future code
let handshake = false;
let court = false;
let paddle = false;
let ball = false;
let player = false;
let ellipseX = 200;
let ellipseY = 200;
let ballSpeedX = 2;
let ballSpeedY = 2;
let hasBeenHit = false;
let score = 0;
let win = false;
//preloading images
function preload() {
  pingPong = loadImage(
    'https://media.istockphoto.com/id/936128302/photo/table-tennis-fair-play-after-match.jpg?s=612x612&w=0&k=20&c=iQv5IRue2PSL3xsVo-JhlgjxoTNnzB6fh3yAJUns88I='
  );
  effect = loadSound('ping-pong-ball-100074.mp3');
}
//creating the canvas
function setup() {
  createCanvas(400, 400);
  frameRate(60);
}
//drawing all the scenes and sprites
function draw() {
  if (handshake) {
    background(100, 200, 255);
    pingPongHandshake();
  } else {
    gameMenu();
  }
  if (court) {
    pingPongCourt();
    pingPongPaddle();
    pingPongScore();
  }
  if (paddle) {
    pingPongPaddle();
  }
  if (ball) {
    pingPongBall();
  }
  if (player) {
    opponent1();
  }
  if (score >= 10) {
    win = true;
  }
  if (win) {
    textSize(20);
    text('🎉', 50, 100); //First confetti on the left of the preview screen
    text('🎉', 300, 100); //Second confetti on the right of the preview screen
    fill(0); //Color of the second text
    text('Good Job!', 130, 110); //Second text on top of the bear
    text("You're the champion!", 130, 90);
    }
  }
  //keypressed conditionals for key presses
  function keyPressed() {
    if (key === 't') {
      handshake = true;
    }
    if (key === 'h') {
      court = true;
      paddle = true;
      ball = true;
      player = true;
    }
  }
  //function for the menu of the game
  function gameMenu() {
    background('beige');
    textSize(30);
    fill('red');
    text('The Ping Pong Game!', 50, 50);
    text('The Finals Edition', 80, 100);
    text('🏓', (frameCount % 350) + 10, 50);
    text('🏓', 350 - (frameCount % 350), 50);
    text('(Press t to begin)', 80, 150);
    textSize(250);
  }
  //function for the ping pong paddle
  function pingPongPaddle() {
    fill(255);
    ellipse(mouseX, mouseY, 50);
    rect(mouseX - 10, mouseY + 10, 20, 40);
    point(mouseX, mouseY);
  }
  //function for the ping pong ball
  function pingPongBall() {
    ellipse(ellipseX, ellipseY, 20, 20);

    ellipseY += ballSpeedY;

    let hitPaddle = collidePointEllipse(
      mouseX,
      mouseY,
      ellipseX,
      ellipseY,
      50,
      50
    );
    if (hitPaddle) {
      ballSpeedY *= -1;
      effect.play();
    }

    let hitOpponent = collideRectCircle(
      150,
      25,
      100,
      50,
      ellipseX,
      ellipseY,
      20
    );
    if (hitOpponent) {
      ballSpeedY *= -1;
    }

    ellipseX = 200;
  }
  //function for the handshake scene
  function pingPongHandshake() {
    background(pingPong);
    textSize(15);
    text('Shake hands to start the game (Press h on the keyboard)', 10, 50);
    text('Get to a score of 10 to win!', 10, 20);
    text('(Try to softly touch the ball with the paddle)', 10, 80);
  }
  //scene for the ping pong court
  function pingPongCourt() {
    background(220);
    noFill();
    rect(100, 50, 200, 300);
    fill(0);
    rect(100, 200, 200, 1);
  }
  //function for the opponent
  function opponent1() {
    fill(255);
    ellipse(200, 50, 100, 50);
    textSize(20);
    text('⭐', 170, 55);
    text('⭐', 210, 55);
    textSize(10);
    text('3', 200, 70);
    ellipse(180, 20, 20, 30);
    ellipse(220, 20, 20, 30);
  }
  //function for the score of the ping pong game
  function pingPongScore() {
    let hitOpponent = collideRectCircle(
      150,
      25,
      100,
      50,
      ellipseX,
      ellipseY,
      20
    );
    if (hitOpponent) {
      score += 1;
    }
    text('Score:' + score, 40, 50);
}
