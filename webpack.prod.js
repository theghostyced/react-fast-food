/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge'); // Merge our common and dev config files.
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config');

const APP_URL = path.resolve(__dirname, 'src');

// SCSS test regex
const scssTest = /\.scss$/;


/** Webpack Plugins */

const scssPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].css',
});

const uglifyJS = new UglifyWebpackPlugin({
  test: /\.js$/,
  exclude: 'node_modules',
});

/** Webapck exports */
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  rules: [
    {
      test: scssTest,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    },
  ],
  plugins: [scssPlugin, uglifyJS],
});
