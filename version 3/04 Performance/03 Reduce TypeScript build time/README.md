# 03 Reduce TypeScript build time

In this demo we are going to play with the build time speed with Webpack and TypeScript. For that, we are going to configure `awesome-typescript-loader` options.

We will start from sample _04 Performance/02 Tree shaking TypeScript_.

Summary steps:
- Take some base measures.
- Apply `useCache` flag.
- Apply CheckerPlugin.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _02 Tree shaking TypeScript_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- We are going to play with the build time speed with Webpack and TypeScript. To keep some base measures (these measures are approximate, it could change):

- `npm run build`:

![01 build](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/01%20build.png)

- `npm start`, change some code and see `re-build` time:

![01 start](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/01%20start.png)

![01 re-build](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/01%20re-build.png)

- `npm run build:prod`:

![01 build prod](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/01%20build%20prod.png)

- A nice feature that comes with [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader) is the `useCache` flag:

> NOTE: _When useBabel and useCache flags are enabled, typescript's emit will be transpiled with Babel and cached. So next time if source file (+environment) has the same checksum we can totally skip typescript's and babel's transpiling. This significantly reduces build time in this scenario._

### ./webpack.config.js

```diff
...

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
+         useCache: true,
        },
      },
...
```

- `npm run build`:

![02 build](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/02%20build.png)

- `npm start`, change some code and see `re-build` time:

![02 start](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/02%20start.png)

![02 re-build](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/02%20re-build.png)

- `npm run build:prod`:

![02 build prod](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/02%20build%20prod.png)

- And we can use too the `CheckerPlugin` for type checking in a separate process:


### ./webpack.config.js

```diff
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
+ var { CheckerPlugin } = require('awesome-typescript-loader');
...

    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      disable: false,
      allChunks: true,
    }),
+   new CheckerPlugin(),
...
```

- `npm run build`:

![03 build](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/03%20build.png)

- `npm start`, change some code and see `re-build` time:

![03 start](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/03%20start.png)

![03 re-build](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/03%20re-build.png)

- `npm run build:prod`:

![03 build prod](../../99%20Readme%20Resources/04%20Performance/03%20Reduce%20TypeScript%20build%20time/03%20build%20prod.png)
