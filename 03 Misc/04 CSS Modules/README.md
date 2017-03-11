# 04 CSS Modules

In this demo we are going to isolate different scss files using same css class names.
We will learn how to configure it and how to deal with external css class provided by third libraries like Bootstrap.

We will start from sample _02 Fx/01 React_.

Summary steps:
- Update webpack.config.js with CSS Modules config.
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

![averageComponent styles without css modules](../../99 Readme Resources/03 Misc/04 CSS Modules/averageComponent styles without css modules.png)

- Now we are going to create 
