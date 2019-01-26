/* eslint-disable no-unused-vars */
const merge = require('webpack-merge'); // Merge our common and dev config files.
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const common = require('./webpack.config');

const APP_URL = path.resolve(__dirname, 'src');

// SCSS test regex
const scssTest = /\.scss$/;

// https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: scssTest,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ],
});
