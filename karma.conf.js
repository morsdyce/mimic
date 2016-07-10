'use strict';

const fs = require('fs');
const webpackConfig = require('./webpack.config');
const karmaWebpack  = require('karma-webpack');

const customLaunchers = {
  'SL_Chrome': {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  'SL_InternetExplorer': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '10'
  },
  'SL_FireFox': {
    base: 'SauceLabs',
    browserName: 'firefox',
  }
};

if(process.env.TRAVIS) {
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }
}

// Remove entry and output to allow testing
/* eslint-disable prefer-reflect */
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = (config) => {
  let configuration = {
    basePath: '',

    plugins: [
      karmaWebpack,
      'karma-jasmine',
      'karma-osx-reporter',
      'karma-clear-screen-reporter',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-sauce-launcher'
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

    reporters: ['osx', 'clear-screen', 'mocha', 'saucelabs'],

    sauceLabs: {
      testName: 'BDSM'
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  };

  if(process.env.TRAVIS) {
    configuration.browsers = Object.keys(customLaunchers);
  }

  config.set(configuration);
};
