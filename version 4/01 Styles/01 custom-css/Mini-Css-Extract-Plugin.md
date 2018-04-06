# 01 WebPack 4.2+: Extracting CSS to a file using mini-css-extract-plugin package

If we have webpack 4.2+ version we could work with the mini-css-extract-plugin package to extract CSS to a file. In the following steps we will explain we need to implement this alternative to the extract-text-webpack-plugin package.

First, if we still have the extract-text-webpack-plugin package installed, we should uninstall it to have clean our development environment. For that we need to perform the following command:
```bash
npm uninstall extract-text-webpack-plugin --d
```
We could check we don't have this package using the following command:
```bash
npm list extract-text-webpack-plugin
```
We will see in the console something like this:
```bash
boilerplate@1.0.0 C:\mxm\practices\webpack-by-sample\version 4\00 intro\05 jquery
`-- (empty)

npm ERR! code 1
```
Next, we will add the mini-css-extract-plugin package we mentioned before, using the following command: 
```bash
npm i mini-css-extract-plugin css-loader --save-dev
```
Once the package is successfully installed, we will configure the plugin and the loader of this package in the webpack.confi.js, applying the following changes:

- We will add the reference to this package:

_webpack.config.js_

```diff
var HtmlWebpackPlugin = require('html-webpack-plugin');
+ var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack');

module.exports = {
```
- Next, we will add the following changes in the rules array:

_webpack.config.js_
```diff
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
+     {
+       test: /\.css$/,
+       exclude: /node_modules/,
+       use: [MiniCssExtractPlugin.loader, "css-loader"]
+     },
```
- Finally, we will add the plugin object for this package:

_webpack.config.js_
```diff
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
+   new MiniCssExtractPlugin({
+     filename: "[name].css",
+     chunkFilename: "[id].css"
+   }),
  ],
``` 
To check that our confiuration is OK we will run the build:
```bash
npm run build
```
We will see somthing like this output:

![](./folder-dist.PNG?raw=true)