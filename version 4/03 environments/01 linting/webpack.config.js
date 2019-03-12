var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require("path");
var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  entry: {
    app: "./students.js",
    appStyles: ["./mystyles.scss"],
    vendor: ["jquery"],
    vendorStyles: ["../node_modules/bootstrap/dist/css/bootstrap.css"]
  },
  output: {
    filename: "[name].[chunkhash].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
      hash: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
