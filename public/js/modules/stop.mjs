//mark game as stopped and reset score and lives
export function stop(winOrLose, Game, Sfx, Bricks, Vars, Displays, m) {
  if (winOrLose === "win") {
    //
    Sfx.winSound.play();
    Bricks.init();
    m.displayScreen(Displays.winDisplay);
    Vars.canvas.classList.add("hidden");
    Displays.slDisplay.classList.add("hidden");
    //
  } else if (winOrLose === "lose") {
    //
    Sfx.loseSound.play();
    Bricks.init();
    m.displayScreen(Displays.loseDisplay);
    Vars.canvas.classList.add("hidden");
    Displays.slDisplay.classList.add("hidden");
    Game.lives = 4;
    //
  }

  Game.state = 0;
  Game.score = 0;
  Game.lives = 3;
  return Game;
}
