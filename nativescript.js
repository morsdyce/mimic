require(__dirname + '/polyfills/fetch');

const appSettings = require('application-settings');
global.appSettings = appSettings;

global.isNativeScript = true;

const remote = require('./dist/mimic.remote.js');
module.exports = remote;
