import React from 'react';

export class ResponseBodyField extends React.Component {

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

  _changeResponseBody(event) {
    const { value } = event.target;

    this.setState({ value });
  }

  _input() {
    if (this.props.readOnly) {
      return this.state.value;
    }

    return (
      <textarea id="response-body"
                type="text"
                value={ this.state.value }
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
