const merge = require('webpack-merge');
const common = require('./base.webpack.config.js');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CompressionPlugin(),
    ],
});