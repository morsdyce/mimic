import React from 'react';
import BaseState from 'ui/states/BaseState';

class SettingsState extends BaseState{

  mimicHotkey = 'Alt + M';
  alwaysShowMimicButtons = true;
  sendAnalytics = false;
  allowWipeout = false;
  exportFilename = 'mocks.json';
  prettifyExport = true;

  set(key, value) {
    this[key] = value;
    this.triggerUpdates();
  }
}

export default new SettingsState();
