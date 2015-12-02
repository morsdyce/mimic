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
      value: this.props.value,
      inputVisible: true
    }
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

  _toggleInput() {
    this.setState({ inputVisible: !this.state.inputVisible });
  }

  render() {
    return (
      <div>
        <label htmlFor="response-body">Response Body</label>

        <button onClick={ this._toggleInput.bind(this) }>
          { this.state.inputVisible ? 'Hide' : 'Show' }
        </button>

        { this.state.inputVisible ? this._input() : null }
      </div>
    );
  }

}
