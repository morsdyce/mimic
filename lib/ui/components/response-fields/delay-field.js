import React from 'react';

export class DelayField extends React.Component {

  static get propTypes() {
    return {
      readOnly: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      value: React.PropTypes.number
    }
  }

  _changeDelay(event) {
    if (event.target.value < 0) {
      return;
    }

    this.props.onChange(event.target.value);
  }

  _input() {
    if (this.props.readOnly) {
      return this.props.value;
    }

    return (
      <input id="delay"
             type="number"
             min="0"
             value={ this.props.value }
             onChange={ this._changeDelay.bind(this) }/>
    );
  }

  render() {
    return (
      <div className="delay-field">
        <label htmlFor="delay">Delay</label>

        { this._input() }

        <span className="field-helper-text">ms</span>
      </div>
    );
  }

}
