import React from 'react';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import MainControls from 'ui/components/MainControls';
import ResizeHandle from 'ui/components/ResizeHandle';

const dropTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return;
    }

    const file = monitor.getItem().files[0];
    const reader = new FileReader();

    reader.onload = function handleFileUpload() {
      API.import(this.result);
      UIState.triggerUpdates()
    };

    reader.readAsText(file);
  }
};

function collect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isHovered: monitor.isOver()
  };
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  height: ${(props) => props.withFilters ? 'calc(100% - 50px)' : '100%' };
  font-size: 13px;
  line-height: 20px;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  background-color: white;
  border-top: 1px solid #e7e7e7;
  bottom: ${(props) => props.withFilters ? '50px' : '25px' };
  z-index: 2147483645;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  padding-left: 8px;
  position: relative;
  justify-content: flex-end;
`;

const Overlay = styled.div`
  position: absolute;
  top: 3px;
  bottom: 25px;
  width: 100%;
  background: transparent;
  z-index: 2147483646;
`;

const ControlBar = styled.div`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  font-size: 13px;
  line-height: 20px;
  margin-left: 104px;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #d8d8d8;
  height: 24px;
  width: calc(100% - 104px);
`;

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  font-size: 13px;
  line-height: 20px;
  background: white;
  position: fixed;
  bottom: 25px;
  left: 0;
  border-top: 1px solid #d8d8d8;
  height: 24px;
  width: 100%;
`;

const Dropzone = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 3px;
  bottom: 25px;
  width: 100%;
  background: rgba(255, 255, 255, 0.75);
  z-index: 2147483646;
`;

class Frame extends React.Component {

  componentDidMount() {
    window.addEventListener('keyup', this.closeOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeOnEscape);
  }

  closeOnEscape = (event) => {
    if (event.keyCode === 27) {
      UIState.update({ viewMode: 'closed' });
    }
  };

  render() {
    const style = {
      width: '100%',
      height: UIState.editorHeight
    };

    const disabledStyle = {
      filter: 'grayscale(100%)',
      opacity: 0.25
    };

    const disabledState = !UIState.mimicEnabled && UIState.viewMode !== 'settings';

    return this.props.connectDropTarget(
      <div style={ style }>
        { this.props.isHovered && <Dropzone>Drop here to import</Dropzone> }

        <ResizeHandle value="editorHeight"/>

        <Container style={ disabledState ? disabledStyle : {} } withFilters={ !!this.props.filters }>
          { disabledState && <Overlay/> }

          { this.props.children }
        </Container>

        {
          this.props.filters && <FiltersBar>{ this.props.filters }</FiltersBar>
        }

        <ControlBar>
          {
            UIState.mimicEnabled &&
            <Actions>
              { this.props.controls }
            </Actions>
          }

          <MainControls/>
        </ControlBar>
      </div>
    );
  }
}

export default DropTarget('__NATIVE_FILE__', dropTarget, collect)(UIStateListener(Frame));
