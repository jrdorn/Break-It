//display score above canvas
// gameScore = myGame.score
export let drawScore = (myScore, gameScore) => {
  return (myScore.innerHTML = `SCORE: ${gameScore}`);
};
