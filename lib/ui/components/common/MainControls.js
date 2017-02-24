import React from 'react';
import styled from 'styled-components';
import API from 'api';
import Icon from 'ui/components/Icon';
import UIState, { UIStateListener } from 'ui/UIState';

const MainActions = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
`;

const TeamSync = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Action = styled.div`
  cursor: pointer;
  height: 25px;
  line-height: 31px;
  padding: 0 6px;
  background-color: ${(props) => props.isActive ? '#2d7bd1' : 'inherit'};
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
    <Action>
      <TeamSync>
        Team Sync <Icon src="pro"/>
      </TeamSync>
    </Action>

    <Action onClick={ () => window.open('https://mimic.js.org') }>
      <Icon src="help"/>
    </Action>

    <Action onClick={ () => UIState.update({ viewMode: 'settings' }) }
            isActive={ UIState.viewMode === 'settings' }>
      <Icon src="settings"/>
    </Action>

    <Action onClick={ toggleMimic }>
      <Icon src={ UIState.mimicEnabled ? 'mocked' : 'unmocked' }
            alt={ `Mimic is ${UIState.mimicEnabled ? 'on' : 'off'}` }/>

      <MimicStatus enabled={ UIState.mimicEnabled }>
        Mimic — { UIState.mimicEnabled ? 'On' : 'Off' }
      </MimicStatus>
    </Action>

    {
      API.mode !== 'remote' &&
      <Action>
        <Icon
          disabled={ UIState.editorHeight === 'half' }
          src="halfScreen"
          onClick={ () => UIState.update({ editorHeight: 'half' }) }/>
      </Action>
    }

    {
      API.mode !== 'remote' &&
      <Action>
        <Icon
          disabled={ UIState.editorHeight === 'full' }
          src="fullScreen"
          onClick={ () => UIState.update({ editorHeight: 'full' }) }/>
      </Action>
    }

    <Action>
      <Icon src="close" onClick={ () => UIState.update({ viewMode: 'closed' }) }/>
    </Action>
  </MainActions>
);

export default UIStateListener(MainControls);
