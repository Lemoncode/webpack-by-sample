var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  entry: {
    app: './students.jsx',
    vendor: ['react', 'react-dom'],
    vendorStyles: ['../node_modules/bootstrap/dist/css/bootstrap.css'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /vendor$/,
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
    }),
  ],
};
