import React from 'react';

import STATUS_CODES from '../../../api/constants/status-codes';

export class StatusCodeField extends React.Component {

  static get propTypes() {
    return {
      readOnly: React.PropTypes.bool,
      value: React.PropTypes.string
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    }
  }

  _changeStatusCode(event) {
    const { value } = event.target;

    this.setState({ value });
  }

  _statusTextStyle() {
    return {
      color: '#A9A9A9',
      textTransform: 'lowercase'
    };
  }

  _input() {
    if (this.props.readOnly) {
      return this.state.value;
    }

    return (
      <input id="status-code"
             type="text"
             value={ this.state.value }
             onChange={ this._changeStatusCode.bind(this) }/>
    );
  }

  render() {
    return (
      <div>
        <label htmlFor="status-code">Status Code</label>

        { this._input() }

        <span style={ this._statusTextStyle() }>
          [{ STATUS_CODES[this.state.value] || 'unknown' }]
        </span>
      </div>
    );
  }

}
