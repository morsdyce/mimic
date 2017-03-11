import React from 'react';
import assign from 'lodash/assign';

const cssReset = {};

const DnD = ({ children, style, connect }) => connect(
  <div style={ assign({}, cssReset, style) }>
    { children }
  </div>
);

DnD.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

export default DnD;
