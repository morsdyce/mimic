const path    = require('path');
const libPath = path.join(__dirname, 'lib');
const exclude = /node_modules/;

const config = {

  // set the context
  context: libPath,
  entry: 'index.ts',

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [libPath],
    extensions: ['', '.webpack.js', '.ts', '.js']
  },

  output: {
    libraryTarget: "commonjs2",
    library: "Shredder"
  },

  module: {
    loaders: [
      // all files with a `.ts` extension will be handled by `ts-loader`
      {
        test: /\.ts$/,
        exclude,
        loader: 'ts-loader'
      },

      // SCSS
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'autoprefixer',
          `sass?includePaths[]=${libPath}`
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
        test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
        loader: 'url?limit=5120&name=[path][name].[hash].[ext]'
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
        loader: 'url?limit=5120&name=[path][name].[hash].[ext]'
      },


    ]
  },

  // webpack dev server configuration
  devServer: {
    contentBase: "./lib",
    colors: true,
    noInfo: true,
    inline: true
  }

};

if (process.env.NODE_ENV === 'development') {
  config.devtool = '#inline-source-map';
}

module.exports = config;
