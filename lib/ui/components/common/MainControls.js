import React from 'react';
import styled from 'styled-components';
import API from 'api';
import UIState from 'ui/states/UIState';
import { connectToState } from 'ui/states/connector';
import Icon from 'ui/components/common/Icon';

const MainActions = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const TeamSync = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b5b5b5;
  margin-right: 20px;
  user-select: none;
`;

const Action = styled.div`
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  padding: 0 6px;
  user-select: none;
  background-color: ${(props) => props.isActive ? props.theme.blue : 'inherit'};
  
  ${(props) => props.isInactive ? 'background-color: #e5e5e5;' : ''}
`;

const MimicStatus = styled.div`
  font-weight: 600;
  color: ${(props) => props.enabled ? props.theme.blue : 'black'};
  display: inline-block;
`;

const toggleMimic = () => {
  if (API.enabled) {
    API.turnOff();
  } else {
    API.turnOn();
  }

  UIState.toggleMimic(API.enabled);
};

export const MainControls = ({ closeFullEditor }) => (
  <MainActions>
    <TeamSync>
      Team Sync <Icon style={{ marginLeft: 5 }} src="pro"/>
    </TeamSync>

    <Action onClick={ () => window.open('https://mimic.js.org') }>
      <Icon style={{ verticalAlign: 'sub' }} src="help"/>
    </Action>

    <Action onClick={ () => UIState.setViewMode('settings') }
            isActive={ UIState.viewMode === 'settings' }>
      <Icon style={{ verticalAlign: 'sub', fill: UIState.viewMode === 'settings' ? 'white' : 'black' }} src="settings"/>
    </Action>

    <Action onClick={ toggleMimic } isInactive={ !UIState.mimicEnabled } style={{ width: 90 }}>
      <Icon src={ UIState.mimicEnabled ? 'mocked' : 'unmocked' }
            style={{ verticalAlign: 'sub', marginRight: 5, fill: UIState.mimicEnabled ? '#4b82d5' : '#f0f0f0' }}
            alt={ `Mimic is ${UIState.mimicEnabled ? 'on' : 'off'}` }/>

      <MimicStatus enabled={ UIState.mimicEnabled }>
        Mimic { UIState.mimicEnabled ? 'On' : 'Off' }
      </MimicStatus>
    </Action>

    {
      API.mode !== 'remote' &&
      <Action>
        {
          UIState.editorHeight < (window.innerHeight - 50) &&
          <Icon style={{ verticalAlign: 'sub' }}
                src="fullScreen"
                onClick={ () => UIState.setEditorHeight(window.innerHeight) }/>
        }

        {
          UIState.editorHeight >= (window.innerHeight - 50) &&
          <Icon style={{ verticalAlign: 'sub' }}
                src="halfScreen"
                onClick={ () => UIState.setEditorHeight(400) }/>
        }
      </Action>
    }

    <Action>
      <Icon style={{ verticalAlign: 'sub' }}
            src="close"
            onClick={ () => UIState.setViewMode('closed') }/>
    </Action>
  </MainActions>
);

export default connectToState(UIState, MainControls);
