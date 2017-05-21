'use strict';

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'snoo_shelf';
let plugins = [], outputFile;

// TODO: skip UglifyJS because of ES6 issue, need to resolve this (reference: https://github.com/webpack/webpack/issues/2545)
// if (env === 'build') {
//   plugins.push(new UglifyJsPlugin({ minimize: true }));
//   outputFile = libraryName + '.min.js';
// } else {
//   outputFile = libraryName + '.js';
// }
outputFile = libraryName + '.js';

const config = {
  entry: __dirname + '/src/index.ts',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.ts)$/,
        loaders: ['ts-loader'],
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules/'],
    extensions: ['.json', '.ts', '.d.ts', '.js']
  },
  plugins: plugins,

  externals: {
    "snoowrap": {
      commonjs: "snoowrap",
      commonjs2: "snoowrap",
      amd: "snoowrap",
      root: "snoowrap"
    },
    "dropbox": {
      commonjs: "dropbox",
      commonjs2: "dropbox",
      amd: "dropbox",
      root: "dropbox"
    }
  }
};

module.exports = config;