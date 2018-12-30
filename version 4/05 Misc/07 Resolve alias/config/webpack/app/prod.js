const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('../../helpers');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: helpers.resolveFromRootPath('dist'),
    filename: '[chunkhash].[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[chunkhash].[name].css',
      chunkFilename: '[chunkhash].[id].css',
    }),
  ],
});
