import React from 'react';

class QuickEditState {

  selectedRequestId = null;

  listeners = [];

  selectRequest(requestId) {
    this.selectedRequestId = requestId;
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

export default new QuickEditState();
