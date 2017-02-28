import React from 'react';
import BaseState from 'ui/states/BaseState';

class QuickEditState extends BaseState {

  selectedRequestId = null;

  selectRequest(requestId) {
    this.selectedRequestId = requestId;
    this.triggerUpdates();
  }
}

export default new QuickEditState();
