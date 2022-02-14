import * as m from "./js/main.mjs";
import "./css/style.css";

import bgStart from "./img/bgStart.png";
import lvl1 from "./img/lvl1.png";
import ninja_star from "./img/ninja_star.png";
import heart from "./img/heart.png";

(() => {
  // || Initialize

  //classes to run game
  let Vars = new m.Vars(); //state of (ball, paddle, canvas render), (score, lives, color scheme)
  let Bricks = new m.Bricks(); //keep track of brick count and parameters
  let Displays = new m.Displays(); //variables for screens and components to display
  let Sfx = new m.Sfx(); //sound effects
  let Game = new m.Game(); //keep track of whether the game is running or not, if the user wins, and the user's score and lives
  const body = document.querySelector("body"); //get body element to set background images
  const startAnim = document.querySelector("#startAnim"); //empty div to hold start animation

  //load bricks
  Bricks.init();

  //display start screen on page load
  m.displayScreen(Displays.startDisplay);
  body.style.background = `url(${bgStart})`;

  //mountain animation loop
  let stopAnim = false;

  startAnim.classList.remove("hidden");

  const max = 0;
  const saWrap = document.querySelector("#saWrap");
  let saPos = -400;

  let startAnimFrame = () => {
    saPos += 0.25;

    //reset position
    if (saPos > max) {
      saPos = -400;
    }

    //update position
    startAnim.style.transform = `translateX(${saPos}px)`;
    if (stopAnim) {
      startAnim.classList.add("hidden");
      return;
    }
    requestAnimationFrame(startAnimFrame);
  };
  startAnimFrame();

  // || Event Listeners
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  // || Event Handlers

  //move paddle left or right on arrow key press
  function keyDownHandler(e) {
    e.preventDefault(); //prevent page from moving
    if (e.code === "ArrowRight") {
      Vars.rightPressed = true;
    } else if (e.code === "ArrowLeft") {
      Vars.leftPressed = true;
    }
    //||| handle spacebar, include closure for state?
  }

  //stop moving paddle when arrow key released
  function keyUpHandler(e) {
    if (e.code === "ArrowRight") {
      Vars.rightPressed = false;
    } else if (e.code === "ArrowLeft") {
      Vars.leftPressed = false;
    } else if (e.code === "Space") {
      //if no game is running, start game when user presses space
      if (Game.state === 0) {
        run();
        stopAnim = true;
        //
        body.style.background = `url(${lvl1})`; //level 1 bg
        //
      }
    }
  }

  // || Run Game

  //play start sound and draw components when user presses space
  let run = () => {
    //start game if no game is currently running
    m.start(Game, Displays, Vars.canvas, Sfx);

    //create canvas
    Vars.ctx.clearRect(0, 0, Vars.canvas.width, Vars.canvas.width);

    //draw bricks
    m.drawBricks(
      Vars.ctx,
      Bricks,
      Vars.itemColor,
      Vars.brokenColor1,
      Vars.brokenColor2
    );

    //draw ball
    m.drawBall(ninja_star, Vars.ctx, Vars.x, Vars.y);

    //draw paddle
    m.drawPaddle(
      Vars.paddleX,
      Vars.ctx,
      Vars.canvas.height,
      Vars.paddleWidth,
      Vars.paddleHeight
    );

    //draw score
    m.drawScore(Vars.myScore, Game.score);
    Vars.myLives.innerHTML = m.drawLives(
      Game.lives,
      `<img class="heart" src=${heart} />`
    );

    //handle collision when ball hits brick
    m.brickCollision(Bricks, Game, Sfx, Displays, Vars, m);

    // //handle collision when ball hits wall
    m.wallPaddleCollision(Sfx, Vars, Game, Bricks, Displays, m);

    //handle paddle movement
    Vars = m.movePaddle(Vars);

    //increment ball coords
    Vars.x += Vars.dx;
    Vars.y += Vars.dy;

    //
    //break when game ends
    if (Game.state === 0) {
      return;
    }
    //

    //display next frame of game
    requestAnimationFrame(run);
  };
})();
