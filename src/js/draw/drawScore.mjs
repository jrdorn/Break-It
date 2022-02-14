//display score above canvas

export let drawScore = (myScore, gameScore) => {
  return (myScore.innerHTML = `SCORE: ${gameScore}`);
};
