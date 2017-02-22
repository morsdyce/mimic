import React from 'react';
import assign from 'lodash/assign';

class UIState {
  constructor() {
    assign(this, {
      viewMode: 'closed',
      selectedRequestId: null,
      latestRequest: null,
      editorSize: null,
      searchTerm: '',
      selectedMocks: [],
      selectedGroup: null
    });

    this.listeners = [];
  }

  update(delta) {
    assign(this, delta);
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

    rerender = () => this.setState();

    render() {
      return <ComposedComponent { ...this.props }/>
    }
  }

  return Wrapper;
};

export default singleton;