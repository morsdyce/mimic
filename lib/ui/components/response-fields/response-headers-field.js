import React from 'react';

export class ResponseHeadersField extends React.Component {

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

  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  }

  _changeResponseHeaders(event) {
    const { value } = event.target;

    this.setState({ value });
  }

  _input() {
    if (this.props.readOnly) {
      return this.state.value;
    }

    return (
      <textarea id="response-headers"
                type="text"
                value={ this.state.value }
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
