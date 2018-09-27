import {getAvg} from "./averageService";
import * as $ from 'jquery';
import rightPad from 'right-pad';

$('body').css('background-color', 'lightSkyBlue');

const scores: number[] = [90, 75, 60, 99, 94, 30];
const averageScore: number = getAvg(scores);

const messageToDisplay: string = rightPad(`average score ${averageScore}`, 50, 'jorobateflanders');

document.write(messageToDisplay);
