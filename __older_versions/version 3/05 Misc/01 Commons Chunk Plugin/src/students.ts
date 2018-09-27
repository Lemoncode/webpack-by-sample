import {getAvg} from "./averageService";
import * as $ from 'jquery';
import leftPad = require('left-pad');

$('body').css('background-color', 'lightSkyBlue');

const scores: number[] = [90, 75, 60, 99, 94, 30];
const averageScore: number = getAvg(scores);

const messageToDisplay: string = leftPad(`average score ${averageScore}`, 35, 'jorobateflanders');

document.write(messageToDisplay);
