# 01 Custom CSS

Let's get started working with styles.

In this demo will create a custom CSS file (it will contain a simple css class
that will setup a background color to red).

We will start from sample _00 Intro/04 JQuery_.

Summary steps:
 - Create a custom css file.
 - Install style loader and css loader packages.
 - Configure webpackconfig.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _04 JQuery_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- Now let's create a simple CSS file that will add a red background when
used on some e.g. div. (we will name it `mystyles.css`):

### ./mystyles.css
```css
.red-background {
 background-color: indianred;
}
```

- And now we can just use this style directly in our HTML file (so far so good, if we run this project now we won't see this styles applied, we have to go through some webpack configuration), let's update `index.html`

### ./index.html
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
    Hello Webpack 3!
+   <div class="red-background">
+     RedBackground stuff
+   </div>
  </body>
</html>

```

- Let's start installing `style-loader` and `css-loader` as dev dependencies.
  - `css-loader` is for load `.css` files.
  - `style-loader` is to insert styles in html file, so we can use these styles.

```
npm install style-loader --save-dev
npm install css-loader --save-dev
```

- Let's add this style to our entry point:

### ./webpack.config.js
```diff
...

module.exports = {
entry: ['./students.js'],  
  entry: {
    app: './students.js',
+   appStyles: [
+     './mystyles.css',
+   ],
    vendor: [
      'jquery',
    ],
  },
  ...
};

```

- If we launch a webpack build this will throw errors, that's because we haven't
defined any loader to handle the css extension. To configure webpack
properly let's add to the loader section a css entry and execute first
the css-loader extension (handle css files), then the style-loader (add CSS to the down by injecting a styler class).

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
+     {
+       test: /\.css$/,
+       exclude: /node_modules/,
+       use: [
+         {
+           loader: 'style-loader',
+         },
+         {
+           loader: 'css-loader',
+         },
+       ],
+     },
    ],
  },
...
};

```

- Now we can just execute the app (npm start) and check how the red background is
being displayed on the div we have chosen.

![red background result](../../99%20Readme%20Resources/01%20Styles/01%20Custom%20CSS/red%20background%20result.png)

- If we run `webpack` and take a look at console, we can see that appStyles are bundling as `.js` file. We need take care about size here because `.js` file is weightier than `.css`files.

![appStyles in console](../../99%20Readme%20Resources/01%20Styles/01%20Custom%20CSS/appStyles%20in%20console.png)

- Opening `appStyles.js` file, we can see that has about 316 lines of code, where we can see:

### ./dist/...appStyles.js
```
...
exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".red-background {\r\n background-color: indianred;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

...
```

- To avoid size issue, we need to install [`extract-text-webpack-plugin`](https://github.com/webpack-contrib/extract-text-webpack-plugin):

```
npm install extract-text-webpack-plugin --save-dev
```

- Let's to configure loader:

### ./webpack.config.js
```diff
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
+ var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

module.exports = {
...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
-       use: [
-         {
-           loader: 'style-loader',
-         },
-         {
-           loader: 'css-loader',
-          },
-       ],
+       loader: ExtractTextPlugin.extract({
+         fallback: 'style-loader',
+         use: {
+           loader: 'css-loader',
+         },
+       }),
      },
    ],
  },
...
};

```

- Finally, add plugin configuration:
  - `disable`: boolean to disable the plugin.
  - `allChunks`: boolean to extract from all additional chunks too (by default it extracts only from the initial chunk(s)).

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  plugins: [
    ...
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.HashedModuleIdsPlugin(),
+   new ExtractTextPlugin({
+     filename: '[name].[chunkhash].css',
+     disable: false,
+     allChunks: true,
+   }),
  ],
};

```

- Running `webpack` again, it split into two files `appStyles.js` and `appStyles.css` and how to size decrease:

  ![appStyles js and css in console](../../99%20Readme%20Resources/01%20Styles/01%20Custom%20CSS/appStyles%20js%20and%20css%20in%20console.png)

- Extract text plugin removes most of code in `appStyles.js` (only have 19 line of code) and create `appStyles.css`:

### ./dist/...appStyles.js
```javascript
webpackJsonp([1,3],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
],[4]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9teXN0eWxlcy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUMiLCJmaWxlIjoiYmU3NDMyNGJjYjRiYmI2OWVlYTguYXBwU3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL215c3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9
```

### ./dist/...appStyles.css
```css
.red-background {
 background-color: indianred;
}

/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiZTc0MzI0YmNiNGJiYjY5ZWVhOC5hcHBTdHlsZXMuY3NzIiwic291cmNlUm9vdCI6IiJ9*/
```
