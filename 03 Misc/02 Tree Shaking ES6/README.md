# 02 Tree Shaking ES6

On of the most interest features that ships Webpack 2 is Tree Shaking: this allows to remove from a destination bundle the exports that are not in use by the project, reducing dramatically the site of our bundle.

We will start from sample _01 Styles/03 SASS_ and we are going to create a simple sample in ES6:

- A calculator module where we create an export per basic operation (sum, substract, mul, div..).

- A `main.js` file that will import this calculator module and use only sum operation.

We will use webpack's 2 tree shaking and check that we end up having a bundle that doesn't contain the code for substract, mul, and div

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 SASS_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- We are going to start with a new sample, let's clear up the `students.js` file and start from scratch.

  - Remove `src/mystyles.scss`.
  - Remove `src/averageService.js`.
  - Remove `src/students.js`.

- Now, we can uninstall `jquery` because we don't need for this sample:

```
npm uninstall jquery --save
```

- First create a file called _`calculator.js`_ and export four functions:

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

- Let's add a _`index.js`_ file that will just make an `h1` of the result.

### ./src/index.js
```javascript
import {sum} from './calculator';

const result = sum(2, 2);

const element = document.createElement('h1');
element.innerHTML = `Sum result: ${result}`;

document.body.appendChild(element);

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

- To avoid each time we run build delete the dist folder manually, we are going to install a package that does it for us:

```
npm install rimraf --save-dev
```

- Finaly we are going to add two commands in `package.json` to run webpack builds:

### ./package.json
```diff
{
  ...
  "scripts": {
-   "start": "webpack-dev-server"
+   "start": "webpack-dev-server",
+   "build:dev": "rimraf dist && webpack",
+   "build:prod": "rimraf dist && webpack -p"
  },
  ...
}

```

- Running `npm run build:dev`, we can see in `dist` folder that all methods are imported:

### ./dist/...app.js
```diff
...
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sum = sum;
exports.substract = substract;
exports.mul = mul;
exports.div = div;
function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calculator = __webpack_require__(0);

var result = (0, _calculator.sum)(2, 2);

var element = document.createElement('h1');
element.innerHTML = 'Sum result: ' + result;

document.body.appendChild(element);

/***/ })
/******/ ]);

...
```

- How we can configure to avoid unused modules? We have to take into account that [Webpack 2 Tree Shaking](https://webpack.js.org/guides/tree-shaking/#components/sidebar/sidebar.jsx) comes with a built-in support for ES6 modules (alias harmony modules), that why we need to tell babel to use this kind of modules.

- By default, `babel-preset-env` package has enable transformation [ES6 modules to `commonjs`](http://babeljs.io/docs/plugins/preset-env/#optionsmodules), we need to disable it:

### ./.babelrc
```diff
{
  "presets": [
-   "env",
+   [
+     "env",
+     {
+       "modules": false,
+     },
+   ],
  ]
}

```

> NOTE: We need to wrap `env preset` inside array for add preset options, [example here](http://babeljs.io/docs/plugins/preset-env/#examples-export-with-various-targets).

- Running `npm run build:dev` again:

### ./dist/...app.js
```diff
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sum;
/* unused harmony export substract */
/* unused harmony export mul */
/* unused harmony export div */
function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculator__ = __webpack_require__(0);


var result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__calculator__["a" /* sum */])(2, 2);

var element = document.createElement('h1');
element.innerHTML = 'Sum result: ' + result;

document.body.appendChild(element);

/***/ })

```

- Now webpack knows which `harmony modules` (ES6 modules) are unused. If we run `npm run build:prod`, they won't be included in the build.

### ./dist/...app.js
```diff
webpackJsonp([1,2],[function(e,n,t){"use strict";function u(e,n){return e+n}n.a=u},,function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var u=t(0),c=t.i(u.a)(2,2),r=document.createElement("h1");r.innerHTML="Sum result: "+c,document.body.appendChild(r)}],[2]);
```
