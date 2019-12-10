const merge = require('webpack-merge');
const base = require('./base.webpack.config.js');
const Dotenv = require('dotenv-webpack');
const WebpackMonitor = require('webpack-monitor');

module.exports = merge(base, {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    filename: '[name].js',
  },
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
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
              localsConvention: 'camelCase',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
  },
  plugins: [
    new Dotenv({
      path: './dev.env',
    }),
    new WebpackMonitor({
      capture: true, // -> default 'true'
      target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
      launch: true, // -> default 'false'
      port: 3030, // default -> 8081
    }),
  ],
});
