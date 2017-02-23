import React from 'react';
import styled from 'styled-components';
import { getWindowSize } from 'ui/utils/measurements';
import UIState, { UIStateListener } from 'ui/UIState';
import MimicControls from 'ui/components/MimicControls';
import MainControls from 'ui/components/common/MainControls';
import ResizeHandle from 'ui/components/common/ResizeHandle';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 51px);
  font-size: 13px;
  line-height: 20px;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  background-color: white;
  border-top: 1px solid #e7e7e7;
  bottom: 51px;
  z-index: 90000000000;
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
  top: 0;
  bottom: 0;
  width: 100%;
  background: transparent;
  z-index: 90000000001;
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
      height: getWindowSize(UIState.editorHeight)
    };

    const disabledStyle = {
      filter: 'grayscale(100%)',
      opacity: 0.25
    };

    return (
      <div style={ style }>
        <ResizeHandle horizontal/>

        <Container style={ !UIState.mimicEnabled && disabledStyle }>
          { !UIState.mimicEnabled && <Overlay/> }

          { this.props.children }
        </Container>

        <MimicControls fullWidth>
          {
            UIState.mimicEnabled &&
            <Actions>
              { this.props.controls }
            </Actions>
          }

          <MainControls/>
        </MimicControls>
      </div>
    );
  }
}

export default UIStateListener(Frame);