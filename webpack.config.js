'use strict';

const webpack                       = require('webpack');
const path                          = require('path');
const CleanPlugin                   = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const appEnv            = process.env.NODE_ENV || 'development';
const libPath           = path.join(__dirname, 'lib');
const distPath          = path.join(__dirname, 'dist');
const assetsPathPattern = '[path][name].[hash].[ext]';
const distFilePattern   = '[name].js';
const packageConfig     = require('./package.json');

let config = {
  // The base directory for resolving `entry` (must be absolute path)
  context: libPath,

  entry: {
    'mimic.api': ['api/index.js'],
    'mimic.remote': ['api/remote.js'],
    'mimic': 'index.js'
  },

  // Options affecting the resolving of modules
  resolve: {
    // Enable resolving modules relative to these paths
    modules: [
      libPath,
      'node_modules'
    ],
    extensions: ['.webpack.js', '.js']
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: distFilePattern,
    libraryTarget: 'umd',
    library: 'mimic'
  },

  module: {
    rules: [
      // Babel
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve('lib'),
          path.resolve('node_modules/preact-compat/src')
        ]
      },

      // SCSS
      {
        test: /\.(css|scss)$/,
        use: [
          'css-loader',
          'autoprefixer-loader',
          'sass-loader?includePaths[]=' + encodeURIComponent(libPath)
        ]
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(jpe?g|png|gif|eot|woff2?|ttf|svg)(\?.*)?$/i,
        loader: 'url-loader?limit=999999&name=' + assetsPathPattern
      }
    ]
  },

  plugins: [
    // Define global variables that will be available in any chunk
    new webpack.DefinePlugin({
      __VERSION: JSON.stringify(packageConfig.version),
      __ENV: JSON.stringify(appEnv),
      'process.env': {
        'NODE_ENV': JSON.stringify(appEnv)
      }
    })
  ],

  devServer: {
    contentBase: libPath,
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

    new LodashModuleReplacementPlugin({
      paths: true,
      shorthands: true,
      collections: true
    })
  );
}

function getConfigs(originalConfig) {
  const webConfig = {
    ...originalConfig,
  };

  const webWorkerConfig = {
    ...originalConfig,
    target: 'webworker',
    entry: { 'mimic.worker': ['api/worker.js'] }
  };

  if (appEnv === 'production') {
    webConfig.plugins.push(
      new CleanPlugin(['dist'], {
        exclude: ['mimic.worker.js']
      })
    );

    webWorkerConfig.plugins.push(
      new CleanPlugin(['dist/mimic.worker.js'])
    );
  }

  return [webConfig, webWorkerConfig];
}

module.exports = getConfigs(config);
