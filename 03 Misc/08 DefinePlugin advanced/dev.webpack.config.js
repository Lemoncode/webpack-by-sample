var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.webpack.config.js');

var basePath = __dirname;

const env = {
  NODE_ENV: JSON.stringify('development'),
  API_URL: JSON.stringify('https://webpack-sample-dev-lemoncode.herokuapp.com/api/students')
}

module.exports = function () {
  return webpackMerge(commonConfig, {
    // For development https://webpack.js.org/configuration/devtool/#for-development
    devtool: 'inline-source-map',

    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                camelCase: true
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader']
        },
      ]
    },

    output: {
      path: path.join(basePath, 'dist'),
      filename: '[name].js',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': env
      })
    ],

    devServer: {
      port: 8080,
    }
  });
}
