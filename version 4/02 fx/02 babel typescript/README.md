# 02 Babel TypeScript

In this demo we will add support for TypeScript with babel. We will do the transpilation process in two steps:
  - From Typescript to ES5 using babel.

¿Why this approach? We want our project to be as standard as possible, if you transpile from es6 to es5
using babel you will be using the same approach as many existing projects an libraries.

We will start from sample _02 FX/00 Typescript_, install TypeScript locally,
configure a tsconfig file, add some ts like, install babel-loader and apply it to webpackconfig.

Summary steps: 
 - Use babel-loader as a local dependency.
 - Install `@babel/preset-typescript` to transplile to ES5.
 - Install `fork-ts-checker-webpack-plugin` to check types in parallel.
 - Add the proper configuration in `webpack.config.js`

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer (at least v. 8.9.2). If you want to follow this step guides you will need to take as starting point sample _02 FX/00 Typescript_.

## steps

- _npm install_ to install previous sample packages:

```bash
npm install
```

- Uninstall `awesome-typescript-loader`, we won't use any more:

```bash
npm uninstall awesome-typescript-loader
```

- Install `@babel/preset-typescript` to transpile Typescript with babel:

```bash
npm install @babel/preset-typescript --save-dev
```

- Configure `.babelrc` config file:

### ./.babelrc

```diff
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": "3"
      }
-   ]
+   ],
+   "@babel/preset-typescript"
  ]
}

```

- Update webpack config:

### ./webpack.config.js

```diff
...

  module: {
    rules: [
-     {
-       test: /\.(ts|tsx)$/,
-       exclude: /node_modules/,
-       loader: 'awesome-typescript-loader',
-       options: {
-         useBabel: true,
-         babelCore: '@babel/core', // needed for Babel v7
-       },
-     },
      {
-       test: /\.js$/,
+       test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
...

```

- Give it a try:

```bash
npm start
```

- So far so good. But, let's add some failed code:

### ./src/students.ts

```diff
...

- document.write(messageToDisplay);
+ document.write(message);

```

- The IDE checks the buidl, but the webpack process isn't. That's why we need install `fork-ts-checker-webpack-plugin`:

```bash
npm install fork-ts-checker-webpack-plugin --save-dev
```

- Configure webpack:

### ./webpack.config.js

```diff
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
+ var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

...
  plugins: [
...
+   new ForkTsCheckerWebpackPlugin({
+     tsconfig: '../',
+   }),
  ],
};

```

- Run app:

```bash
npm start
```

- The build is still successfully but one error appears. If we want fail the build:

### ./webpack.config.js

```diff
...
  plugins: [
...
    new ForkTsCheckerWebpackPlugin({
      tsconfig: '../',
+     async: false,
    }),
  ],
};

```

- Restore code:

### ./src/students.ts

```diff
...

- document.write(message);
+ document.write(messageToDisplay);

```
