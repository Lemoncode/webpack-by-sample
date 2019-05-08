export function getAvg(scores) {
  return getTotalScore(scores) / scores.length;
 }
 
 export function getTotalScore(scores) {
   return scores.reduce((score, count) => score + count);
 }
 
 console.log(`We are in: ${process.env.NODE_ENV}`);
 console.log(`Api base: ${process.env.API_BASE}`);
