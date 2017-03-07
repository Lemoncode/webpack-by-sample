import {getAvg} from "./averageService";
import * as $ from 'jquery';

$('body').css('background-color', 'lightSkyBlue');

const scores: number[] = [90, 75, 60, 99, 94, 30];
const averageScore: number = getAvg(scores);

const messageToDisplay: string = `average score ${averageScore}`;

document.write(messageToDisplay);
