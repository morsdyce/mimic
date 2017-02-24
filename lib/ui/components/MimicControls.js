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
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 24px;
  border-right: 1px solid #d8d8d8;
  cursor: pointer;
  background-color: ${(props) => props.active ? '#427dd2' : '#f7f7f7' };
  color: ${(props) => props.active ? 'white' : 'black' };
  user-select: none;

  &:hover {
    background-color: ${(props) => props.active ? '#427dd2' : '#e0dcdc' };
  }
`;

const toggleRequests = () =>
  UIState.update({ viewMode: UIState.viewMode === 'requests' ? 'closed' : 'requests' });

const toggleMocks = () =>
  UIState.update({ viewMode: UIState.viewMode === 'mocks' ? 'closed' : 'mocks' });

export const MimicControls = () => (
  <Container>
    <Control onClick={ toggleRequests } active={ UIState.viewMode === 'requests' }>
      Logs
    </Control>
    <Control onClick={ toggleMocks } active={ UIState.viewMode === 'mocks' }>
      Mocks
    </Control>
  </Container>
);

export default UIStateListener(MimicControls);
