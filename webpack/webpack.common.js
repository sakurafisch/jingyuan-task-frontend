const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    // 生成 HTML 文件并自动导入静态文件等
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [{
      test: /\.(jsx?|tsx?)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }]
  }
};

module.exports = commonConfig;