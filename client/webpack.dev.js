const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html',
});

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.jsx'],
  devtool: 'inline-source-map',
  output: {
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader'
    }, {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: { minimize: true },
        },
      ],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true, // webpack@1.x
            disable: true, // webpack@2.x and newer
          },
        },
      ],
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    htmlPlugin,
    new webpack.DefinePlugin({
      'process': {
        env: JSON.stringify(process.env),
      },
    }),
  ],
  devServer: {
    port: 5010,
    historyApiFallback: true,
    hot: true,
    compress: true
  }
};