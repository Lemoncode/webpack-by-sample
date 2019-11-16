import React from 'react';
import ReactDOM from 'react-dom';
import { AverageComponent } from './averageComponent';
import { TotalScoreComponent } from './totalScoreComponent';
const logoImg = require('./content/logo_1.png');

$('body').css('background-color', 'lightSkyBlue');

const img = document.createElement('img');
img.src = logoImg;

document.getElementById('imgContainer').appendChild(img);

ReactDOM.render(
  <div>
    <h1>Hello from React DOM</h1>
    <AverageComponent />
    <TotalScoreComponent />
  </div>,
  document.getElementById('root')
);
