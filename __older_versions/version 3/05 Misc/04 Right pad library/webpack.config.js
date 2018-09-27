module.exports = {
  entry: './src/rightpad.ts',
  output: {
    filename: 'dist/rightpad.js',
    library: 'rightPad',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
    ]
  }
};
