import React from 'react';

const METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
  'HEAD'
];

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
