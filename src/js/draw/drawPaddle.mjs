//draw paddle on a canvas

export let drawPaddle = (coords, context, canvasHeight, width, height) => {
  context.beginPath();
  context.rect(coords, canvasHeight - height, width, height);
  context.fillStyle = "#b7410e";
  context.fill();
  context.closePath();
};
