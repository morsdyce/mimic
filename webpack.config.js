'use strict';

const webpack           = require('webpack');
const path              = require('path');
const CleanPlugin       = require('clean-webpack-plugin');

const appEnv            = process.env.NODE_ENV || 'development';
const libPath           = path.join(__dirname, 'lib');
const distPath          = path.join(__dirname, 'dist');
const exclude           = /node_modules/;
const assetsPathPattern = '[path][name].[hash].[ext]';
const distFilePattern   = '[name].js';

let config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: libPath,

  entry: {
    'bdsm.api': ['api/index.js'],
    'bdsm': 'index.js'
  },

  // Options affecting the resolving of modules
  resolve: {
    // Enable resolving modules relative to these paths
    root: [libPath],
    extensions: ['', '.webpack.js', '.js']
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: distFilePattern,
    libraryTarget: 'umd',
    library: 'bdsm'
  },

  module: {
    loaders: [
      // Babel
      {
        test: /\.jsx?$/,
        exclude,
        loader: 'babel'
      },

      // SCSS
      {
        test: /\.(css|scss)$/,
        loaders: [
          'css',
          'autoprefixer',
          'sass?includePaths[]=' + encodeURIComponent(libPath)
        ]
      },

      // JSON
      {
        test: /\.json$/,
        loader: 'json',
        exclude
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(jpe?g|png|gif|eot|woff2?|ttf|svg)(\?.*)?$/i,
        loaders: [
          'url?limit=999999&name=' + assetsPathPattern
        ]
      }
    ]
  },

  plugins: [
    // Remove duplicate `require`d files
    new webpack.optimize.DedupePlugin(),

    // Define global variables that will be available in any chunk
    new webpack.DefinePlugin({
      __ENV: JSON.stringify(appEnv),
      'process.env': {
        'NODE_ENV': JSON.stringify(appEnv)
      }
    })
  ],

  // Settings for webpack-dev-server (instead of using CLI flags)
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: libPath,
    colors: true,
    noInfo: true,
    inline: true
  }

};

if (appEnv !== 'production') {
  config.devtool = '#inline-source-map';
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build related folders
    new CleanPlugin(['dist']),

    new webpack.optimize.OccurrenceOrderPlugin(true),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    })
  );
}

module.exports = config;
