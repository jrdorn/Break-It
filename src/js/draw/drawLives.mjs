//display hearts to count lives

export let drawLives = (stateLives, strImg) => {
  let str = "";
  for (let i = 0; i < stateLives; i++) {
    str += strImg;
  }
  return str;
};
