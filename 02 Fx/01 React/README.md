# 01 React

In this demo we will add support for React.

We will start from sample _01 Styles / 03 SASS_, install React locally, update `students.js` to `students.jsx` and include some basic rendering.

Summary steps:
 - Install [React](https://facebook.github.io/react/) as a local dependency.
 - Update `students.js` to `students.jsx` and update its content accordingly.
 - Resolve the `jsx` extensions and point out that the entry point has changed.
 - Configure the `webpack.config.js` to support `jsx`.

# Steps to build it

## Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) installed in your computer. If you want to follow this step guide you will need to take sample _03 SASS_ as starting point.

## Steps

- `npm install` to install previous sample packages:

  ```
  npm install
  ```

- Delete `mystyles.scss`, we won't need it for this sample.

- Let's update `webpack.config`:

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

- React is an open source library for building user interfaces, quite popular nowdays. Let's start by installing the library which is splitted into 2: [react](https://www.npmjs.com/package/react) as the core library and [react-dom](https://www.npmjs.com/package/react-dom) as the glue between React and the DOM.

  ```
  npm install react --save
  npm install react-dom --save
  ```

- `jquery` won't be needed for this sample, so you can safely uninstall it:

  ```
  npm uninstall jquery --save
  ```

- And update `webpack.config.js` vendor stuff with these changes:

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

- In the *`index.html`* file let's add a `<div>` element that will be the entry
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

- Let's create our first React component under `src` folder called `AverageComponent`:

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

- Let's rename `students.js` to `students.jsx` and update the code to use React:

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

- For *Babel* to parse React `jsx` files we need to install
[*babel-preset-react*](https://github.com/babel/babel/tree/master/packages/babel-preset-react).

  ```
  npm install babel-preset-react --save-dev
  ```

- Add it to `.babelrc` config:

  ### ./.babelrc
  ```diff
  {
    "presets": [
      "env",
  +   "react",
    ]
  }
  ```

- It's time to update *`webpack.config.js`*, we will start by adding the resolve `jsx` extension:

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

- In the loaders section we need to indicate to *babel-loader* that it should take into account not only `js` but **`jsx`**, and that it should take into account React preset.

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

- Finally, if we run the app we will see the React based functionality in action.
  
  ```
  npm start
  ```

  ![result](../../99%20Readme%20Resources/02%20Fx/01%20React/result.png)
