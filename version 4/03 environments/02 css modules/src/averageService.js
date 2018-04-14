export function getAvg(scores) {
    return getTotalScore(scores) / scores.length;
}
// add export to the function
export function getTotalScore(scores) {    
    return scores.reduce((score, count) => score + count);
}
