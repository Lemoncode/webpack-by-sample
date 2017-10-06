import { getAvg } from './averageService';
import { cloneDeep } from 'lodash';

$('body').css('background-color', 'lightSkyBlue');

const scores = [90, 75, 60, 99, 94, 30];
const clonedScores = cloneDeep(scores);

const averageScore = getAvg(scores);
const clonedAverageScore = getAvg(clonedScores);

const messageToDisplay = `average score ${averageScore},
cloned: ${clonedAverageScore}`;

document.write(messageToDisplay);
