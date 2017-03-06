# 01 React

In this demo we will add support for React.

We will start from sample _01 Styles/03 SASS_, install react locally, update the students.js to jsx and include some basic rendering.

Summary steps:
 - Install reactjs as a local dependency.
 - Update students.js to students.jsx and update content.
 - Let's resolve the jsx extensions and point out the the entry point has changed.
 - Configure the webpack.config.js to support jsx.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 SASS_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- React is an open source library for building user interfaces (quite popular nowdays), let's start by installing the library ([react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom)).

```
npm install react --save
npm install react-dom --save
```

- In the *index.html* file let's add a `<div>` that will be the entry
point for our React app.

### ./index.html
```diff
<body>
  Hello webpack !
  <div id="root">
  </div>
</body>
```

- Let's rename *students.js* to *students.__jsx__* and update the code to use React.

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getAvg} from './averageService';


const AverageUi = React.createClass({

  getInitialState: function () {
    return { scores: [90, 75, 60, 99, 94, 30], average: 0 };
  },

  componentDidMount: function () {
    this.setState({ average: getAvg(this.state.scores) });
  },

  render: function () {
    return (
      <div>
        <span>Students average: {this.state.average}</span>
      </div>
    );
  }
});

ReactDOM.render(
  <div>
    Hello from react dom
    <AverageUi/>
  </div>
  , document.getElementById('root'));
```

- For *babel* to parse React *jsx* files we need to install
[*babel-preset-react*](https://github.com/babel/babel/tree/master/packages/babel-preset-react).

```
npm install babel-preset-react --save-dev
```

- It's time to update *webpack.config.js*, we will start by adding the *jsx* extension
and update the entry point, *students.jsx*.

```
module.exports = {
  entry: ['./students.jsx'],
```

- In the loaders section we need to indicate to *babel-loader* that it should take
into account not only *js* but _**jsx**_, and that it should take into account
React preset.

```
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
```

- Finally if we run the app we will see the React based functionallity in action.

![Demo02_01_React.png](../../99 Readme Resources/02 Webpack/Demo02_01_React.png "Demo02_01_React.png")
