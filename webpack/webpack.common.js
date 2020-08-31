const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
  entry: [
    'babel-polyfill',
    './src/index.ts'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    // 生成 HTML 文件并自动导入静态文件等
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.(jsx?|tsx?)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ]
  },
};

module.exports = commonConfig;