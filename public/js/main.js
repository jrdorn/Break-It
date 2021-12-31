import * as m from "./modules/index.mjs";

/** 
 ||| TODO

  #on start ball flies off screen

  Get app to work after modularizing:
    Bounce in opp direction on brick contact - right now the ball destroys bricks but doesn't bounce back
    Mod wall collision
    Restart after spacebar on win screen

  Before uploading:
    multiple brick colors, backgrounds, levels
    check all comments


  Tutorial/onboarding

 */

(function () {
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
      //start game when user presses space
      run();
    }
  }

  // || Start game

  //init classes to run game
  let Vars = new m.Vars(); //state of (ball, paddle, canvas render), (score, lives, color scheme)
  let Bricks = new m.Bricks(); //keep track of brick count and parameters
  let Displays = new m.Displays(); //variables for screens and components to display
  let Sfx = new m.Sfx(); //sound effects
  let Game = new m.Game(); //keep track of whether the game is running or not, if the user wins, and the user's score and lives

  //initialize bricks on page load
  Bricks.init();

  //display start screen on page load
  m.displayScreen(Displays.startDisplay);

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
    m.drawScore(Vars.myScore, Game.score);
    Vars.myLives.innerHTML = m.drawLives(
      Game.lives,
      '<img class="heart" src="img/heart.png" />'
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
    //exit when game won
    // if (Game.won === true) {
    //   Game.won = false;
    //   return;
    // }
    //

    //display next frame of game
    requestAnimationFrame(run);
  };
})();
