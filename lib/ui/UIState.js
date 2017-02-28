import React from 'react';
import API from 'api';

const MIN_HEIGHT = 400;

class UIState {

  mimicEnabled = true;
  viewMode = 'closed';
  selectedRequestId = null;
  latestRequest = null;
  editorHeight = API.mode === 'remote' ? window.innerHeight : 400;

  toggleMimic() {
    this.mimicEnabled = !this.mimicEnabled;

    this.triggerUpdates();
  }

  setViewMode(viewMode) {
    this.viewMode = viewMode;

    this.triggerUpdates();
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

export const connectToState = (state, ComposedComponent) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      state.subscribe(this.rerender);
    }

    componentWillUnmount() {
      state.unsubscribe(this.rerender);
    }

    rerender = () => this.forceUpdate();

    render() {
      return <ComposedComponent { ...this.props }/>
    }
  }

  return Wrapper;
};
