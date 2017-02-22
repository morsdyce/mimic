import React from 'react';
import styled from 'styled-components';
import UIState from 'ui/UIState';

const ResizableBar = styled.div`
  width: 100%;
  height: 4px;
  cursor: ns-resize;
  background-color: transparent;
`;

class ResizeHandle extends React.Component {

  initResize = (event) => {
    this.startY = event.clientY;
    this.initialSize = UIState.editorHeight;

    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
  };

  resize = (event) => {
    const delta = this.startY - event.clientY;

    UIState.update({ editorHeight: this.initialSize + delta });
  };

  stopResize = () => {
    document.removeEventListener('mousemove', this.resize, false);
    document.removeEventListener('mouseup', this.stopResize, false);
  };

  render() {
    return (
      <ResizableBar onMouseDown={ this.initResize }/>
    );
  }
}

export default ResizeHandle;