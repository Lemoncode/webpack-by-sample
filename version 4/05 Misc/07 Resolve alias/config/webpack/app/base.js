const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('../common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('../../helpers');

module.exports = merge(common, {
  context: helpers.resolveFromRootPath('src'),
  entry: {
    app: ['./index.tsx'],
    vendor: [
      '@babel/polyfill',
      'history',
      'lc-form-validation',
      'react',
      'react-dom',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
      'whatwg-fetch',
    ],
    vendorStyles: ['../node_modules/bootstrap/dist/css/bootstrap.css'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          useCache: true,
          babelCore: '@babel/core',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
});
