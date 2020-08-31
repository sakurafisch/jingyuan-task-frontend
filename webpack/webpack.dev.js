const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');

const devConfig = merge(commonConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    progress: true,
  }
})

module.exports = devConfig;
