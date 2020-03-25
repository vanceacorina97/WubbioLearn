const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html',
});

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
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
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        htmlPlugin
    ],
    devServer: {
        port: 5010,
        historyApiFallback: true,
        hot: true,
        compress: true
    }
};