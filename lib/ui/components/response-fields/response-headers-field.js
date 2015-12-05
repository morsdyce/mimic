import React from 'react';

export class ResponseHeadersField extends React.Component {

  static get propTypes() {
    return {
      readOnly: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      value: React.PropTypes.string
    }
  }

  _changeResponseHeaders(event) {
    this.props.onChange(event.target.value);
  }

  _input() {
    if (this.props.readOnly) {
      return this.props.value;
    }

    return (
      <textarea id="response-headers"
                type="text"
                value={ this.props.value }
                onChange={ this._changeResponseHeaders.bind(this) }>
      </textarea>
    );
  }

  render() {
    return (
      <details className="response-headers-field">
        <summary>Response Headers</summary>

        <div className="details-content">
          { this._input() }
        </div>
      </details>
    );
  }

}
