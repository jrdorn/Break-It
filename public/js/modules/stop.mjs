//mark game as stopped and reset score and lives
export let stop = (winOrLose, Game, Sfx, Bricks, Vars, Displays, m) => {
  if (winOrLose === "win") {
    //
    Sfx.winSound.play();
    Bricks.init(); //reset bricks
    m.displayScreen(Displays.winDisplay); //display win screen
    Vars.canvas.classList.add("hidden"); //hide game canvas
    Displays.slDisplay.classList.add("hidden"); //hide score/ lives
    //
  } else if (winOrLose === "lose") {
    //
    Sfx.loseSound.play();
    Bricks.init(); //reset bricks
    m.displayScreen(Displays.loseDisplay); //display lose screen
    Vars.canvas.classList.add("hidden"); //hide game canvas
    Displays.slDisplay.classList.add("hidden"); //hide score/ lives
    //
  }

  //reset state, score, lives, ball coordinates
  Game.state = 0;
  Game.score = 0;
  Game.lives = 3;
  Vars.x = Vars.canvas.width / 2;
  Vars.y = Vars.canvas.height - 30;
  Vars.dx = 3;
  Vars.dy = -3;
};
