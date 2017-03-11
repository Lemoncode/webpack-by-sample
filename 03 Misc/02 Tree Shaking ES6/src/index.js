import {sum} from './calculator';

const result = sum(2, 2);

const element = document.createElement('h1');
element.innerHTML = `Sum result: ${result}`;

document.body.appendChild(element);
