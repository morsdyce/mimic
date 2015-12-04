import React from 'react';

export class DelayField extends React.Component {

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

  _changeDelay(event) {
    let { value } = event.target;

    this.setState({ value });
  }

  _ensurePositiveValue() {
    if (this.state.value < 0) {
      this.setState({ value: 0 });
    }
  }

  _helperTextStyle() {
    return {
      color: '#A9A9A9'
    };
  }

  _input() {
    if (this.props.readOnly) {
      return this.state.value;
    }

    return (
      <input id="delay"
             type="number"
             min="0"
             value={ this.state.value }
             onChange={ this._changeDelay.bind(this) }
             onBlur={ this._ensurePositiveValue.bind(this) }/>
    );
  }

  render() {
    return (
      <div>
        <label htmlFor="delay">Delay</label>

        { this._input() }

        <span style={ this._helperTextStyle() }>ms</span>
      </div>
    );
  }

}
