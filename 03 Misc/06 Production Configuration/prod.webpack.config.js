var webpackMerge = require('webpack-merge');
var CompressionPlugin = require('compression-webpack-plugin');
var commonConfig = require('./base.webpack.config.js');

module.exports = function () {
  return webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
    plugins: [
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        minRatio: 0.8,
      }),
    ],
  });
}
