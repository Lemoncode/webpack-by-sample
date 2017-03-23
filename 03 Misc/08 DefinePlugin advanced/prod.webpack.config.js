var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var CompressionPlugin = require('compression-webpack-plugin');
var commonConfig = require('./base.webpack.config.js');

const env = {
  NODE_ENV: JSON.stringify('production'),
  API_URL: JSON.stringify('https://webpack-sample-prod-lemoncode.herokuapp.com/api/students')
}

module.exports = function () {
  return webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
    plugins: [
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        minRatio: 0.8,
      }),

      new webpack.DefinePlugin({
        'process.env': env
      })
    ],
  });
}
