import React from 'react';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';
import API from 'api';
import UIState from 'ui/states/UIState';
import { connectToState } from 'ui/states/connector';
import MainControls from 'ui/components/BottomBar/MainControls';
import ResizeHandle from 'ui/components/common/ResizeHandle';
import Dropzone from 'ui/components/common/Dropzone';
import SettingsState from 'ui/states/SettingsState';
import { Div } from 'ui/components/common/base';
import DnD from 'ui/components/common/DnD';

const dropTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return;
    }

    try {
      const file = monitor.getItem().files[0];
      const reader = new FileReader();

      reader.onload = function handleFileUpload() {
        API.import(this.result, { mode: 'append' })
          .then((status) => {
            if (status.success) {
              UIState.setViewMode('mocks');
            } else {
              SettingsState.setError(status.error);
              UIState.setViewMode('settings');
            }
          });
      };

      reader.readAsText(file);
    } catch (error) {
      UIState.setViewMode('settings');
    }
  }
};

function collect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isHovered: monitor.isOver()
  };
}

const Container = styled(Div)`
  width: 100%;
  overflow: hidden;
  height: ${(props) => props.withFilters ? 'calc(100% - 54px)' : 'calc(100% - 30px)' };
  background-color: white;
  border-top: ${(props) => props.theme.lightBorder};
  bottom: ${(props) => props.withFilters ? '50px' : '25px' };
  z-index: 2147483645;
`;

const Actions = styled(Div)`
  display: flex;
  align-items: center;
  padding-left: 8px;
  position: relative;
  justify-content: flex-end;
`;

const Overlay = styled(Div)`
  position: absolute;
  top: 3px;
  bottom: 25px;
  width: 100%;
  background: transparent;
  z-index: 2147483646;
`;

const ControlBar = styled(Div)`
  display: flex;
  margin-left: 104px;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: ${(props) => props.theme.lightBorder};
  height: 24px;
  width: calc(100% - 104px);
  z-index: 2147483645;
`;

const FiltersBar = styled(Div)`
  display: flex;
  align-items: center;
  background: white;
  position: fixed;
  bottom: 25px;
  left: 0;
  border-top: ${(props) => props.theme.lightBorder};
  height: 24px;
  width: 100%;
`;

class Frame extends React.Component {

  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEscape);
    window.addEventListener('resize', UIState.adjustEditorHeightOnResize);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEscape);
    window.removeEventListener('resize', UIState.adjustEditorHeightOnResize);
  }

  closeOnEscape = (event) => {
    if (event.keyCode === 27) {
      UIState.setViewMode('closed');
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

    return (
      <DnD style={ style } connect={ this.props.connectDropTarget }>
        { this.props.isHovered && <Dropzone overlay>Drop file to import mocks</Dropzone> }

        <ResizeHandle value="editorHeight"/>

        <Container style={ !UIState.mimicEnabled ? disabledStyle : {} } withFilters={ !!this.props.filters }>
          { !UIState.mimicEnabled && <Overlay/> }

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
      </DnD>
    );
  }
}

export default DropTarget('__NATIVE_FILE__', dropTarget, collect)(connectToState(UIState, Frame));
