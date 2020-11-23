const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path');

module.exports = {
  entry: {
    app: ['babel-polyfill', './index.js'],
    game: './resource/controllers/gameController.js',
    result: './resource/controllers/resultController.js'
  },

  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // output file name
      template: 'index.html',  // template file name
      excludeChunks : ['result']
    }),
    new HtmlWebpackPlugin({
      filename: 'result.html', // output file name
      template: './resource/views/result.html',  // template file name
      excludeChunks :['game']
    }),
    new MiniCssExtractPlugin({ filename: 'app.css' }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['public']
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules||test/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ]
  },
  devServer : {
    hot: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}