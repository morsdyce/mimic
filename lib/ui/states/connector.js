import React from 'react';
import MocksState from 'ui/states/MocksState';

export const connectToState = (state, ComposedComponent) => {


  class Wrapper extends React.Component {
    componentDidMount() {
      console.log({ state, ComposedComponent });

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
