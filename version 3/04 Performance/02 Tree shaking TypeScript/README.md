# 02 Tree Shaking TypeScript

On of the most interest features that ships Webpack 2 and it has Webpack 3 too, is Tree Shaking: this allows to remove from a destination bundle the exports that are not in use by the project, reducing dramatically the site of our bundle.

We will start from sample _02 Fx/00 TypeScript_ and we are going to create a simple sample in TypeScript:

- A calculator module where we create an export per basic operation (sum, substract, mul, div..).

- A `main.js` file that will import this calculator module and use only sum operation.

We will use webpack's 2 tree shaking and check that we end up having a bundle that doesn't contain the code for substract, mul, and div

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _00 TypeScript_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- We are going to start with a new sample, let's clear up the `students.ts` file and start from scratch.

  - Remove `src/mystyles.scss`.
  - Remove `src/averageService.ts`.
  - Remove `src/students.ts`.

- Now, we can uninstall `jquery` because we don't need for this sample:

```
npm uninstall jquery --save
npm uninstall @types/jquery --save-dev
```

- First create a file called _`calculator.ts`_ and export four functions:

### ./src/calculator.ts
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

- Let's add a _`index.ts`_ file that will just make an `h1` of the result.

### ./src/index.ts
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
    <title>Webpack 3.x by sample</title>
  </head>
  <body>
-   <div class="jumbotron">
-     <h1>Testing Bootstrap</h1>
-     <p>
-       Bootstrap is the most popular ...
-     </p>
-   </div>
-   Hello Webpack 3!
-   <div class="red-background">
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
-   app: './students.ts',
+   app: './index.ts',
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
  
- new webpack.ProvidePlugin({
-   $: "jquery",
-   jQuery: "jquery"
- }),
  ...
};

```

- Running `npm run build`, we can see in `dist` folder that all methods are imported:

### ./dist/...app.js
```diff
webpackJsonp([1],{

/***/ "5fEv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var calculator_1 = __webpack_require__("cOI6");
var result = calculator_1.sum(2, 2);
var element = document.createElement('h1');
element.innerHTML = "Sum result: " + result;
document.body.appendChild(element);


/***/ }),

/***/ "cOI6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function sum(a, b) {
    return a + b;
}
exports.sum = sum;
function substract(a, b) {
    return a - b;
}
exports.substract = substract;
function mul(a, b) {
    return a * b;
}
exports.mul = mul;
function div(a, b) {
    return a / b;
}
exports.div = div;


/***/ })

},["5fEv"]);
...
```

- How we can configure to avoid unused modules? We have to take into account that [Webpack 2 Tree Shaking](https://webpack.js.org/guides/tree-shaking/#components/sidebar/sidebar.jsx) comes with a built-in support for ES6 modules (alias harmony modules), that why we need to tell babel to use this kind of modules.

- By default, `tsconfig.json` has [`module` default value to `commonjs`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) when target is not ES6, so we need to configure target to ES6:

### ./tsconfig.json
```diff
{
  "compilerOptions": {
-   "target": "es5",
+   "target": "es6",
-   "module": "commonjs",
+   "module": "es6",
+   "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
+   "noLib": false,
+   "suppressImplicitAnyIndexErrors": true
-   "suppressImplicitAnyIndexErrors": true,
-   "lib": [
-     "dom",
-     "es5",
-     "scripthost",
-     "es2015.iterable"
-   ]
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

> NOTE: It's not necessary to set `"module": "es6"`. But we have to set `"moduleResolution": "node"` (this value is taken as default when is `commonjs`) to resolve modules. More [info](https://www.typescriptlang.org/docs/handbook/module-resolution.html#classic)

- Running `npm run build` again:

### ./dist/...app.js
```diff
webpackJsonp([1],{

/***/ "5fEv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculator__ = __webpack_require__("cOI6");

const result = Object(__WEBPACK_IMPORTED_MODULE_0__calculator__["a" /* sum */])(2, 2);
const element = document.createElement('h1');
element.innerHTML = `Sum result: ${result}`;
document.body.appendChild(element);


/***/ }),

/***/ "cOI6":
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


/***/ })

},["5fEv"]);
...
```

- Now webpack knows which `harmony modules` (ES6 modules) are unused. If we run `npm run build:prod`:

![build prod error](../../99%20Readme%20Resources/04%20Performance/02%20Tree%20shaking%20TypeScript/build%20prod%20error.png)

- What's it going on here? Since we are target to `es6`, TypeScript doesn't transpile backticks to `element.innerHTML = 'Sum result: ' + result;` like babel did in sample [02 Tree Shaking ES6](../02%20Tree%20Shaking%20ES6/README.md#distappjs-1)

- So next step could be add this configuration:

```
TypeScript transpile to ES6 files and Babel transpile to ES5 files

      TypeScript            Babel
.ts ============> ES6 .js =========> ES5 .js

```

- As we know, we need to install:

```
npm install babel-core babel-preset-env --save-dev
```

- Add `.babelrc` with `ES6 modules` config:

### ./.babelrc
```diff
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}

```

- And update `webpack.config`:

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
+       options: {
+         useBabel: true,
+       },
      },
      ...
    ],
  },
  ...
};

```

- Running `npm run build` again, babel transform backticks into `element.innerHTML = 'Sum result: ' + result;`:

### ./dist/...app.js
```diff
webpackJsonp([1],{

/***/ "5fEv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculator__ = __webpack_require__("cOI6");

var result = Object(__WEBPACK_IMPORTED_MODULE_0__calculator__["a" /* sum */])(2, 2);
var element = document.createElement('h1');
element.innerHTML = 'Sum result: ' + result;
document.body.appendChild(element);

/***/ }),

/***/ "cOI6":
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

/***/ })

},["5fEv"]);
...
```

- If we run `npm run build:prod` again:

### ./dist/...app.js
```diff
webpackJsonp([1],{"5fEv":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=n("cOI6"),u=Object(c.a)(2,2),r=document.createElement("h1");r.innerHTML="Sum result: "+u,document.body.appendChild(r)},cOI6:function(e,t,n){"use strict";function c(e,t){return e+t}t.a=c}},["5fEv"]);
```
