const webpack = require('webpack');
const config = require('./webpack.base.config');
const path = require('path');

config.entry = './src/index.js';
config.mode = 'production';
config.output = {
  path: path.resolve('dist'),
  filename: 'Vue-edit-json.js',
  library: 'Vue-edit-json',
  libraryTarget: 'umd',
};
config.externals = {
  vue: 'Vue',
};

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  })
]);

module.exports = config;
