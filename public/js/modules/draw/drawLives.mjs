//display hearts to count lives
// stateLives (myGame.lives)
// currLives (myLives.innerHTML)
// strImg ( '<img class="heart" src="img/heart.png" />' )
export let drawLives = (stateLives, strImg) => {
  let str = "";
  for (let i = 0; i < stateLives; i++) {
    str += strImg;
  }
  return str;
};
