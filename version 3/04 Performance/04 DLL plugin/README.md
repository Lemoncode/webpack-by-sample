# 04 DLL plugin

In this demo we are going to play with the build time speed installing `autodll-webpack-plugin`.

We will start from sample _04 Performance/03 Reduce TypeScript build time_.

Summary steps:
- Take some base measures.
- Configure `autodll-webpack-plugin`.
- See new measures.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 Reduce TypeScript build time_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- We are going to play with the build time speed installing `autodll-webpack-plugin`. But before, we are going to keep some base measures (these measures are approximate, it could change). But first, we need to install some vendors (and its typings except moment that has its own typings) to see how improve with this plugin:

```bash
npm install react react-dom lodash moment --save
npm install @types/react @types/react-dom @types/lodash --save-dev
```

### ./webpack.config.js

```diff
...
  entry: {
    app: './index.ts',
+   vendor: [
+     'react',
+     'react-dom',
+     'lodash',
+     'moment',
+   ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  ...
```

- `npm run build`:

![01 build](../../99%20Readme%20Resources/04%20Performance/04%20DLL%20plugin/01%20build.png)

- `npm start`, change some code and see `re-build` time:

![01 start](../../99%20Readme%20Resources/04%20Performance/04%20DLL%20plugin/01%20start.png)

![01 re-build](../../99%20Readme%20Resources/04%20Performance/04%20DLL%20plugin/01%20re-build.png)

- `npm run build:prod`:

![01 build prod](../../99%20Readme%20Resources/04%20Performance/04%20DLL%20plugin/01%20build%20prod.png)

- Now is time to install [`autodll-webpack-plugin`](https://github.com/asfktz/autodll-webpack-plugin). This plugin is a wrapper of [DllPlugin](https://webpack.js.org/plugins/dll-plugin/) but you can avoid all boilerplate. DllPlugin it great, it can drastically reduce the amount of time needed to build (and rebuild) your bundles by reducing the amount of work needs to be done.:

```bash
npm install autodll-webpack-plugin@0.2 --save-dev
```

>NOTE: It's not working on 0.3.0 version. This library has a premature version yet.

### ./webpack.config.js

```diff
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var { CheckerPlugin } = require('awesome-typescript-loader');
+ var AutoDllPlugin = require('autodll-webpack-plugin');

...

  entry: {
    app: './index.ts',
-   vendor: [
-     'react',
-     'react-dom',
-     'lodash',
-     'moment',
-   ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
...
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
+     inject: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      disable: false,
      allChunks: true,
    }),
    new CheckerPlugin(),
+   new AutoDllPlugin({
+     inject: true,
+     debug: true,
+     filename: '[hash].[name].dll.js',
+     entry: {
+       vendor: [
+         'react',
+         'react-dom',
+         'lodash',
+         'moment',
+       ],
+     },
+   }),
  ],
...

```

- `npm run build`:

![02 build](../../99%20Readme%20Resources/04%20Performance/04%20DLL%20plugin/02%20build.png)

- `npm start`, change some code and see `re-build` time:

![02 start](../../99%20Readme%20Resources/04%20Performance/04%20DLL%20plugin/02%20start.png)

![02 re-build](../../99%20Readme%20Resources/04%20Performance/04%20DLL%20plugin/02%20re-build.png)

- `npm run build:prod`:

![02 build prod](../../99%20Readme%20Resources/04%20Performance/04%20DLL%20plugin/02%20build%20prod.png)

- As we see for production config we get same size like development because we need some additional configuration.
