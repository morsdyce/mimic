import PropTypes from 'prop-types';
import React from 'react';
import { cssReset, getStyles } from 'ui/utils/css';

export class DnD extends React.Component {

  setStyles = (node) => {
    if (!node) {
      return;
    }

    if (this.props.returnNode) {
      this.props.returnNode(node);
    }

    const stylesString = getStyles(cssReset, this.props.style);

    node.setAttribute('style', stylesString);
  };

  render() {
    const { children, connect } = this.props;

    return connect(
      <div ref={ this.setStyles }>
        { children }
      </div>
    );
  }
}

DnD.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  returnNode: PropTypes.func
};

export default DnD;
