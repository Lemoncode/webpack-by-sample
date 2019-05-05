import {getAvg} from "./averageService";

$('body').css('background-color', 'lightSkyBlue');

// No need to type this it would be already inferred by typescript
const scores: number[] = [90, 75, 60, 99, 94, 30];

const averageScore: number = getAvg(scores);

const messageToDisplay: string = `average score ${averageScore}`;

document.write(messageToDisplay);
