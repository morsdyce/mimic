import React from 'react';

export class MimicProvider extends React.Component {

  getChildContext() {
    return { API: this.props.API };
  }

  render() {
    return this.props.children;
  }

}

MimicProvider.childContextTypes = {
  API: React.PropTypes.object
};

export default MimicProvider;
