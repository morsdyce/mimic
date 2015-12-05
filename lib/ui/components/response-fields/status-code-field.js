import React from 'react';

import STATUS_CODES from 'api/constants/status-codes';

export class StatusCodeField extends React.Component {

  static get propTypes() {
    return {
      readOnly: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      value: React.PropTypes.number
    }
  }

  _changeStatusCode(event) {
    const { value } = event.target;

    if (!Number(value) && value !== '') {
      return;
    }

    this.props.onChange(value);
  }

  _input() {
    if (this.props.readOnly) {
      return this.props.value;
    }

    return (
      <input id="status-code"
             type="text"
             value={ this.props.value }
             onChange={ this._changeStatusCode.bind(this) }/>
    );
  }

  render() {
    return (
      <div className="status-code-field">
        <label htmlFor="status-code">Status Code</label>

        { this._input() }

        <span className="field-helper-text">
          [{ STATUS_CODES[this.props.value] || 'unknown' }]
        </span>
      </div>
    );
  }

}
