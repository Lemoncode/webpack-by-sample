var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.webpack.config.js');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

const hotReloadingEntries = [
  'react-hot-loader/patch',
];

module.exports = webpackMerge.strategy({
  entry: 'prepend',
})(commonConfig, {
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  entry: {
    app: hotReloadingEntries,
    vendorStyles: hotReloadingEntries,
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    port: 8080,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      disable: true,
    }),
  ],
});
