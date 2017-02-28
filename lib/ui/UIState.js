import React from 'react';
import API from 'api';

const MIN_HEIGHT = 400;

class UIState {

  mimicEnabled = true;
  viewMode = 'closed';
  latestRequest = null;
  editorHeight = API.mode === 'remote' ? window.innerHeight : 400;

  toggleMimic(newState) {
    this.mimicEnabled = newState;

    this.triggerUpdates();
  }

  setViewMode(viewMode) {
    this.viewMode = viewMode;

    this.triggerUpdates();
  }

  updateLatestRequest(latestRequest) {
    this.latestRequest = latestRequest;
  }

  setEditorHeight(editorHeight) {
    if (editorHeight <= MIN_HEIGHT) {
     return;
    }

    this.editorHeight = editorHeight;

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

export default new UIState();
