import React from 'react';
import omit from 'lodash/omit';
import { getStyles, cssResetInput, cssResetCheckbox, cssResetRadio } from 'ui/utils/css';

export class InputControl extends React.Component {

  state = {
    hasFocus: false
  };

  onFocus = (event) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    this.setState({ hasFocus: true }, () => {
      this.setStyles(this.node);
    });
  };

  onBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    this.setState({ hasFocus: false }, () => {
      this.setStyles(this.node);
    });
  };

  setStyles = (node) => {
    if (!node) {
      return;
    }

    if (!this.node) {
      this.node = node;
    }

    let cssReset;

    switch (this.props.type) {
      case 'radio':
        cssReset = cssResetRadio;
        break;

      case 'checkbox':
        cssReset = cssResetCheckbox;
        break;

      default:
        cssReset = cssResetInput;
    }

    const overrides = this.state.hasFocus ? { ...this.props.style, ...this.props.focusStyle } : this.props.style;
    const stylesString = getStyles(cssReset, overrides);

    node.setAttribute('style', stylesString);

    if (this.props.inputRef) {
      this.props.inputRef(node);
    }
  };

  render() {
    return <input
      { ...omit(this.props, ['style', 'focusStyle', 'inputRef']) }
      ref={ this.setStyles }
      onFocus={ this.onFocus }
      onBlur={ this.onBlur }/>
  }

}

InputControl.propTypes = {
  style: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  inputRef: React.PropTypes.func
};

export default InputControl;
