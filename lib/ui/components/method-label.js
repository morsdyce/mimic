import React from 'react';

const METHOD_COLORS = {
  GET: '#03C853',
  POST: '#E87F00',
  PUT: '#129DDF',
  PATCH: '#895300',
  DELETE: '#EE3B3B',
  OPTIONS: '#AC5CE2',
  HEAD: '#A7A7A7'
};

export class MethodLabel extends React.Component {

  static get propTypes() {
    return {
      method: React.PropTypes.oneOf(Object.keys(METHOD_COLORS))
    }
  }

  _labelStyle() {
    return {
      color: METHOD_COLORS[this.props.method]
    };
  }

  render() {
    return <div style={ this._labelStyle() }>{ this.props.method }</div>;
  }
}
