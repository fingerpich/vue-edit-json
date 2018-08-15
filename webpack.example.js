const webpack = require('webpack');
const config = require('./webpack.base.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.entry = './example/main.js';
config.mode = 'development';
config.output = {
  path: path.resolve(__dirname, './example/dist/'),
  publicPath: '',
  filename: '[name]_[hash].js',
};

config.plugins = (config.plugins || []).concat([
    new HtmlWebpackPlugin({
        // filename: './example/index.html',
        template: './example/index.html',
        inject: true,
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    })
]);

module.exports = config;
