//move paddle left and right
export let movePaddle = (Vars) => {
  if (
    Vars.rightPressed &&
    Vars.paddleX < Vars.canvas.width - Vars.paddleWidth
  ) {
    Vars.paddleX += 5;
  } else if (Vars.leftPressed && Vars.paddleX > 0) {
    Vars.paddleX -= 5;
  }
  return Vars;
};
