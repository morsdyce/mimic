import React from 'react';
import styled from 'styled-components';
import API from 'api';
import Icon from 'ui/components/Icon';
import UIState, { UIStateListener } from 'ui/UIState';

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
  background-color: ${(props) => props.isActive ? '#2d7bd1' : 'inherit'};
  
  ${(props) => props.isInactive ? 'background-color: #e5e5e5;' : ''}
`;

const MimicStatus = styled.div`
  color: ${(props) => props.enabled ? '#2d7bd1' : 'black'};
  display: inline-block;
`;

const toggleMimic = () => {
  if (API.enabled) {
    API.turnOff();
  } else {
    API.turnOn();
  }

  UIState.update({ mimicEnabled: API.enabled });
};

export const MainControls = ({ closeFullEditor }) => (
  <MainActions>
    <TeamSync>
      Team Sync <Icon style={{ marginLeft: 5 }} src="pro"/>
    </TeamSync>

    <Action onClick={ () => window.open('https://mimic.js.org') }>
      <Icon style={{ verticalAlign: 'sub' }} src="help"/>
    </Action>

    <Action onClick={ () => UIState.update({ viewMode: 'settings' }) }
            isActive={ UIState.viewMode === 'settings' }>
      <Icon style={{ verticalAlign: 'sub' }} src="settings"/>
    </Action>

    <Action onClick={ toggleMimic } isInactive={ !UIState.mimicEnabled }>
      <Icon src={ UIState.mimicEnabled ? 'mocked' : 'unmocked' }
            style={{ verticalAlign: 'sub', marginRight: 5 }}
            alt={ `Mimic is ${UIState.mimicEnabled ? 'on' : 'off'}` }/>

      <MimicStatus enabled={ UIState.mimicEnabled }>
        Mimic — { UIState.mimicEnabled ? 'On' : 'Off' }
      </MimicStatus>
    </Action>

    {
      API.mode !== 'remote' &&
      <Action>
        <Icon style={{ verticalAlign: 'sub' }}
              disabled={ UIState.editorHeight === 400 }
              src="halfScreen"
              onClick={ () => UIState.update({ editorHeight: 400 }) }/>
      </Action>
    }

    {
      API.mode !== 'remote' &&
      <Action>
        <Icon style={{ verticalAlign: 'sub' }}
              disabled={ UIState.editorHeight === window.innerHeight }
              src="fullScreen"
              onClick={ () => UIState.update({ editorHeight: window.innerHeight }) }/>
      </Action>
    }

    <Action>
      <Icon style={{ verticalAlign: 'sub', marginLeft: 10 }}
            src="close"
            onClick={ () => UIState.update({ viewMode: 'closed' }) }/>
    </Action>
  </MainActions>
);

export default UIStateListener(MainControls);
