import React from 'react';
import styled from 'styled-components';
import UIState from 'ui/UIState';
import RequestLogState from 'ui/states/RequestLogState';

const MIN_HEIGHT = 400;
const MIN_SIDEBAR_WIDTH = 340;
const MAX_SIDEBAR_WIDTH = Math.round(window.innerWidth / 2);

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
  z-index: 2147483645;
`;

class ResizeHandle extends React.Component {

  initResize = (event) => {
    if (event.button !== 0) {
      // Disable resizing on right click
      return;
    }

    if (this.props.value === 'editorHeight') {
      this.start = event.clientY;
      this.initialSize = UIState.editorHeight;
    }

    if (this.props.value === 'mocksSidebarWidth') {
      this.start = event.clientX;
      this.initialSize = UIState.mocksSidebarWidth;
    }

    if (this.props.value.startsWith('logColumn')) {
      this.start = event.clientX;
      this.initialSize = RequestLogState.columns[this.props.value.replace('logColumns.', '')];
    }

    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
  };

  resize = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (this.props.value === 'editorHeight') {
      const delta = this.start - event.clientY;
      const newValue = this.initialSize + delta;

      if (newValue > MIN_HEIGHT) {
        UIState.update({ editorHeight: newValue });
      }
    }

    if (this.props.value === 'mocksSidebarWidth') {
      const delta = event.clientX - this.start;
      const newValue = this.initialSize + delta;

      if (newValue > MIN_SIDEBAR_WIDTH && newValue < MAX_SIDEBAR_WIDTH) {
        UIState.update({ mocksSidebarWidth: newValue });
      }
    }

    if (this.props.value.startsWith('logColumn')) {
      const columnName = this.props.value.split('.')[1];
      const delta = event.clientX - this.start;

      RequestLogState.resizeColumn(columnName, this.initialSize + delta);
    }
  };

  stopResize = () => {
    document.removeEventListener('mousemove', this.resize, false);
    document.removeEventListener('mouseup', this.stopResize, false);
  };

  render() {
    let Handle;

    if (this.props.value === 'editorHeight') {
      Handle = HorizontalHandle;
    }

    if (this.props.value === 'mocksSidebarWidth') {
      Handle = VerticalHandle;
    }

    if (this.props.value.startsWith('logColumn')) {
      Handle = VerticalHandle;
    }

    return (
      <Handle onMouseDown={ this.initResize } data-resize-handle/>
    );
  }
}

export default ResizeHandle;