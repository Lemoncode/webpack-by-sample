# 02 CSS Modules

In this demo we are going to isolate different scss files using same css class names.
We will learn how to configure it and how to deal with external css class provided by third libraries like Bootstrap.

We will start from sample _02 Fx/01 React_.

Summary steps:
- Update `webpack.config.js` with CSS Modules config.
- Add scss file with averageComponent styles.
- Create other component and scss file with same class name.
- Create selector using custom class and Bootstrap class.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _01 React_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- We can start creating `AverageComponent` styles file (SASS file):

### ./src/averageComponentStyles.scss
```css
$background: teal;

.result-background {
  background-color: $background;
}
```

- Let's go to use this style in `AverageComponent`:

### ./src/averageComponent.jsx
```diff
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
-       <span>Students average: {this.state.average}</span>
+       <span className='result-background'>
+         Students average: {this.state.average}
+       </span>
      </div>
    );
  }
}

```

- Finally we need to update `webpack.config` for load `.scss` file, as we usually load it in other samples:

### ./webpack.config.js
```diff
...

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './students.jsx',
+   appStyles: [
+     './averageComponentStyles.scss',
+   ],
    vendor: [
      'react',
      'react-dom',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  ...
};

```

- If we run the the sample we can check that the style is being applied to the component (background color), but we are using global
css names.

- Now we are going to create `TotalScoreComponent`:

### ./src/averageService.js
```diff
export function getAvg(scores) {
 return getTotalScore(scores) / scores.length;
}

- function getTotalScore(scores) {
+ export function getTotalScore(scores) {
  return scores.reduce((score, count) => {
    return score + count;
  });
}

```

### ./src/totalScoreComponent.jsx
```javascript
import * as React from 'react';
import {getTotalScore} from './averageService';

export class TotalScoreComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      scores: [10, 20, 30, 40, 50],
      totalScore: 0,
    };
  }

  componentDidMount() {
    this.setState({totalScore: getTotalScore(this.state.scores)});
  }

  render() {
    return (
      <div>
        <span className='result-background'>
          Students total score: {this.state.totalScore}
        </span>
      </div>
    );
  }
}
```

### ./src/totalScoreComponentStyles.scss
```css
$background: indianred;

.result-background {
  background-color: $background;
}

```

> NOTE: we declare same class name for TotalScoreComponent

- Using `TotalScoreComponent`:

### ./src/students.jsx
```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AverageComponent} from './averageComponent';
+ import {TotalScoreComponent} from './totalScoreComponent';

ReactDOM.render(
  <div>
    <h1>Hello from React DOM</h1>
    <AverageComponent />
+   <TotalScoreComponent />
  </div>,
  document.getElementById('root')
);

```

- And update `webpack.config`:

### ./webpack.config.js
```diff
...

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './students.jsx',
    appStyles: [
      './averageComponentStyles.scss',
+     './totalScoreComponentStyles.scss',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  ...
};

```

- Now if we run the project, we will find that both css names overlaps.

```
npm start
```

- As result, averageComponentStyles are overridden by totalScoreComponentStyles. How to solve this? _CSS Modules to the rescue!_

- CSS Modules scope is to isolate different scss files using same css class names. We are going to replace `adding styles via webpack entry point` by `import styles where we need it`. Let's to configure it:

### ./webpack.config.js
```diff
...

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
-   extensions: ['.js', '.jsx'],
+   extensions: ['.js', '.jsx', '.scss'],
  },
  entry: {
    app: './students.jsx',
-   appStyles: [
-     './averageComponentStyles.scss',
-     './totalScoreComponentStyles.scss',
-   ],
    vendor: [
      'react',
      'react-dom',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      ...
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
-           { loader: 'css-loader', },
+           {
+             loader: 'css-loader',
+             options: {
+               modules: true,
+               localIdentName: '[name]__[local]___[hash:base64:5]',
+             },
+           },
            { loader: 'sass-loader', },
          ],
        }),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
      },
      ...
    ],
  },
  ...
  ],
};

```

- Updating `AverageComponent`:

### ./src/averageComponent.jsx
```diff
import * as React from 'react';
import {getAvg} from './averageService';
+ import classNames from './averageComponentStyles';

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
-       <span className='result-background'>
+       <span className={classNames['result-background']}>
          Students average: {this.state.average}
        </span>
      </div>
    );
  }
}

```

- Updating `TotalScoreComponent`:

### ./src/totalScoreComponent.jsx
```diff
import * as React from 'react';
import {getTotalScore} from './averageService';
+ import classNames from './totalScoreComponentStyles';

export class TotalScoreComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      scores: [10, 20, 30, 40, 50],
      totalScore: 0,
    };
  }

  componentDidMount() {
    this.setState({totalScore: getTotalScore(this.state.scores)});
  }

  render() {
    return (
      <div>
-       <span className='result-background'>
+       <span className={classNames['result-background']}>
          Students total score: {this.state.totalScore}
        </span>
      </div>
    );
  }
}

```

- Now we get the right isolation.

```bash
npm start
```


- To avoid reference classNames like `classNames['result-background']`, webpack provides us to transform `kebab case` to `camelCase`:

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  module: {
    ...
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
+               camelCase: true,
              },
            },
            { loader: 'sass-loader', },
          ],
        }),
      },
      ...
    ],
  },
  ...
};

```

- Updating components:

### ./src/averageComponent.jsx
```diff
...

  render() {
    return (
      <div>
-       <span className={classNames['result-background']}>
+       <span className={classNames.resultBackground}>
          Students average: {this.state.average}
        </span>
      </div>
    );
  }
}

```

### ./src/totalScoreComponent.jsx
```diff
...

  render() {
    return (
      <div>
-       <span className={classNames['result-background']}>
+       <span className={classNames.resultBackground}>
          Students total score: {this.state.totalScore}
        </span>
      </div>
    );
  }
}

```

- Running `npm start` again:

```bash
npm start
```


- If we take a look to the browser console, we can see how webpack transform css class names, adding prefixes (inspect element).

- Finally, let's do an example where we need to add styles to element that has a Bootstrap class:

### ./src/averageComponent.jsx
```diff
...

  render() {
    return (
      <div>
        <span className={classNames.resultBackground}>
          Students average: {this.state.average}
        </span>

+       <span className={`jumbotron ${classNames.resultBackground}`}>
+         Jumbotron students average: {this.state.average}
+       </span>
      </div>
    );
  }
}

```

- Running `npm start`, it looks a bit weird:

- Let's go to add own styles:

### ./src/averageComponentStyles.scss
```diff
$background: teal;
+ $jumbotronBackground: darkseagreen;

.result-background {
  background-color: $background;
}

+ .jumbotron.result-background {
+   background-color: $jumbotronBackground;
+   display: block;
+ }

```

- Running `npm start` nothing changes, why? Due to webpack is transform `local` class names to `'[name]__[local]___[hash:base64:5]'` we need to tell him that jumbotron is a `global` style ([more info](https://webpack.js.org/loaders/css-loader/#-css-modules-https-github-com-css-modules-css-modules-)):

### ./src/averageComponentStyles.scss
```diff
$background: teal;
$jumbotronBackground: darkseagreen;

.result-background {
  background-color: $background;
}

- .jumbotron.result-background {
+ :global(.jumbotron).result-background {
  background-color: $jumbotronBackground;
  display: block;
}

```

- If we run the project now we can see that the change has been applied globally.

```bash
npm start
```