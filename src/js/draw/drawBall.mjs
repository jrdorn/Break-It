//draw ball on a canvas
export let drawBall = (source, context, x, y) => {
  let img = new Image();
  img.src = source;
  context.drawImage(img, x, y);
};
