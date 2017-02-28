import React from 'react';

class RequestLogState {

  columns = {
    time: 60,
    url: 200,
    params: 160,
    status: 40,
    delay: 40
  };

  query = '';
  filter = 'All';

  listeners = [];

  resizeColumn(name, size) {
    if (size < 10) {
      return;
    }

    this.columns[name] = size;

    this.triggerUpdates();
  }

  updateQuery(query) {
    this.query = query;

    this.triggerUpdates();
  }

  updateFilter(filter) {
    this.filter = filter;

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

export default new RequestLogState();
