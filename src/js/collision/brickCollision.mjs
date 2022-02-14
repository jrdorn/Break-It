//handle brick collision
export let brickCollision = (Bricks, Game, Sfx, Displays, Vars, m) => {
  for (let c = 0; c < Bricks.brickColumnCount; c++) {
    for (let r = 0; r < Bricks.brickRowCount; r++) {
      let b = Bricks.bricks[c][r];
      if (b.health > 0) {
        if (
          Vars.x > b.x &&
          Vars.x < b.x + Bricks.brickWidth &&
          Vars.y > b.y &&
          Vars.y < b.y + Bricks.brickHeight
        ) {
          //handle brick collision
          Sfx.randomBrickSound();
          Vars.dy = -Vars.dy;
          b.health--;
          if (b.health === 0) {
            Game.score++;
          }
          //level won when all bricks are smashed
          if (Game.score === Bricks.brickRowCount * Bricks.brickColumnCount) {
            m.stop("win", Game, Sfx, Bricks, Vars, Displays, m);
          }
        }
      }
    }
  }
};
