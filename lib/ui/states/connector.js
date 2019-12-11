import React from 'react';

export const connectToState = (state, ComposedComponent) => {

  class Wrapper extends React.Component {
    componentDidMount() {
      this._mounted = true;
      state.subscribe(this.rerender);
    }

    componentWillUnmount() {
      this._mounted = false;
      state.unsubscribe(this.rerender);
    }

    rerender = () => {
      if (this._mounted) {
        this.forceUpdate();
      }
    };

    render() {
      return <ComposedComponent { ...this.props }/>
    }
  }

  return Wrapper;
};
