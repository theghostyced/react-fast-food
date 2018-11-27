/* eslint-disable no-unused-vars */
const merge = require('webpack-merge'); // Merge our common and dev config files.
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.config');

const APP_URL = path.resolve(__dirname, 'src');

// SCSS test regex
const scssTest = /\.scss$/;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  rules: [
    {
      test: scssTest,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ],
});
