# 04 Production Configuration

In this demo we are going to create different builds for each environment.
We will learn how to configure it and how to reduce bundle file sizes.

We will start from sample _03 Environments/03 HMR_.

Summary steps:
- Add base webpack config file
- Add webpack-merge package.
- Add development config file.
- Add production config file.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 hmr_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- We are going to start with creating a base webpack configuration file where we are going to add the common features for both environments (`dev` and `prod`). One of the feature which we are split between environments is `sourcemaps`. [Webpack recommends](https://webpack.js.org/guides/production/#source-mapping) that we enable source maps for `production` environment, due to are useful for debugging and to run benchmark tests, but we have to disable it for normal use.

- Let's go to rename `webpack.config.js` to `base.webpack.config.js`:

### ./base.webpack.config.js
```diff
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
- var webpack = require('webpack');
var path = require('path');

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
    filename: '[name].[hash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
            },    
          },
          "sass-loader",
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },      
    ],
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
};
```

- Now it's time to install `webpack-merge` package. This allow us to combine `base.webpack.config` with environment config:

```
npm install webpack-merge --save-dev
```

- Let's go to create the `dev` environment configuration:

### ./dev.webpack.config.js
```javascript
const merge = require('webpack-merge');
const common = require('./base.webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
});
```

- Make a configuration to see in console the enviroment in which we are

### ./averageService.js
```diff
export function getAvg(scores) {
  return getTotalScore(scores) / scores.length;
}

export function getTotalScore(scores) {
  return scores.reduce((score, count) => score + count);
}

+ console.log(`We are in: ${process.env.NODE_ENV}`);
```

- Finally we need to update command script:

### ./package.json
```diff
{
  ...
  "scripts": {
-   "start": "webpack-dev-server --mode development --open --hot",
+   "start": "webpack-dev-server --open --config dev.webpack.config.js",
    "build": "rimraf dist && webpack",
    "build:prod": "rimraf dist && webpack -p"
  },
  ...
}
```

- Running `npm start`:

We can see in console `We are in: development`

- We are going to create a `build dev` command to see how much size has bundles files without `webpack-dev-server` stuff:

### ./package.json
```diff
{
  ...
  "scripts": {
    "start": "webpack-dev-server --open --config dev.webpack.config.js",
-    "build": "rimraf dist && webpack --mode development",
+    "build": "rimraf dist && webpack --config dev.webpack.config.js"
  },
  },
  ...
}

```

- Running `npm run build`:

The dist folder is created. If we execute `index.html`, it shows us `We are in: development`.

- Let's configure `production` environment:

### ./prod.webpack.config.js
```javascript
const merge = require('webpack-merge');
const common = require('./base.webpack.config.js');

module.exports = merge(common, {
    mode: 'production',
});

```

- Add production command script:

### ./package.json
```diff
{
  ...
  "scripts": {
    "start": "webpack-dev-server --open --config dev.webpack.config.js",
    "build": "rimraf dist && webpack --config dev.webpack.config.js",
+    "build:prod": "rimraf dist && webpack --config prod.webpack.config.js"
  },
  ...
}

```

- Running `npm run build:prod`, we can see in console `We are in: production` and we can see how all bundle sizes decrease:

`npm run build`
```
  app.js          =>    46 KB
  app.css         =>     2 KB
  index.html      =>  2060 KB
  vendor.css      =>   462 KB
  vendorStyles.js =>    15 KB

```

`npm run build:prod`
```
  app.js          =>  12 KB
  app.css         =>   1 KB
  index.html      =>   1 KB
  vendor.css      => 108 KB
  vendorStyles.js =>   2 KB

```

- As an optional configuration, we can go one over step and generate gzipped bundles. We need install [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin):

```
npm install compression-webpack-plugin --save-dev
```

- Updating `prod.webpack.config`:

### ./prod.webpack.config.js
```diff
const merge = require('webpack-merge');
const common = require('./base.webpack.config.js');
+ const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
+   plugins: [
+       new CompressionPlugin(),
+   ],
    ],
});

```

- Running `npm run build:prod`, we can see `.gz` files that we can upload to server. This is an optional configuration because it needs an extra configuration in server side:

`npm run build:prod` with `CompressionPlugin`
```
  0.css              => 170 KB 
  0.css.gz           =>  23 KB 
  app.js             =>  12 KB
  app.js.gz          =>   3 KB
  app.css            =>   1 KB
  app.css.gz         =>   1 KB
  index.html         =>   1 KB
  index.html.gz      =>   1 KB
  vendor.css         => 108 KB
  vendor.css.gz      =>  35 KB
  vendorStyles.js    =>   2 KB
  vendorStyles.js.gz =>   1 KB

```

> NOTE: `.map` files are not gzipping because they have low sizes and compression is not needed.

> _minRatio: Only assets that compress better that this ratio are processed. Defaults to 0.8._
