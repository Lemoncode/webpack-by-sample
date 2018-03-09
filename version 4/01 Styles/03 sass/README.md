# 03 SASS

In this demo we rename our css file to scss extension and add a simple SASS variable. We will learn how to add a loader that can
make the SASS preprocess and then chain it to our css / style pipe.

We will start from sample _01 Styles/02 Import Bootstrap_.

Summary steps:
 - Rename `mystyles.css` to scss.
 - Add some SASS specific code.
 - Install a SASS preprocessor loader.
 - Add this preprocessor to the pipe (update `webpack.config.js`).

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer (at least v 8.9.2). If you want to follow this step guides you will need to take as starting point sample _02 Import Bootstrap_.

## steps

- `npm install` to install previous sample packages:

```bash
npm install
```


- Let's start by renaming `mystyles.css` to `mystyles.scss`

- Let's open `mystyles.scss` and add some sass simple code (in this case we will create a variable that will hold a blue background, this will introduce a change into our sample app, a blue background will be displayed instead of the former red one):

### ./mystyles.scss
```diff
+ $blue-color: teal;

.red-background {
- background-color: indianred;
+ background-color: $blue-color;
}

```
- Since we have changed the extension of the css file to scss, we have to update the `webpack.config.js` file.

### ./webpack.config.js
```diff
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

+ var path = require('path');

+ var basePath = __dirname;

//...

module.exports = {
  entry: {
    app: './students.js',
    appStyles: [
-     './mystyles.css',
+     './mystyles.scss',
    ],
    ...
  },
  ...
};
```

- Now it's time to start with the webpack plumbing. Let's install a [sass-loader](https://github.com/webpack-contrib/sass-loader) that requires [node-sass](https://github.com/sass/node-sass) as dependency:

```bash
npm install sass-loader node-sass -d
```

- We only need one more step. Open our `webpack.config.js` and add a new  entry (scss) to the loaders that will use the just installed sass-loader. Interesting to note down: we are chaining loaders, first we preprocess the scss then with the css we obtain as result we just pass the css and styles loaders we were using before.

- Important here, we need to split in two loaders, first one using `sass-loader` for appStyles and second one using previous configuration for vendorStyles:


```diff
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
+      {
+        test: /\.scss$/,
+        exclude: /node_modules/,
+        loader: ExtractTextPlugin.extract({
+          fallback: 'style-loader',
+          use: {
+            loader: 'css-loader',
+          },
+          use: [
+            { loader: 'css-loader', },
+            { loader: 'sass-loader', },
+          ],
+        }),
+      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
```

- If we run our app (`npm start`), we can check that now we are getting a blue background instead of a red one.

```bash
npm start
```
- So far so good, it's time to refactor a bit our
solution to make it more maintaneable.

- To keep maintainable our source code, let's move files under `src` folder:
  - Move to `./src/averageService.js`.
  - Move to `./src/index.html`.
  - Move to `./src/mystyles.scss`.
  - Move to `./src/students.js`.

_webpack.config.js_

```diff
module.exports = {
+ context: path.join(basePath, 'src'),  
  entry: {
    app: './students.js',
    appStyles: [
      './mystyles.scss',
    ],
    vendor: [
      'jquery',
    ],
    vendorStyles: [
-     './node_modules/bootstrap/dist/css/bootstrap.css',
+     '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
```

- Let's check that the app is still working after this folder structure refactor.

```bash
npm start
```


