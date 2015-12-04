import React from 'react';

import STATUS_CODES from 'api/constants/status-codes';

export class StatusCodeField extends React.Component {

  static get propTypes() {
    return {
      readOnly: React.PropTypes.bool,
      value: React.PropTypes.number
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  }

  _changeStatusCode(event) {
    const { value } = event.target;

    this.setState({ value });
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

        <span className="field-helper-text">
          [{ STATUS_CODES[this.state.value] || 'unknown' }]
        </span>
      </div>
    );
  }

}
