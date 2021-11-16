import * as m from "./modules/index.mjs";

//TODO
//Bounce in opp direction on brick contact
//Mod wall collision
//Restart after spacebar on win screen
//Move paddle module

(function () {
  // || Variables

  // const myScore = document.querySelector("#score");
  // const myLives = document.querySelector("#hearts");
  // const canvas = document.querySelector("canvas");
  // canvas.width = 400;
  // canvas.height = 250;
  // const ctx = canvas.getContext("2d");

  // const itemColor = "#6c9950"; //green
  // const brokenColor1 = "#509199"; //xxxx to display when brick hit twice
  // const brokenColor2 = "#7D5099"; //xxxx to display when brick hit twice

  // const paddleHeight = 10;
  // const paddleWidth = 60;
  // let paddleX = (canvas.width - paddleWidth) / 2; // x coordinates of paddle
  // let rightPressed = false;
  // let leftPressed = false;

  // const ballRadius = 15;
  // let x = canvas.width / 2; //x coordinates of ball
  // let y = canvas.height - 30; //y coordinates of ball
  // let dx = 3;
  // let dy = -3;

  // || Event Listeners
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  // || Event Handlers

  //move paddle left or right on arrow key press
  function keyDownHandler(e) {
    e.preventDefault(); //prevent page from moving
    if (e.code === "ArrowRight") {
      rightPressed = true;
    } else if (e.code === "ArrowLeft") {
      leftPressed = true;
    }
    //handle spacebar, include closure for state?
  }

  //stop moving paddle when arrow key released
  function keyUpHandler(e) {
    if (e.code === "ArrowRight") {
      rightPressed = false;
    } else if (e.code === "ArrowLeft") {
      leftPressed = false;
    } else if (e.code === "Space") {
      //start game when user presses space
      run();
    }
  }

  //////////////////////////////////////////
  // function muteUmute() {
  //   let muteButton = document.createElement("button");
  // }
  //////////////////////////////////////////

  // || Run game

  //init classes to run game
  let Vars = new m.Vars();
  let Bricks = new m.Bricks();
  let Displays = new m.Displays();
  let Game = new m.Game();
  let Sfx = new m.Sfx();

  //initialize bricks on page load
  Bricks.init();

  //display start screen on page load
  m.displayScreen(Displays.startDisplay);

  //play start sound and draw components when user presses space
  function run() {
    //start game
    m.start(Game, Displays, Vars.canvas, Sfx);

    //create canvas
    ctx.clearRect(0, 0, Vars.canvas.width, Vars.canvas.width);

    //draw bricks
    m.drawBricks(
      ctx,
      Bricks,
      Vars.itemColor,
      Vars.brokenColor1,
      Vars.brokenColor2
    );

    //draw ball
    m.drawBall("img/ball.png", Vars.ctx, Vars.x, Vars.y);

    //draw paddle
    m.drawPaddle(
      Vars.paddleX,
      Vars.itemColor,
      Vars.ctx,
      Vars.canvas.height,
      Vars.paddleWidth,
      Vars.paddleHeight
    );

    //draw score
    m.drawScore(myScore, Game.score);
    myLives.innerHTML = m.drawLives(
      Game.lives,
      '<img class="heart" src="img/heart.png" />'
    );

    //handle collision when ball hits brick
    m.brickCollision(
      Bricks,
      Game,
      Sfx,
      Displays,
      Vars.canvas,
      Vars.x,
      Vars.y,
      Vars.dy,
      m
    );

    //handle paddle movement
    m.movePaddle();

    //increment ball coords
    x += dx;
    y += dy;

    //exit when game won
    // if (Game.won === true) {
    //   Game.won = false;
    //   return;
    // }

    //display next frame of game
    requestAnimationFrame(run);
  }
})();
