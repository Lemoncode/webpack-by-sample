# 03 React

In this demo we add support for [React](https://reactjs.org/).

We start from sample _01 Styles / 04 Images_, install React locally, rename students.js to students.jsx and include some basic rendering.

Summary steps:

- Install [React](https://facebook.github.io/react/) as a local dependency.
- Update `students.js` to `students.jsx` and update its content accordingly.
- Resolve the `jsx` extensions and point out that the entry point has changed.
- Configure the `webpack.config.js` to support `jsx`.

# Steps to build it

## Prerequisites

You need to have [Node.js](https://nodejs.org/en/) installed in your computer. If you want to follow this step guide you need to take sample _04 Images_ as starting point.

## Steps

- `npm install` to install previous sample packages:

```bash
 npm install
```

- React is an quite popular open source library for building user interfaces. Let's start by installing the library which is splitted into 2: [react](https://www.npmjs.com/package/react) as the core library and [react-dom](https://www.npmjs.com/package/react-dom) as the glue between React and the DOM.

```bash
npm install react react-dom --save  
```

> Side note: if you are using TypeScript, add React type support for TypeScript:

** NOT NEEDED FOR THIS SAMPLE ***
```bash
npm install @types/react @types/react-dom --save-dev
```

- In the *`index.html`* file let's add a `<div>` element that will be the entry point for our React app.

### ./src/index.html

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Webpack 4.x by sample</title>
  </head>
  <body>
+   <div id="root"></div>
    <div id="imgContainer"></div>

    Hello Webpack 4!
    <img src="./content/logo_2.png" />
    <div class="red-background">
      RedBackground stuff
    </div>
  </body>
</html>

```

- Let's create our first React component under `src` folder called `AverageComponent`:

### ./src/averageComponent.jsx

```javascript
import React from 'react';
import { getAvg } from './averageService';

export const AverageComponent = () => {
  const [average, setAverage] = React.useState(0);

  React.useEffect(() => {
    const scores = [90, 75, 60, 99, 94, 30];
    setAverage(getAvg(scores));
  }, []);

  return (
    <div>
      <span>Students average: {average}</span>
    </div>
  );
};

```

- Let's rename `students.js` to `students.jsx` and update the code to use React:

### ./src/students.jsx

```diff
+ import React from 'react';
+ import ReactDOM from 'react-dom';
+ import {AverageComponent} from './averageComponent';
- import { getAvg } from './averageService';
import logoImg from './content/logo_1.png';

$('body').css('background-color', 'lightSkyBlue');

-const scores = [90, 75, 60, 99, 94, 30];
-const averageScore = getAvg(scores);
-const messageToDisplay = `average score ${averageScore}`;

- document.write(messageToDisplay);

const img = document.createElement('img');
img.src = logoImg;

document.getElementById('imgContainer').appendChild(img);

+ ReactDOM.render(
+   <div>
+     <h1>Hello from React DOM</h1>
+     <AverageComponent />
+   </div>,
+   document.getElementById('root')
+ );

```

- For *Babel* to parse React `jsx` files we need to install [*babel-preset-react*](https://github.com/babel/babel/tree/master/packages/babel-preset-react).

```bash
  npm install @babel/preset-react --save-dev
```

- Add it to `.babelrc` config:

### ./.babelrc

```diff
{
- "presets": ["@babel/preset-env"]
+ "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

- It's time to update *`webpack.config.js`*. We start by adding the resolve `jsx` extension:

### ./webpack.config.js

```diff
  ...
  module.exports = {
    context: path.join(basePath, 'src'),
+   resolve: {
+     extensions: ['.js', '.jsx'],
+   },
    entry: {
-     app: ['regenerator-runtime/runtime', './students.js'],
+     app: ['regenerator-runtime/runtime', './students.jsx'],
      ...
    },
    ...
  };

```

- Next, in the loaders section, we need to indicate to *babel-loader* that it should not operate on `js` files but on **`jsx`** files, and that it should take into account React preset.

### ./webpack.config.js

```diff
  ...
  module.exports = {
    ...
    module: {
      rules: [
        {
-         test: /\.js$/,
+         test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        ...
      ],
    },
    ...
  };

```

- Finally, when we run the app, we see React in action.

```bash
  npm start
```
