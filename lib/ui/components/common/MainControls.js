import React from 'react';
import styled from 'styled-components';
import closeIcon from 'ui/assets/images/close@2x.png';
import settingsIcon from 'ui/assets/images/settings.svg';
import halfScreenIcon from 'ui/assets/images/half-screen.svg';
import fullScreenIcon from 'ui/assets/images/full-screen.svg';
import proIcon from 'ui/assets/images/pro@2x.png';
import helpIcon from 'ui/assets/images/help@2x.png';
import mockedIcon from 'ui/assets/images/mocked@2x.png';
import unmockedIcon from 'ui/assets/images/unmocked@2x.png';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';

const Icon = styled.img`
  height: 16px;
  user-select: none;
  display: inline-block;
`;

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
        Team Sync <Icon src={ proIcon }/>
      </TeamSync>
    </Action>

    <Action onClick={ () => window.open('https://mimic.js.org') }>
      <Icon
        src={ helpIcon }
        alt="Help"/>
    </Action>

    <Action onClick={ () => UIState.update({ viewMode: 'settings' }) }
            isActive={ UIState.viewMode === 'settings' }>
      <Icon src={ settingsIcon } alt="Settings"/>
    </Action>

    <Action onClick={ toggleMimic }>
      <Icon
        src={ UIState.mimicEnabled ? mockedIcon : unmockedIcon }
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
          src={ halfScreenIcon }
          alt="Half Screen"
          onClick={ () => UIState.update({ editorHeight: 'half' }) }/>
      </Action>
    }

    {
      API.mode !== 'remote' &&
      <Action>
        <Icon
          disabled={ UIState.editorHeight === 'full' }
          src={ fullScreenIcon }
          alt="Full Screen"
          onClick={ () => UIState.update({ editorHeight: 'full' }) }/>
      </Action>
    }

    <Action>
      <Icon src={ closeIcon } onClick={ () => UIState.update({ viewMode: 'closed' }) }/>
    </Action>
  </MainActions>
);

export default UIStateListener(MainControls);
