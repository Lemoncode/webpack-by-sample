# 06 Bundle Analyzer

In this demo we are going to configure Webpack Bundle Analyzer plugin, this is a plugin that help us to visualize size of webpack output files with an interactive zoomable treemap.

We will start from sample _03 Environments/04 Production Configuration_.

Summary steps:
- Install Webpack Bundle Analyzer plugin.
- Add performance config file.
- Add the configuration to performance config file.
- Create execution script.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _04 Production Configuration_.

## Steps

- `npm install` to install previous sample packages:

```
npm install
```
- Let's go with the plugin installation

```
npm install webpack-bundle-analyzer --save-dev
```

- Now it's time to create performance configuration file, this will use our production configuration file as a base(prod.webpack.config.js).

### ./perf.webpack.config.js

We will use `webpack-merge` to combine `prod.webpack.config.js` with performance specific config settings.

- Our performance config file look like:

```javascript
const merge = require('webpack-merge');
const common = require('./prod.webpack.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
   plugins: [
    new BundleAnalyzerPlugin()
  ]
});

```

Finally, we need to update command script:

### ./package.json

```diff
{
  ...
  "scripts": {
    "start": "webpack-dev-server --open --config dev.webpack.config.js",
    "start:dev": "webpack-dev-server --open --config dev.webpack.config.js",
    "start:prod": "node ./server",
    "build:dev": "rimraf dist && webpack --config dev.webpack.config.js",
    "build:prod": "rimraf dist && webpack --config prod.webpack.config.js"
+   "build:perf": "rimraf dist && webpack --config perf.webpack.config.js" 
  },
  ...
}
```

- Now we can see our interactive treemap working! Simply execute the command `npm run build:perf`

![Captura Webpack Bundle Analyzer](./readme-resource/bundleAnalyzer.png)
