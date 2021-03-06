/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge'); // Merge our common and dev config files.
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config');

// SCSS test regex
const scssTest = /\.scss$/;


/** Webpack Plugins */

const scssPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
});

const uglifyJS = new UglifyWebpackPlugin({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  cache: true,
  parallel: true,
});

/** Webapck exports */
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: scssTest,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [uglifyJS],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: scssTest,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    scssPlugin,
    new webpack.DefinePlugin({
      'process.env.SERVER_API': JSON.stringify('https://fast-foo.herokuapp.com/api/v1')
    }),
  ],
});
