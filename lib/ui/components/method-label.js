import React from 'react';

import METHODS from 'api/constants/methods';

export class MethodLabel extends React.Component {

  static get propTypes() {
    return {
      method: React.PropTypes.oneOf(METHODS)
    }
  }

  _labelClassName() {
    return `method-label ${this.props.method}`;
  }


  render() {
    return <div className={ this._labelClassName() }>{ this.props.method }</div>;
  }
}
