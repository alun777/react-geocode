const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const BUILD_DIR = path.resolve(__dirname, 'build/');
const SOURCE_DIR = path.resolve(__dirname, 'src/');

module.exports = {
  mode: 'development',
  entry: {
    main: `${SOURCE_DIR}/index.js`
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './build',
    open: true,
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|ttf|ico|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/images/favicon.ico'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ],
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  }
};
