import React from 'react';
import styled from 'styled-components';
import UIState, { UIStateListener } from 'ui/UIState';

const Container = styled.div`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  font-size: 13px;
  line-height: 20px;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #d8d8d8;
  height: 24px;
  ${(props) => props.fullWidth ? 'width: 100%;' : '' }
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 24px;
  border-right: 1px solid #d8d8d8;
  cursor: pointer;
  background-color: ${(props) => props.active ? '#427dd2' : '#f7f7f7' };
  ${(props) => props.active ? 'color: #fff;' : ''}
  
  &:hover {
    background-color: #c8dcf4;
  }
`;

export const MimicControls = ({ showLogs,  showMocks, fullWidth, children }) => (
  <Container fullWidth={ fullWidth }>
    <Control onClick={ () => UIState.update({ viewMode: 'requests' }) }
             active={ UIState.viewMode === 'requests' }>
      Logs
    </Control>
    <Control onClick={ () => UIState.update({ viewMode: 'mocks' }) }
             active={ UIState.viewMode === 'mocks' }>
      Mocks
    </Control>
    { children }
  </Container>
);

export default UIStateListener(MimicControls);
