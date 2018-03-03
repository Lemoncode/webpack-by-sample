# 05 JQuery

So far we have made good progress on our journey... but we are lacking one of the
basic pillars of web development, consuming third party libraries.

In this demo we will install a legacy library (jquery) via npm, define it as global, and use it. Finally we will end up creating a separate bundle for libraries.

We will start from sample _00 Intro/03 Output_.

Summary steps:
 - Install jquery via npm.
 - Setup a global alias ($).
 - Create some sample code using this library.
 - Break into two bundles `app.js` and `vendor.js`.  

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed (at least v 8.9.2) on your computer. If you want to follow this guide steps you will need to take as starting point sample _04 Output_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```
- Let's start by downloading the jquery library via npm. In this case we will execute the following command on the command prompt ```npm install jquery --save```.
**note down**: this time we are not adding the `-d` suffix to the parameter, this time the jquery package is a dependency of the web app not of the build process.

```
npm install jquery --save
```

It automatically adds that entry to our _package.json_.

_package.json_

```diff
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.3",
    "babel-preset-env": "^1.6.1",
    "webpack": "^4.0.1",
    "webpack-cli": "^2.0.9",
    "html-webpack-plugin": "^3.0.4",
    "webpack-dev-server": "^3.1.0"
  },
+  "dependencies": {    
+    "jquery": "^3.3.1"    
+  }
```

- Since this is a legacy library it expects to have a global variable available.
Instead of assigning this manually let's define it in the `webpack.config.js`. file.

- First we will require an import "webpack" at the top of the file:

```diff
var HtmlWebpackPlugin = require('html-webpack-plugin');
+ var webpack = require('webpack');

module.exports = {
```

- Then we will use a plugin from webpack to define jQuery and $ as global variables.

```diff
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash:true,
    }),
+   new webpack.ProvidePlugin({
+     $: "jquery",
+     jQuery: "jquery"
+   }),    
  ],
```

- Now it's ready to be used. Just to test it, let's change the background color of the page body to blue. Let's change the background of the body element using jquery:

_./src_

```diff
import {getAvg} from "./averageService";

+ $('body').css('background-color', 'lightSkyBlue');

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);

const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);

```

- Now we can just execute the app (```npm start```) and check how the background of the page has changed from white to blue.

```bash
npm start
```
