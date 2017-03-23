var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.webpack.config.js');

const env = {
  NODE_ENV: JSON.stringify('development'),
  API_URL: JSON.stringify('https://webpack-sample-dev-lemoncode.herokuapp.com/api/students')
}

module.exports = function () {
  return webpackMerge(commonConfig, {
    // For development https://webpack.js.org/configuration/devtool/#for-development
    devtool: 'inline-source-map',

    plugins: [
      new webpack.DefinePlugin({
        'process.env': env
      })
    ]
  });
}
