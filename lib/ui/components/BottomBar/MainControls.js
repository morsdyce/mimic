import React from 'react';
import styled from 'styled-components';
import API from 'api';
import UIState from 'ui/states/UIState';
import { connectToState } from 'ui/states/connector';
import ActionIcon from 'ui/components/common/ActionIcon';
import MasterToggle from 'ui/components/BottomBar/MasterToggle';
import FrameHeightToggle from 'ui/components/BottomBar/FrameHeightToggle';

const MainActions = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const Action = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 24px;
  padding: 0 6px;
  user-select: none;
  background-color: ${(props) => props.isActive ? props.theme.blue : 'inherit'};
  
  ${(props) => props.isInactive ? 'background-color: #e5e5e5;' : ''}
`;

export const MainControls = ({ closeFullEditor }) => (
  <MainActions>
    <Action onClick={ () => window.open('https://mimic.js.org') }>
      <ActionIcon action="help"/>
    </Action>

    <Action onClick={ () => UIState.setViewMode('settings') }
            isActive={ UIState.viewMode === 'settings' }>
      <ActionIcon action="settings" active={ UIState.viewMode === 'settings' }/>
    </Action>

    <MasterToggle/>

    { API.mode !== 'remote' && <FrameHeightToggle/> }

    <Action>
      <ActionIcon action="close" onClick={ () => UIState.setViewMode('closed') }/>
    </Action>
  </MainActions>
);

export default connectToState(UIState, MainControls);
