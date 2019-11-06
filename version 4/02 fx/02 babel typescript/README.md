# 02 Babel TypeScript

In this demo we will add support for TypeScript with babel. We will do the transpilation process in two steps:
  - From Typescript to ES5 using babel.

¿Why this approach? We want our project to be as standard as possible, if you transpile from es6 to es5
using babel you will be using the same approach as many existing projects an libraries.

We will start from sample _02 FX/01 Typescript_, install TypeScript locally,
configure a tsconfig file, add some ts like, install babel-loader and apply it to webpackconfig.

Summary steps: 
 - Use babel-loader as a local dependency.
 - Install `@babel/preset-typescript` to transplile to ES5.
 - Install `fork-ts-checker-webpack-plugin` to check types in parallel.
 - Add the proper configuration in `webpack.config.js`

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer (at least v. 8.9.2). If you want to follow this step guides you will need to take as starting point sample _02 FX/01 Typescript_.

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
    "@babel/preset-env",
    "@babel/preset-react",
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
-       test: /\.jsx?$/,
+       test: /\.tsx?$/,
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

### ./src/students.tsx

```diff
...

- $('body').css('background-color', 'lightSkyBlue');
+ $('body').csssssss('background-color', 'lightSkyBlue');

```

- Restore code:

### ./src/students.ts

```diff
...

- $('body').csssssss('background-color', 'lightSkyBlue');
+ $('body').css('background-color', 'lightSkyBlue');

```
