# 02 Tree Shaking ES6

On of the most interest features that ships Webpack 2 is Tree Shaking: this allows to remove from a destination bundle the exports that are not in use by the project, reducing dramatically the site of our bundle.

We will start from sample _01 Styles/03 SASS_ and we are going to create a simple sample in ES6:

- A calculator module where we create an export per basic operation (sum, substract, mul, div..).

- A main.js file that will import this calculator module and use only sum operation.

We will use webpack's 2 tree shaking and check that we end up having a bundle that doesn't contain the code for substract, mul, and div

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 SASS_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- We are going to start with a new sample, let's clear up the students.js file and start from scratch.

  - Remove `src/mystyles.scss`.
  - Remove `src/averageService.js`.
  - Remove `src/students.js`.

- Now, we can uninstall `jquery` because we don't need for this sample:

```
npm uninstall jquery --save
```

- First create a file called _calculator.js_ and export four functions:

### ./src/calculator.js
```javascript
export function sum(a, b) {
   return a + b;
}

export function substract(a,b) {
  return a - b;
}

export function mul(a, b) {
  return a * b;
}

export function div(a, b) {
  return a / b;
}

```

- Let's add a _index.js_ file that will just make a document.write of the result.

### ./src/index.js
```javascript
import {sum} from './calculator';

const result = sum(2, 2);

document.write(`Sum result: ${result}`);

```

- Update `index.html`

### ./src/index.html
```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 2.x by sample</title>
  </head>
  <body>
-   <div class="jumbotron">
-     <h1>Testing Bootstrap</h1>
-     <p>
-       Bootstrap is the most popular ...
-     </p>
-   </div>
-   Hello Webpack 2!
-   <div class="red-background ">
-     RedBackground stuff
-   </div>
  </body>
</html>

```

- And update `webpack.config`:

### ./webpack.config.js
```diff
...

module.exports = {
  context: path.join(basePath, 'src'),
  entry: {
-   app: './students.js',
+   app: './index.js',
-   appStyles: [
-     './mystyles.scss',
-   ],
-   vendor: [
-     'jquery',
-   ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  ...
};

```
