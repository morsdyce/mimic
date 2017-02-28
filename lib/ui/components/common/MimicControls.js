import React from 'react';
import styled from 'styled-components';
import UIState, { connectToState } from 'ui/UIState';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Control = styled.div`
  display: inline-block;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-top: ${(props) => props.borderless ? 'none' : props.theme.lightBorder};
  border-right: ${(props) => props.borderless ? 'none' : props.theme.lightBorder};
  background-color: ${(props) => props.active ? '#427dd2' : '#f7f7f7' };
  color: ${(props) => props.active ? 'white' : 'black' };
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.active ? '#427dd2' : '#c8dcf4' };
  }
`;

const toggleRequests = () =>
  UIState.setViewMode(UIState.viewMode === 'requests' ? 'closed' : 'requests');

const toggleMocks = () =>
  UIState.setViewMode(UIState.viewMode === 'mocks' ? 'closed' : 'mocks');

export const MimicControls = () => (
  <Container>
    <Control onClick={ toggleRequests }
             borderless={ UIState.viewMode === 'closed' }
             active={ UIState.viewMode === 'requests' }>
      Logs
    </Control>
    <Control onClick={ toggleMocks }
             borderless={ UIState.viewMode === 'closed' }
             active={ UIState.viewMode === 'mocks' }>
      Mocks
    </Control>
  </Container>
);

export default connectToState(UIState, MimicControls);
