# 01 Import

In this sample we are going to start working with es6 modules (import).

We will start from sample _00 Intro/00 Boilerplate_ and add a new JavaScript that will
hold a simple algorithm to calculate the average of an score array.

We will use this JavaScript array into the main students.js file by importing
it.

Summary steps:
 - Add a new file averageService.js
 - Add an array on students.js
 - Import averageService into students.js
 - Use the averageService inside the students.js code.
 - Transpile and test on index.html


# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _00 BoilerPlate_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- Let's add a new file called averageService.js, this file will contain a function that will calculate the average value of a given array, this function will be exported (make it visible to other modules that need to consume them).

### ./averageService.js
```javascript
export function getAvg(scores) {
 return getTotalScore(scores) / scores.length;
}

function getTotalScore(scores) {
  return scores.reduce((score, count) => {
    return score + count;
  });
}

```

- Now let's update students.js to import that file and consume it.

```diff
- // Let's use some ES6 features
+ import {getAvg} from "./averageService";

- const averageScore = "90";
+ const scores = [90, 75, 60, 99, 94, 30];
+ const averageScore = getAvg(scores);

const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```

- Now let's run webpack from the command prompt and click on the index.html, we
can see that the new average function is up and running and has been included in
the bundle.js file.

![running webpack 2](../../99%20Readme%20Resources/00%20Intro/01%20Import/result.png)

## Appendix - Playing with import

- There are other ways to use modules, one popular way is to use "export default"
indicating that by default the average function will be the one exported, then
we can directly use an import "alias" and this will point out to our averarge function.

Export default (averageService.js)

```diff
- export function getAvg(scores) {
+ export default function getAvg(scores) {
 return getTotalScore(scores) / scores.length;
}

function getTotalScore(scores) {
  return scores.reduce((score, count) => {
    return score + count;
  });
}

```

Import and usage (students.js)

```diff
- import {getAvg} from "./averageService";
+ import getAvg from "./averageService";

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);

const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```


- Another way to use import is to use `*` to indicate we want to import everything
from that module, let's add for the sake of this sample two functions sum and average,
then on the main students file we can import everything provides an alias and use
the function we need.

Several Exports (AverageService)

```diff
- export default function getAvg(scores) {
+ export function getAvg(scores) {
 return getTotalScore(scores) / scores.length;
}

- function getTotalScore(scores) {
+ export function getTotalScore(scores) {
  return scores.reduce((score, count) => {
    return score + count;
  });
}


```

Import * and usage sum + average

```diff
- import getAvg from "./averageService";
+ import * as averageService from "./averageService";

const scores = [90, 75, 60, 99, 94, 30];
- const averageScore = getAvg(scores);
+ const averageScore = averageService.getAvg(scores);
+ const totalScore = averageService.getTotalScore(scores);

- const messageToDisplay = `average score ${averageScore}`;
+ const messageToDisplayAvg = `average score ${averageScore} `;
+ const messageToDisplayTotal = `total score ${totalScore}`;

- document.write(messageToDisplay);
+ document.write(messageToDisplayAvg);
+ document.write(messageToDisplayTotal);

```
