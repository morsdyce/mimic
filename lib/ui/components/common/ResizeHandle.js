import React from 'react';
import styled from 'styled-components';
import UIState from 'ui/UIState';

const HorizontalHandle = styled.div`
  width: 100%;
  height: 4px;
  cursor: ns-resize;
  background-color: transparent;
`;

const VerticalHandle = styled.div`
  position: absolute;
  height: 100%;
  width: 3px;
  top: 0;
  right: 0;
  cursor: ew-resize;
  background-color: transparent;
`;

class ResizeHandle extends React.Component {

  initResize = (event) => {
    if (event.button !== 0) {
      // Disable resizing on right click
      return;
    }

    this.start = this.props.horizontal ? event.clientY : event.clientX;
    this.initialSize = this.props.horizontal ? UIState.editorHeight : UIState.mocksSidebarWidth;

    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
  };

  resize = (event) => {
    const delta = this.props.horizontal
      ? this.start - event.clientY
      : event.clientX - this.start;

    if (this.props.horizontal) {
      UIState.update({ editorHeight: this.initialSize + delta });
    }

    if (this.props.vertical) {
      UIState.update({ mocksSidebarWidth: this.initialSize + delta });
    }
  };

  stopResize = () => {
    document.removeEventListener('mousemove', this.resize, false);
    document.removeEventListener('mouseup', this.stopResize, false);
  };

  render() {
    let Handle;

    if (this.props.vertical) {
      Handle = VerticalHandle;
    }

    if (this.props.horizontal) {
      Handle = HorizontalHandle;
    }

    return (
      <Handle onMouseDown={ this.initResize }/>
    );
  }
}

export default ResizeHandle;