# 00 Boilerplate

In this sample we are going to setup a web project that can be easily managed
by webpack.

We will setup an initial npm project, give support to ES6, and install webpack.
Then we will create a `helloworld.js` sample.

Summary steps:
 - Prerequisites: Install Node.js
 - Intialize `package.json` (npm init)
 - Create a simple HTML file.


# Steps to build it

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.x) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## steps

- Navigate to the folder where you are going to create the empty project.

- Execute `npm init`, you will be prompted to answer some information request
about the project (once you have successfully fullfilled them a **`package.json`**
file we will generated).

```
npm init
```

![npm init](../../99%20Readme%20Resources/00%20Intro/00%20Boilerplate/npm%20init.png)

- Install **webpack** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

```
npm install webpack --save-dev
```

- In order to launch webpack, modify the **`package.json`** file an add the following property `"start": "webpack"` under the scripts object. It allows us to launch webpack from the command line through npm typing `npm start`.

 Now, our **`package.json`** file should looks something like:

### ./package.json
```json
{
  "name": "boilerplate",
  "version": "1.0.0",
  "description": "Front End Lemoncode Master, Bundle Modules, Webpack Demo 00 Boilerplate",
  "main": "index.js",
  "scripts": {
    "start": "webpack"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Lemoncode/webpack-2.x-by-sample.git"
  },
  "author": "Lemoncode",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Lemoncode/webpack-2.x-by-sample/issues"
  },
  "homepage": "https://github.com/Lemoncode/webpack-2.x-by-sample#readme",
  "devDependencies": {
    "webpack": "^3.5.6"
  }
}

```

- We will write es6 code but we need to transpile it to es5, in order to do
that install `babel-core` plus `babel-preset-env` and save it as a dev dependency on the **`package.json`** file that has been previously generated.

```
npm install babel-core --save-dev
npm install babel-preset-env --save-dev
```

- We need to install a "loader" (more on this in next modules) in order for
webpack to be able to make use of `babel-core` transpiler.

```
npm install babel-loader --save-dev
```

Our **`package.json`** file should looks something like:

### ./package.json
```diff
{
  "name": "boilerplate",
  "version": "1.0.0",
  "description": "Front End Lemoncode Master, Bundle Modules, Webpack Demo 00 Boilerplate",
  "main": "index.js",
  "scripts": {
    "start": "webpack"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Lemoncode/webpack-2.x-by-sample.git"
  },
  "author": "Lemoncode",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Lemoncode/webpack-2.x-by-sample/issues"
  },
  "homepage": "https://github.com/Lemoncode/webpack-2.x-by-sample#readme",
  "devDependencies": {
+   "babel-core": "^6.26.0",
+   "babel-loader": "^7.1.2",
+   "babel-preset-env": "^1.6.0",
    "webpack": "^3.5.6"
  }
}

```

- Now create a JavaScript file named **`students.js`** that will include ES6 syntax.

### ./students.js
```javascript
// Let's use some ES6 features
const averageScore = "90";
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```

- Now, it's time to add babel configuration file:

### ./.babelrc:
```javascript
{
  "presets": [
    "env",
  ]
}
```
- Some editors can highlight that the comma is error, but really it isn't. You can delete the comma but really it's not necessary.

- We can countinue with webpack configuration. Create an empty skeleton on a file named **`webpack.config.js`**, and indicate the js entry point.

### ./webpack.config.js
```javascript
module.exports = {
  entry: ['./students.js'],
  output: {
    filename: 'bundle.js',
  },
};

```

- Now add support for es6, we will ask webpack to handle all js files under the project folder (excluding the `node_modules` subfolder) and transpile them from es6 to es5 (using the `babel-loader`).

```diff
module.exports = {
  entry: ['./students.js'],
  output: {
    filename: 'bundle.js',
  },
+ module: {
+   rules: [
+     {
+       test: /\.js$/,
+       exclude: /node_modules/,
+       loader: 'babel-loader',
+     },
+   ],
+ },
};
```

- Let's run webpack from the command line, type `npm start` and press enter.

```
npm start
```

![npm start](../../99%20Readme%20Resources/00%20Intro/00%20Boilerplate/npm%20start.png)

- We can check that a file named **`bundle.js`** has been generated.

- if we open the **`bundle.js`** file we can check that it contains (amongst other boiler plate code) the transpiled to es5 version of **`students.js`**.

### ./bundle.js
```javascript
...
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Let's use some ES6 features
var averageScore = "90";
var messageToDisplay = "average score " + averageScore;

document.write(messageToDisplay);
...
```

- Create now a simple HTML file, **`index.html`**, and include a script tag that will point to our generated **`bundle.js`** file.

### ./index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 3.x by sample</title>
  </head>
  <body>
    Hello Webpack 3!
    <script src="bundle.js"></script>
  </body>
</html>

```
- Now we can click on the html file and see our small piece of code up and running.

![running webpack 3](../../99%20Readme%20Resources/00%20Intro/00%20Boilerplate/result.png)
