import React from 'react';
import { connect } from 'react-redux';

export const MainPanel = ({ component, props }) => {
  const ComponentToRender = require(`ui/components/${component}`).default;

  return (
    <div>
      <ComponentToRender { ...props } />
    </div>
  );
};

const mapStateToProps = (state) => ({ component: state.location.component, props: state.location.props });

export default connect(mapStateToProps, null)(MainPanel);
