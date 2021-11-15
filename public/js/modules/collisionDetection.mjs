//handle collision for ball and bricks
export function collisionDetection(
  Bricks,
  Game,
  Sfx,
  Displays,
  canvas,
  x,
  y,
  dy,
  m
) {
  for (let c = 0; c < Bricks.brickColumnCount; c++) {
    for (let r = 0; r < Bricks.brickRowCount; r++) {
      let b = Bricks.bricks[c][r];
      if (b.health > 0) {
        if (
          x > b.x &&
          x < b.x + Bricks.brickWidth &&
          y > b.y &&
          y < b.y + Bricks.brickHeight
        ) {
          //handle brick collision
          m.randomSound("brickSound", Sfx); //play random sound on collision
          dy = -dy;
          b.health--;
          if (b.health === 0) {
            Game.score++;
          }
          //level won when all bricks are smashed
          if (Game.score === Bricks.brickRowCount * Bricks.brickColumnCount) {
            Sfx.winSound.play();
            Bricks.setUp();
            m.displayScreen("winDisplay");
            canvas.classList.add("hidden");
            Displays.slDisplay.classList.add("hidden");
            Game.stop();
            Game.won = true;
          }
        }
      }
    }
  }
}
