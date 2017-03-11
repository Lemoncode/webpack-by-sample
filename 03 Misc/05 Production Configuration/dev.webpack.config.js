var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.webpack.config.js');

module.exports = function () {
  return webpackMerge(commonConfig, {
    // For development https://webpack.js.org/configuration/devtool/#for-development
    devtool: 'inline-source-map',
  });
}
