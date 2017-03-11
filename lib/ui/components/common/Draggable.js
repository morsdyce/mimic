import React from 'react';

export class Draggable extends React.Component {
  render() {
    return (
      <div
        style={ this.props.style }
        ref={ element => {
        if (element) {
          console.log(element, this.props.connectDropTarget);
          this.props.connectDropTarget(element);
        }
      } }>{ this.props.children }</div>
    );
  }
}

Draggable.propTypes = {
  children: React.PropTypes.node,
  connectDropTarget: React.PropTypes.func,
  style: React.PropTypes.object
};

export default Draggable;
