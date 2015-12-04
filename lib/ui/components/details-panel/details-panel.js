import React from 'react';

export class DetailsPanel extends React.Component {

  render() {
    return <div className="details-panel">{ this.props.children }</div>;
  }

}
