# 01 Import

In this sample we are going to start working with ES6 modules (import).

We will start from sample _00 Intro/00 Boilerplate_ and add a new JavaScript service that will
hold a simple algorithm to calculate the average of an score array.

We will use this JavaScript array into the main students.js file by importing
it.

Summary steps:
 - Add a new file `averageService.js`
 - Add an array on `students.js`
 - Import averageService into `students.js`
 - Use the averageService features inside the `students.js` code.
 - Transpile and test on `index.html`


# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _00 BoilerPlate_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

  ```
  npm install
  ```

- Let's add a new file called `averageService.js`. This file will contain a function that will calculate the average value of a given array, this function will be exported (make it visible to other modules that need to consume them). So, add the following content to `averageService.js`:

  #### ./averageService.js

  ```javascript
  function getTotalScore(scores) {
    return scores.reduce((totalScore, currentScore) => {
      return totalScore + currentScore;
    });
  }

  export function getAvg(scores) {
    return getTotalScore(scores) / scores.length;
  }
  ```

- Now let's update `students.js` to import the previous file and consume it:

  #### ./students.js

  ```diff javascript
  - // Let's use some ES6 features
  + import {getAvg} from "./averageService";

  - const averageScore = "90";
  + const scores = [90, 75, 60, 99, 94, 30];
  + const averageScore = getAvg(scores);

  const messageToDisplay = `average score ${averageScore}`;

  document.write(messageToDisplay);
  ```

- Finally, let's run webpack from the command prompt by executing the following command:

  ```
  npm start
  ```

  It is time to double-click on the `index.html` and check that the new average function is up and running and has been included in the `bundle.js` file.

  ![running webpack 3](../../99%20Readme%20Resources/00%20Intro/01%20Import/result.png)

## Appendix - Module alternative usage

We have covered a single named export usage in our previous example, but there are some other ways to use modules:

### Default export

  One popular way is using **`export default`** as the export keyword. This will indicate that, by default, there will be just a **single export per module**. Then, we can directly use an import *alias* (by omitting the curly braces) and this will point out to our default exported member (*averarge* function in our example).

  - Default export usage in `averageService.js`:

    #### ./averageService.js

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

  - Default import usage in `students.js`:

    #### ./students.js

    ```diff
    - import {getAvg} from "./averageService";
    + import getAvg from "./averageService";

    const scores = [90, 75, 60, 99, 94, 30];
    const averageScore = getAvg(scores);

    const messageToDisplay = `average score ${averageScore}`;

    document.write(messageToDisplay);
    ```

### Multiple named exports

Let's consider two functions, *getAvg* and *getTotalScore*, for the sake of this example. We can export both using named exports, just by adding the **export** keyword on each function.

  - Multiple exports usage in `averageService.js`:

    #### ./averageService.js

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
Now, we can import them in several ways into `students.js`:

  - Import both members into the current scope:

    #### ./students.js

    ```diff
    - import getAvg from "./averageService";
    + import {getAvg, getTotalScore} from "./averageService";

    const scores = [90, 75, 60, 99, 94, 30];
    const averageScore = getAvg(scores);
    + const totalScore = getTotalScore(scores);

    - const messageToDisplay = `average score ${averageScore}`;
    + const messageToDisplayAvg = `average score ${averageScore} `;
    + const messageToDisplayTotal = `total score ${totalScore}`;

    - document.write(messageToDisplay);
    + document.write(messageToDisplayAvg);
    + document.write(messageToDisplayTotal);

    ```  

  - Import the entire module's content by using the wildcard `*` and a *name* for our module. This *name* will hold all the exported members in our current scope (*name* is used as namespace):

    #### ./students.js

    ```diff
    - import {getAvg, getTotalScore} from "./averageService";
    + import * as averageService from "./averageService";

    const scores = [90, 75, 60, 99, 94, 30];
    - const averageScore = getAvg(scores);
    - const totalScore = getTotalScore(scores);
    + const averageScore = averageService.getAvg(scores);
    + const totalScore = averageService.getTotalScore(scores);

    const messageToDisplayAvg = `average score ${averageScore} `;
    const messageToDisplayTotal = `total score ${totalScore}`;

    document.write(messageToDisplayAvg);
    document.write(messageToDisplayTotal);

    ```
