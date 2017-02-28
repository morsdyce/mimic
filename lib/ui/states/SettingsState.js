import React from 'react';
import API from 'api';

class SettingsState {

  mimicHotkey = 'Alt + M';
  alwaysShowMimicButtons = true;
  sendAnalytics = false;
  allowWipeout = false;
  exportFilename = 'mocks.json';
  prettifyExport = true;

  listeners = [];

  set(key, value) {
    this.settings[key] = value;
    this.triggerUpdates();
  }

  triggerUpdates() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter((cb) => cb !== callback);
  }
}

export default new SettingsState();
