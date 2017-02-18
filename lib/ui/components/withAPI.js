import React from 'react';

export const withAPI = (ComposedComponent) => {
  class WithAPI extends React.Component {
    render() {
      return <ComposedComponent { ...this.props } API={ this.context.API }/>
    }
  }

  WithAPI.contextTypes = {
    API: React.PropTypes.object
  };

  return WithAPI;
};

export default withAPI;
