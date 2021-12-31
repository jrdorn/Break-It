//handle wall and paddle collision
export function wallPaddleCollision(Sfx, Vars, Game, Bricks, Displays, m) {
  //ball bounces off side wall
  if (
    Vars.x + Vars.dx > Vars.canvas.width - Vars.ballRadius ||
    Vars.x + Vars.dx < Vars.ballRadius
  ) {
    Sfx.wallSound.play();
    // console.log(canvas.width); 400
    Vars.dx = -Vars.dx;
  }

  //ball bounces off top wall
  if (Vars.y + Vars.dy < 1) {
    Sfx.wallSound.play();
    Vars.dy = -Vars.dy;
  } else if (Vars.y + Vars.dy > Vars.canvas.height - Vars.ballRadius) {
    if (Vars.x > Vars.paddleX && Vars.x < Vars.paddleX + Vars.paddleWidth) {
      //paddle collision
      Sfx.paddleSound.play();
      Vars.dy = -Vars.dy;
    } else {
      //ball hit ground
      Sfx.dropSound.play();
      Game.lives--;
      if (!Game.lives) {
        //display lose screen, exit game and hide canvas/ score/ lives
        Sfx.loseSound.play();
        Bricks.init();
        m.displayScreen(Displays.loseDisplay);
        Vars.canvas.classList.add("hidden");
        Displays.slDisplay.classList.add("hidden");
        m.stop(Game);
        Game.lives = 4;
        return;
      } else {
        Vars.x = Vars.canvas.width / 2;
        Vars.y = Vars.canvas.height - 30;
        Vars.dx = 2;
        Vars.dy = -2;
        Vars.paddleX = (Vars.canvas.width - Vars.paddleWidth) / 2;
      }
    }
  }
}
