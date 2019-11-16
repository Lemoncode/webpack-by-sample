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
npm install react-hot-loader --save
```

- Let' add react-hot-loader/babel plugin to the _[./babelrc](./babelrc)_:

_./babelrc_

```diff
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
+ "plugins": ["react-hot-loader/babel"]
}

```

- Let's move some functionality to `index.tsx` file. It will be the new start up point:

_./src/index.tsx_

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>App component</h1>, document.getElementById('root'));

```

- Let's mark the root component as _hot-exported_:

_./src/student.tsx_

```diff
import React from 'react';
- import ReactDOM from 'react-dom';
+ import { hot } from 'react-hot-loader/root';
import { AverageComponent } from './averageComponent';
import { TotalScoreComponent } from './totalScoreComponent';
- const logoImg = require('./content/logo_1.png');

$('body').css('background-color', 'lightSkyBlue');

- const img = document.createElement('img');
- img.src = logoImg;

- document.getElementById('imgContainer').appendChild(img);

- ReactDOM.render(
+ const App: React.FunctionComponent = () => {
+   return (
      <div>
        <h1>Hello from React DOM</h1>
        <AverageComponent />
      <TotalScoreComponent />
-     </div>,
+     </div>
+   );
+ };
-   document.getElementById('root')
- );
+ export default hot(App);

```

- Update `index.tsx`:

_./src/index.tsx_

```diff
import React from 'react';
import ReactDOM from 'react-dom';
+ import App from './students';

- ReactDOM.render(<h1>App component</h1>, document.getElementById('root'));
+ ReactDOM.render(<App />, document.getElementById('root'));

```

- Let's update `webpack config`:

_./webpack.config.js_

```diff
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: {
-   app: ['regenerator-runtime/runtime', './students.tsx'],
+   app: ['regenerator-runtime/runtime', './index.tsx'],
    ...
  },
  ...
  devtool: 'inline-source-map',
+ devServer: {
+   hot: true,
+ },
```

- Now you can launch `npm run start`, and try to .

- This won't work with CSS using `MiniCssExtractPlugin` nor `chunkhash`, you will need to disable it when working on dev mode. We will see in next example.

Guide 1: 
https://github.com/webpack-contrib/mini-css-extract-plugin#advanced-configuration-example

Guide 2:

https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34

- Meanwhile, we could do some changes:

_./webpack.config.js_

```diff
const HtmlWebpackPlugin = require('html-webpack-plugin');
- const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const basePath = __dirname;

module.exports = {
  ...
  output: {
-   filename: '[name].[chunkhash].js',
+   filename: '[name].js',
  },
  module: {
    rules: [
      ...
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
-         MiniCssExtractPlugin.loader,
+         'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
              localsConvention: 'camelCase',
            },
          },
          ...
        ],
      },
      {
        test: /\.css$/,
-       use: [MiniCssExtractPlugin.loader, 'css-loader'],
+       use: ['style-loader', 'css-loader'],
      },
      ...
    ],
  },
  plugins: [
    ...
-   new MiniCssExtractPlugin({
-     filename: '[name].css',
-     chunkFilename: '[id].css',
-   }),
  ],
  ...
};

```

- See `Chrome dev tools` warning about react-dom. There is a [`react-dom` hot-loader](https://github.com/hot-loader/react-dom) friendly to obtain more `hot` dev experience:

```bash
npm install @hot-loader/react-dom --save-dev
```

- Let's configure it:

_./webpack.config.js_

```diff
...

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
+   alias: {
+     'react-dom': '@hot-loader/react-dom',
+   },
  },
  ...
```

- Running it:

