const appSettings = require('application-settings');
global.appSettings = appSettings;

global.isNativeScript = true;

if (!global.WebSocket) {
  global.WebSocket = require('nativescript-websockets');
}

const remote = require('./dist/mimic.remote.js');
module.exports = remote;
