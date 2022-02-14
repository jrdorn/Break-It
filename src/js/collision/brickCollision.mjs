//handle brick collision
export let brickCollision = (Bricks, Game, Sfx, Displays, Vars, m) => {
  //setup row and column listeners
  for (let c = 0; c < Bricks.brickColumnCount; c++) {
    for (let r = 0; r < Bricks.brickRowCount; r++) {
      let b = Bricks.bricks[c][r];
      //if brick has not been smashed already and ball collides
      if (b.health > 0) {
        if (
          Vars.x > b.x &&
          Vars.x < b.x + Bricks.brickWidth &&
          Vars.y > b.y &&
          Vars.y < b.y + Bricks.brickHeight
        ) {
          Sfx.randomBrickSound(); //play collision sound
          Vars.dy = -Vars.dy; //reverse ball direction of travel
          b.health--; //decrement brick health
          if (b.health === 0) {
            Game.score++; //increase score if brick is smashed
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
