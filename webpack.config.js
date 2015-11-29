const path              = require('path');

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
    'shredder.api': ['api/index.ts'],
    'shredder': 'index.ts'
  },

  // Options affecting the resolving of modules
  resolve: {
    // Enable resolving modules relative to these paths
    root: [libPath],
    extensions: ['', '.webpack.js', '.ts', '.js']
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: distFilePattern,
    libraryTarget: 'umd',
    library: 'Shredder'
  },

  module: {
    loaders: [
      // TypeScript
      {
        test: /\.ts$/,
        exclude,
        loader: 'ts'
      },

      // SCSS
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
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
          'url?limit=5120&name=' + assetsPathPattern
        ]
      }
    ]
  },

  // Settings for webpack-dev-server (instead of using CLI flags)
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: libPath,
    colors: true,
    noInfo: true,
    inline: true
  }

};

if (appEnv === 'development') {
  config.devtool = '#inline-source-map';
}

module.exports = config;
