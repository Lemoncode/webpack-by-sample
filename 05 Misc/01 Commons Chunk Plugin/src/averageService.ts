export function getAvg(scores): number {
 return getTotalScore(scores) / scores.length;
}

function getTotalScore(scores): number {
  return scores.reduce((score, count) => {
    return score + count;
  });
}
