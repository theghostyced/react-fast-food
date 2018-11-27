const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Our directory path
const BUILD_DIR = path.join(__dirname, 'dist');
// App directory
const APP_URL = path.join(__dirname, 'src');
// Public directory
const PUBLIC_URL = path.resolve(__dirname, 'public');

// JS|JSX test regex
const jsTest = /\.(js|jsx)$/;
// CSS test regex
const cssTest = /\.css$/;
// Image test regex
const imgTest = /\.(png|jpg|jpeg|gif|svg)$/i;
// Files to clean
const filesToClean = [
  'dist',
];

// Our application vendor files
const VENDOR_LIBS = [
  'react',
  'react-dom',
  'react-router-dom',
];

/** Webpack Pluguins */

// HTMLWebpackPlugin config
const HWP = new HtmlWebpackPlugin({
  template: `${APP_URL}/index.html`,
  filename: `${BUILD_DIR}/index.html`,
});

// Webpack CommonsChunk Plugin
const COMMONS_CHUNK = webpack.optimize.CommonsChunkPlugin({
  names: ['vendor', 'mainfest'],
});

// Instance of the CleanWebpackPlugin
const CLEANPLUGIN = new CleanWebpackPlugin(filesToClean);

/** Webpack exports */

module.exports = {
  entry: {
    bundle: `${APP_URL}/root.js`,
    vendor: VENDOR_LIBS,
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: jsTest,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: cssTest,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: imgTest,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    HWP,
    COMMONS_CHUNK,
    CLEANPLUGIN,
  ],
};
