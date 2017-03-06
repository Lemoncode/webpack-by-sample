import {getAvg} from "./averageService";
import logoImg from './content/logo_2.png';

$('body').css('background-color', 'lightSkyBlue');

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);

const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);

const img = document.createElement('img');
img.src = logoImg;

document.getElementById('imgContainer').appendChild(img);
