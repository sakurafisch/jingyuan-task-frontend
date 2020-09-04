const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

const postCssLoaderConfig = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer')({
        // 要适配的浏览器
        overrideBrowserslist: [
          'Chrome > 31',
          'ff > 31',
          'ie >= 10'
        ]
      })
    ]
  }
};

const commonConfig = {
  entry: [
    'babel-polyfill',
    './src/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  },
  plugins: [
    // 生成 HTML 文件并自动导入静态文件等
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash].css",
    }),
    new WebpackDeepScopeAnalysisPlugin()
  ],
  module: {
    rules: [{
        test: /\.(jsx?|tsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          // babel-plugin-import 需要在 webpack 里配置，在 .babelrc 里配置会失效，并且 tsconfg.json 中的 module 不能设置为 commonjs
          // https://github.com/ant-design/babel-plugin-import/issues/73
          plugins: [
            ["import", {
              libraryName: "antd",
              style: "css"
            }]
          ]
        }
      }, {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', postCssLoaderConfig]
      }, {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', postCssLoaderConfig, 'less-loader']
      }, {
        test: /.*\.(gif|png|svg|jpe?g)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5120,
            name: 'static/imgs/[name].[hash:8].[ext]',
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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