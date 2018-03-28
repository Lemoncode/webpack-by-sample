var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.webpack.config.js');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var basePath = __dirname;

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      disable: false,
      allChunks: true,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      minRatio: 0.8,
    }),
  ],
});
