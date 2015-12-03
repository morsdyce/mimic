const webpackConfig = require('./webpack.config');
const karmaWebpack  = require('karma-webpack');

// Remove entry and output to allow testing
/* eslint-disable prefer-reflect */
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = (config) => {
  config.set({
    basePath: '',

    plugins: [
      karmaWebpack,
      'karma-jasmine',
      'karma-osx-reporter',
      'karma-clear-screen-reporter',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-sourcemap-loader'
    ],

    frameworks: ['jasmine'],

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    },

    files: [
      './lib/test.js'
    ],

    proxies: {
      '/assets': '/assets'
    },

    preprocessors: {
      './lib/test.js': ['webpack', 'sourcemap']
    },

    /* global global */
    exclude: [
      `${global.karmaBaseDirectory}/app/assets/**`,
      `${global.karmaBaseDirectory}/app/config/**`
    ],

    mochaReporter: {
      output: 'minimal'
    },

    reporters: ['osx', 'clear-screen', 'mocha'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
