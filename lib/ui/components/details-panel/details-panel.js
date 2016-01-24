import React from 'react';
import cx from 'classnames';

export class DetailsPanel extends React.Component {

  render() {
    return <div className={ cx("details-panel", { expanded: this.props.expanded }) }>
      { this.props.children }
    </div>;
  }

}
