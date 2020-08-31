const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
  entry: [
    'babel-polyfill',
    './src/index.tsx'
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
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'] 
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'] 
    }, {
      test: /.*\.(gif|png|jpe?g)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 5120,
            // 加上hash解决名称冲突问题
            // name: 'static/imgs/[name]@[hash:8].[ext]',
            name: '[name].[hash:8].[ext]',
            // esModule: false
          }
        }
      ]
    },]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    // 解析目录时要使用的文件名
    mainFiles: ['index.tsx', 'index.ts', 'index'],
    // 使用 TS 的话还需在 tsconfig.json 里也配置 alias，否则会有 TS 报错
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@img': path.resolve(__dirname, '../img'),
    },
  },
};

module.exports = commonConfig;