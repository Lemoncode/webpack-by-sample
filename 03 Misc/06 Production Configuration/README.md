# 06 Production Configuration

In this demo we are going to create different builds for each environment.
We will learn how to configure it and how to reduce bundle file sizes.

We will start from sample _03 Misc/04 CSS Modules_.

Summary steps:
- Add base webpack config file
- Add webpack-merge package.
- Install rimraf to clean dist folder.
- Add development config file.
- Add production config file.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _04 CSS Modules_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- We are going to start with creating a base webpack configuration file where we are going to add the common features for both environments (`dev` and `prod`). One of the feature which we are split between environments is `sourcemaps`. [Webpack recommends](https://webpack.js.org/guides/production-build/#source-maps) that we enable source maps for `production` environment, due to are useful for debugging and to run benchmark tests. That's why they recommend use for example `cheap-module-source-map` for production.

- Let's go to rename `webpack.config.js` to `base.webpack.config.js`:

### ./base.webpack.config.js
```diff
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  entry: {
    app: './students.jsx',
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
    filename: '[chunkhash].[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
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
                camelCase: true,
              },
            },
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
      // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      // Using here url-loader and file-loader
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ],
  },
- // For development https://webpack.js.org/configuration/devtool/#for-development
- devtool: 'inline-source-map',
  devServer: {
    port: 8080,
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
			hash: true,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true,
    }),
  ],
};

```

- To avoid each time we run build delete the dist folder manually, we are going to install a package that does it for us:

```
npm install rimraf --save-dev
```


- Now it's time to install `webpack-merge` package. This allow us to combine `base.webpack.config` with environment config:

```
npm install webpack-merge --save-dev
```

- Let's go to create the `dev` environment configuration:

### ./dev.webpack.config.js
```javascript
var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.webpack.config.js');

module.exports = function () {
  return webpackMerge(commonConfig, {
    // For development https://webpack.js.org/configuration/devtool/#for-development
    devtool: 'inline-source-map',
  });
}

```

- Finally we need to update command script:

### ./package.json
```diff
{
  ...
  "scripts": {
-   "start": "webpack-dev-server"
+   "start": "webpack-dev-server --config=dev.webpack.config.js"
  },
  ...
}

```

- Running `npm start`:

![dev config result](../../99%20Readme%20Resources/03%20Misc/05%20Production%20Configuration/dev%20config%20result.png)

- We are going to create a `build dev` command to see how much size has bundles files without `webpack-dev-server` stuff:

### ./package.json
```diff
{
  ...
  "scripts": {
-   "start": "webpack-dev-server --config=dev.webpack.config.js"
+   "start": "webpack-dev-server --config=dev.webpack.config.js",
+   "build:dev": "rimraf dist && webpack --config=dev.webpack.config.js"
  },
  ...
}

```

- Running `npm run build:dev`, we can see how vendor bundle size decrease:

![build dev config](../../99%20Readme%20Resources/03%20Misc/05%20Production%20Configuration/build%20dev%20config.png)

- Let's configure `production` environment:

### ./prod.webpack.config.js
```javascript
var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.webpack.config.js');

module.exports = function () {
  return webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
  });
}

```

- Add production command script:

### ./package.json
```diff
{
  ...
  "scripts": {
    "start": "webpack-dev-server --config=dev.webpack.config.js",
-   "build:dev": "rimraf dist && webpack --config=dev.webpack.config.js"
+   "build:dev": "rimraf dist && webpack --config=dev.webpack.config.js",
+   "build:prod": "rimraf dist && webpack --config=prod.webpack.config.js"
  },
  ...
}

```

- Running `npm run build:prod`, we can see how all bundle sizes decrease and map files appears:

![cheap source maps configuration](../../99%20Readme%20Resources/03%20Misc/05%20Production%20Configuration/cheap%20source%20maps%20configuration.png)

- But we need one step over to decrease bundle size. We need to minify and uglify our bundles. To do this, we only need to active `p` flag:

### ./package.json
```diff
{
  ...
  "scripts": {
    "start": "webpack-dev-server --config=dev.webpack.config.js",
    "build:dev": "rimraf dist && webpack --config=dev.webpack.config.js",
-   "build:prod": "rimraf dist && webpack --config=prod.webpack.config.js"
+   "build:prod": "rimraf dist && webpack -p --config=prod.webpack.config.js"
  },
  ...
}

```

- Running `npm run build:prod`, we can see how bundle sizes decrease considerably:

![prod config result](../../99%20Readme%20Resources/03%20Misc/05%20Production%20Configuration/prod%20config%20result.png)

### ./dist/...app.js
```diff
webpackJsonp([1,3],{171:function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var o=n(18),u=r(o),a=n(29),c=r(a),l=n(79),i=n(80);c.render(u.createElement("div",null,u.createElement("h1",null,"Hello from React DOM"),u.createElement(l.AverageComponent,null),u.createElement(i.TotalScoreComponent,null)),document.getElementById("root"))},49:function(e,t,n){"use strict";function r(e){return o(e)/e.length}function o(e){return e.reduce(function(e,t){return
  ...
```

### ./dist/..app.css
```diff
.averageComponentStyles__result-background___Z3Vf0{background-color:teal}.jumbotron.averageComponentStyles__result-background___Z3Vf0{background-color:#8fbc8f!important;display:block}.totalScoreComponentStyles__result-background___3eH-g{background-color:#cd5c5c}
/*# sourceMappingURL=5cb91c14c876707fc272.app.css.map*/

```

- Finally, if we want to decrease the size even more, we can enable Tree Shaking like in [02 Tree Shaking ES6](../02%20Tree%20Shaking%20ES6/README.md#babelrc) sample:

### ./.babelrc
```diff
{
  "presets": [
-   "env",
+   [
+     "env",
+     {
+       "modules": false,
+     },
+   ],
    "react",
  ]
}

```

- Running `npm run build:prod`, we can see how `app` sizes decrease a bit more:

![result with tree shaking](../../99%20Readme%20Resources/03%20Misc/05%20Production%20Configuration/result%20with%20tree%20shaking.png)

- About using React in `production` mode with Webpack, [here](https://facebook.github.io/react/docs/optimizing-performance.html) explains you that we only need to add:

```javascript
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}),
new webpack.optimize.UglifyJsPlugin()
```

- So, since [Webpack 2 -p flag](https://webpack.js.org/guides/production-build/#components/sidebar/sidebar.jsx) is doing all of these for us, we don't need to add any configuration more.

- As an optional configuration, we can go one over step and generate gzipped bundles. We need install [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin):

```
npm install compression-webpack-plugin --save-dev
```

- Updating `prod.webpack.config`:

### ./prod.webpack.config.js
```diff
var webpackMerge = require('webpack-merge');
+ var CompressionPlugin = require('compression-webpack-plugin');
var commonConfig = require('./base.webpack.config.js');

module.exports = function () {
  return webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
+   plugins: [
+     new CompressionPlugin({
+       asset: '[path].gz[query]',
+       algorithm: 'gzip',
+       minRatio: 0.8,
+     }),
    ],
  });
}

```

- Running `npm run build:prod`, we can see `.gz` files that we can upload to server. This is an optional configuration because it needs an extra configuration in server side:

![result with gzipped bundles](../../99%20Readme%20Resources/03%20Misc/05%20Production%20Configuration/result%20with%20gzipped%20bundles.png)

> NOTE: `.map` files or `index.html` are not gzipping because they have low sizes and compression is not needed.

> _minRatio: Only assets that compress better that this ratio are processed. Defaults to 0.8._
