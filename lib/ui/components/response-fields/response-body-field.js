import React from 'react';

export class ResponseBodyField extends React.Component {

  static get propTypes() {
    return {
      readOnly: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      value: React.PropTypes.string
    }
  }

  _changeResponseBody(event) {
    this.props.onChange(event.target.value);
  }

  _input() {
    if (this.props.readOnly) {
      return this.props.value;
    }

    return (
      <textarea id="response-body"
                type="text"
                value={ this.props.value }
                onChange={ this._changeResponseBody.bind(this) }>
      </textarea>
    );
  }

  render() {
    return (
      <details className="response-body-field">
        <summary>Response Body</summary>

        <div className="details-content">
          { this._input() }
        </div>
      </details>
    );
  }

}
