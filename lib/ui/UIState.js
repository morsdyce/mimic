import React from 'react';
import assign from 'lodash/assign';
import API from 'api';

class UIState {
  constructor() {
    assign(this, {
      mocksSidebarMenu: {
        visible: false,
        x: 0,
        y: 0
      },
      mimicEnabled: true,
      viewMode: 'closed',
      selectedRequestId: null,
      latestRequest: null,
      editorHeight: API.mode === 'remote' ? 'full' : 400,
      mocksSidebarWidth: 340,
      searchTerm: '',
      requestsQuery: '',
      selectedMocks: [],
      selectedGroup: null,
      groups: []
    });

    window.ui = this;

    this.listeners = [];
  }

  update(delta) {
    assign(this, delta);
    this.triggerUpdates();
  }

  expandAllGroups() {
    this.groups.forEach((group) => group.isOpen = true);
    this.triggerUpdates();
  }

  collapseAllGroups() {
    this.groups.forEach((group) => group.isOpen = false);
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

const singleton = new UIState();

if (__ENV === 'development') {
  window.UIState = singleton;
}

export const UIStateListener = (ComposedComponent) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      singleton.subscribe(this.rerender);
    }

    componentWillUnmount() {
      singleton.unsubscribe(this.rerender);
    }

    rerender = () => this.setState();

    render() {
      return <ComposedComponent { ...this.props }/>
    }
  }

  return Wrapper;
};

export default singleton;
