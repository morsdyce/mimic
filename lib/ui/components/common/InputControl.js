import React from 'react';
import { getStyles, cssResetInput, cssResetCheckbox, cssResetRadio } from 'ui/utils/css';

export class InputControl extends React.Component {

  setStyles = (node) => {
    if (!node) {
      return;
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

    const stylesString = getStyles(cssReset, this.props.style);

    node.setAttribute('style', stylesString);

    if (this.props.inputRef) {
      this.props.inputRef(node);
    }
  };

  render() {
    return <input { ...this.props } ref={ this.setStyles }/>
  }

}

InputControl.propTypes = {
  style: React.PropTypes.object,
  inputRef: React.PropTypes.func
};

export default InputControl;
