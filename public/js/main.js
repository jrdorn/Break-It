import * as m from "./modules/index.mjs";

(function main() {
  // || Variables

  const myScore = document.querySelector("#score");
  const myLives = document.querySelector("#hearts");
  const canvas = document.querySelector("canvas");
  canvas.width = 400;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");
  const ballRadius = 15;

  const itemColor = "#6c9950"; //green
  const brokenColor1 = "#509199"; //xxxx to display when brick hit twice
  const brokenColor2 = "#7D5099"; //xxxx to display when brick hit twice

  const paddleHeight = 10;
  const paddleWidth = 60;
  let paddleX = (canvas.width - paddleWidth) / 2; // x coordinates of paddle

  let x = canvas.width / 2; //x coordinates of ball
  let y = canvas.height - 30; //y coordinates of ball

  let dx = 3;
  let dy = -3;

  let rightPressed = false;
  let leftPressed = false;

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
    m.start(Game, Displays, canvas, Sfx);

    //create canvas
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    //draw bricks
    m.drawBricks(ctx, Bricks, itemColor, brokenColor1, brokenColor2);

    //draw ball
    m.drawBall("img/ball.png", ctx, x, y);

    //draw paddle
    m.drawPaddle(
      paddleX,
      itemColor,
      ctx,
      canvas.height,
      paddleWidth,
      paddleHeight
    );

    //draw score
    m.drawScore(myScore, Game.score);
    myLives.innerHTML = m.drawLives(
      Game.lives,
      '<img class="heart" src="img/heart.png" />'
    );

    //handle collision when ball hits brick
    m.collisionDetection(Bricks, Game, Sfx, Displays, canvas, x, y, dy, m);

    //ball bounces off side wall
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      Sfx.wallSound.play();
      dx = -dx;
    }

    //ball bounces off top wall
    if (y + dy < 1) {
      Sfx.wallSound.play();
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        //paddle collision
        Sfx.paddleSound.play();
        dy = -dy;
      } else {
        //ball hit ground
        Sfx.dropSound.play();
        Game.lives--;
        if (!Game.lives) {
          //display lose screen, exit game and hide canvas/ score/ lives
          Sfx.loseSound.play();
          Bricks.init();
          m.displayScreen(Displays.loseDisplay);
          canvas.classList.add("hidden");
          Displays.slDisplay.classList.add("hidden");
          m.stop(Game);
          Game.lives = 4;
          return;
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    //move paddle back and forth
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 5;
    }

    //increment ball coords
    x += dx;
    y += dy;

    //exit when game won
    if (Game.won === true) {
      Game.won = false;
      return;
    }

    //display next frame of game
    requestAnimationFrame(run);
  }
})();
