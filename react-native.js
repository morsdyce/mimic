const AsyncStorage = require('react-native').AsyncStorage;
global.AsyncStorage = AsyncStorage;

global.isReactNative = true;

const remote = require('./dist/mimic.remote.js');
module.exports = remote;
