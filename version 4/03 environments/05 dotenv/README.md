# 05 Enviroment variables

In this demo we are going to setup enviroment variable each type of build
(e.g. rest api base url), we will make use of _dotenv_

We will start from sample _03 Environments/04 Production_.

Summary steps:

- Install webpackdotenv.
- Generate env files.
- Add base config.
- Add dev config.
- Add prod config

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _04 production_.

## steps

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's install dotenv-webpack

```bash
npm install dotenv-webpack --save-dev
```
- Let's create two simple environment files.

_dev.env_

```
// .dev
API_BASE=http://localhost:8081/
```

_prod.env_

```
// .prod
API_BASE=https://myapp.api/
```

- Let's setup the plugin dev config.

_./dev.webpack.config.js_

```diff
const common = require("./base.webpack.config.js");
+ const Dotenv = require('dotenv-webpack');
```

_./dev.webpack.config.js_

```diff
  devServer: {
    contentBase: './dist',
    hot: true,
  },
+ plugins: [
+  new Dotenv({
+    path: './dev.env'
+  }),
+ ],  
  module: {
```

- Let's setup the plugin prod config.

_./prod.webpack.config.js_

```diff
const CompressionPlugin = require("compression-webpack-plugin");
+ const Dotenv = require('dotenv-webpack');
```

```diff
  plugins: [
+   new Dotenv({
+     path: './prod.env'
+   }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css',
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.jsx$|\.scss$|\.css$|\.html$/,
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
```

- Let's introduce a test in our code (console log).

_./src/averageservice.jsx_

```diff
 console.log(`We are in: ${process.env.NODE_ENV}`);
+ console.log(`Api base: ${process.env.API_BASE}`);
```

- Let test dev config, run the following command from terminal and open your browser
console:

```bash
npm run start
```

- To test production settings we have to build + start prod server:

```bash
npm run build:prod
```


```bash
npm run start:prod
```