import React from 'react';
import assign from 'lodash/assign';
import API from 'api';

class UIState {
  constructor() {
    assign(this, {
      mimicEnabled: true,
      viewMode: 'closed',
      selectedRequestId: null,
      latestRequest: null,
      editorHeight: API.mode === 'remote' ? 'full' : 400
    });

    if (__ENV === 'development') {
      window.ui = this;
    }

    this.listeners = [];
  }

  update(delta) {
    assign(this, delta);
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

export const UIStateListener = (ComposedComponent) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      singleton.subscribe(this.rerender);
    }

    componentWillUnmount() {
      singleton.unsubscribe(this.rerender);
    }

    rerender = () => this.forceUpdate();

    render() {
      return <ComposedComponent { ...this.props }/>
    }
  }

  return Wrapper;
};

export default singleton;
