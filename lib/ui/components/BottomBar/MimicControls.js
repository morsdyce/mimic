import React from 'react';
import styled from 'styled-components';
import UIState from 'ui/states/UIState';
import { connectToState } from 'ui/states/connector';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Control = styled.div`
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  height: ${(props) => props.borderless ? '24px' : '25px'};
  line-height: ${(props) => props.borderless ? '24px' : '25px'};
  border-top: ${(props) => props.borderless ? 'none' : props.theme.lightBorder};
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
             style={{ width: 48 }}
             borderless={ UIState.viewMode === 'closed' }
             active={ UIState.viewMode === 'requests' }>
      Log
    </Control>
    <Control onClick={ toggleMocks }
             style={{ width: 56 }}
             borderless={ UIState.viewMode === 'closed' }
             active={ UIState.viewMode === 'mocks' }>
      Mocks
    </Control>
  </Container>
);

export default connectToState(UIState, MimicControls);
