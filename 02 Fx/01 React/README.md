# 01 React

In this demo we will add support for React.

We will start from sample _01 Styles/03 SASS_, install react locally, update the `students.js` to jsx and include some basic rendering.

Summary steps:
 - Install reactjs as a local dependency.
 - Update `students.js` to `students.jsx` and update content.
 - Let's resolve the jsx extensions and point out the the entry point has changed.
 - Configure the `webpack.config.js` to support jsx.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 SASS_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- Delete `mystyles.scss` because we don't need for this sample.

- And update `webpack.config`:

### ./webpack.config.js
```diff
...

module.exports = {
  context: path.join(basePath, 'src'),
  entry: {
    app: './students.js',
-   appStyles: [
-     './mystyles.scss',
-   ],
    ...
  },
  ...
};

```

- React is an open source library for building user interfaces (quite popular nowdays), let's start by installing the library ([react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom)).

```
npm install react --save
npm install react-dom --save
```

- Now, we can uninstall `jquery` because we don't need for this sample:

```
npm uninstall jquery
```

- And update `webpack.config` vendor stuff:

### ./webpack.config.js
```diff
...

module.exports = {
  context: path.join(basePath, 'src'),
  entry: {
    app: './students.js',
    vendor: [
-     'jquery',
+     'react',
+     'react-dom',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  ...
};

```

- In the *`index.html`* file let's add a `<div>` that will be the entry
point for our React app.

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
-  <div class="red-background ">
-    RedBackground stuff
-  </div>
+  <div id="root">
+  </div>
  </body>
</html>

```

- Let's create `AverageComponent` to create our first component under `src` folder:

### ./src/averageComponent.jsx
```javascript
import * as React from 'react';
import {getAvg} from './averageService';

export class AverageComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      scores: [90, 75, 60, 99, 94, 30],
      average: 0,
    };
  }

  componentDidMount() {
    this.setState({average: getAvg(this.state.scores)});
  }

  render() {
    return (
      <div>
        <span>Students average: {this.state.average}</span>
      </div>
    );
  }
}

```

- Let's rename `students.js` to `students.jsx` and update the code to use React.

### ./src/students.jsx
```diff
+ import * as React from 'react';
+ import * as ReactDOM from 'react-dom';
+ import {AverageComponent} from './averageComponent';
- import {getAvg} from './averageService';

- $('body').css('background-color', 'lightSkyBlue');

- const scores = [90, 75, 60, 99, 94, 30];
- const averageScore = getAvg(scores);

- const messageToDisplay = `average score ${averageScore}`;

- document.write(messageToDisplay);

+ ReactDOM.render(
+   <div>
+     <h1>Hello from React DOM</h1>
+     <AverageComponent />
+   </div>,
+   document.getElementById('root')
+ );
```

- For *babel* to parse React *jsx* files we need to install
[*babel-preset-react*](https://github.com/babel/babel/tree/master/packages/babel-preset-react).

```
npm install babel-preset-react --save-dev
```

- Add it to `babelrc` config:

### ./.babelrc
```diff
{
  "presets": [
    "env",
+   "react",
  ]
}

```

- It's time to update *`webpack.config.js`*, we will start by adding the resolve *jsx* extension:

### ./webpack.config.js
```diff
...

module.exports = {
  context: path.join(basePath, 'src'),
+ resolve: {
+   extensions: ['.js', '.jsx'],
+ },
  entry: {
-   app: './students.js',
+   app: './students.jsx',
    ...
  },
  ...
};

```

- In the loaders section we need to indicate to *babel-loader* that it should take into account not only *js* but _**jsx**_, and that it should take into account React preset.

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  module: {
    rules: [
      {
-       test: /\.js$/,
+       test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      ...
    ],
  },
  ...
};

```

- Finally if we run the app we will see the React based functionality in action.

![result](../../99%20Readme%20Resources/02%20Fx/01%20React/result.png)
