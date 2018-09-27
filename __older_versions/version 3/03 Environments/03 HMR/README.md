# 03 HMR

In this demo we are going to configure Hot Module Replacement. This feature is great for productivity in development environment, allowing us to update the app code without having to redeploy the whole files or refresh our browser to get the changes updated.

We will start from sample _03 Environments/02 CSS Modules_.

Summary steps:
- Install `react-hot-loader`.
- Update `webpack.config.js` with HMR config.
- Update `babel`config.
- Update `students.jsx` file.
- Create `index.jsx` file.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _02 CSS Modules_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- To work with HMR and `react`, we need to install `react-hot-loader`:

```bash
npm install react-hot-loader --save-dev
```

- Let's go to configure it:

### ./webpack.config.js

```diff
...
entry: {
- app: './students.jsx',
+ app: [
+   'react-hot-loader/patch',
+   './students.jsx',
+ ],
...

devServer: {
  port: 8080,
+ hot: true,
},
...
  new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    disable: false,
    allChunks: true,
  }),
+ new webpack.HotModuleReplacementPlugin(),
...
```

- Update `babel` config:

### ./.babelrc

```diff
{
  "presets": [
    "env",
    "react"
- ]
+ ],
+ "plugins": [
+   "react-hot-loader/babel"
+ ]
}
```

- Update `students.jsx` file:

### ./src/students.jsx

```diff
import * as React from 'react';
- import * as ReactDOM from 'react-dom';
import {AverageComponent} from './averageComponent';
import {TotalScoreComponent} from './totalScoreComponent';

- ReactDOM.render(
-   <div>
-     <h1>Hello from React DOM</h1>
-     <AverageComponent />
-     <TotalScoreComponent />
-   </div>,
-   document.getElementById('root')
- );
+ export const StudentComponent = () => (
+   <div>
+     <AverageComponent />
+     <TotalScoreComponent />
+   </div>
+ );

```

- Create `index.jsx` file:

### ./src/index.jsx

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StudentComponent } from './students';

ReactDOM.render(
  <StudentComponent />,
  document.getElementById('root')
);

```

- Add `index.jsx` like main file:

### ./webpack.config.js

```diff
...
entry: {
  app: [
    'react-hot-loader/patch',
-   './students.jsx',
+   './index.jsx',
  ],
...
```

- Run `npm start` to see how is going on:

![chunkhash error](../../99%20Readme%20Resources/03%20Environments/03%20HMR/chunkhash%20error.png)

- As we see, we have to use `chunkhash` only in production environment.

### ./webpack.config.js

```diff
...
  output: {
    path: path.join(basePath, 'dist'),
-   filename: '[name].[chunkhash].js',
+   filename: '[name].js',
  },
  ...
  new ExtractTextPlugin({
-   filename: '[name].[chunkhash].css',
+   filename: '[name].css',
    disable: false,
    allChunks: true,
  }),
...
```

- Now it's compiled successfully but we need one step over:

### ./src/index.js

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
+ import { AppContainer } from 'react-hot-loader';
import { StudentComponent } from './students';

- ReactDOM.render(
-   <StudentComponent />,
-   document.getElementById('root')
- );

+ const render = (Component) => {
+   ReactDOM.render(
+     <AppContainer>
+       <Component />
+     </AppContainer>,
+     document.getElementById('root')
+   );
+ }
+
+ render(StudentComponent);
+
+ if (module.hot) {
+   module.hot.accept('./students', () => {
+     render(StudentComponent);
+   })
+ }

```

> NOTE: [`AppContainer`](https://github.com/gaearon/react-hot-loader/blob/00404dd0805260441339de4771816b1b87df118a/docs/README.md#migration-to-30)

- Finally, we need to configure `babel` to use `ES2015 modules` instead of `commonjs` due to compatibility with [`react-hot-loader`](https://github.com/gaearon/react-hot-loader/blob/00404dd0805260441339de4771816b1b87df118a/docs/README.md#webpack-2)

### ./.babelrc

```diff
{
  "presets": [
-   "env",
+   [
+     "env",
+     {
+       "modules": false
+     }
+   ],
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}

```

- Now, if we change some code:

![change js](../../99%20Readme%20Resources/03%20Environments/03%20HMR/change%20js.gif)

- For styles, we need to disable `ExtractTextPlugin`:

### ./webpack.config.js

```diff
...
  new ExtractTextPlugin({
    filename: '[name].css',
-   disable: false,
+   disable: true,
    allChunks: true,
  }),
...
```

![change css](../../99%20Readme%20Resources/03%20Environments/03%20HMR/change%20css.gif)
