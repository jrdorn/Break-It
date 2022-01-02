//draw ball on a canvas
export let drawBall = (source, context, x, y) => {
  let img = new Image();
  img.src = source;
  // context.drawImage(img, x, y);

  //
  //rotate ball
  //
  let to_radians = Math.PI / 180;
  //save current coords
  context.save();

  //move to center of img
  context.translate(x, y);

  //rotate around that point
  context.rotate(Math.random() * to_radians);

  //draw up and to the left by half the width and height of the image
  context.drawImage(img, -(img.width / 2), -(img.height / 2));

  //restore initial coordinates
  context.restore();
};
