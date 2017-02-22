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
  margin-right: 10px;
  cursor: pointer;
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

    <Action>
      Import & Export
    </Action>

    <Action>
      <Icon
        src={ helpIcon }
        alt="Help"/>
    </Action>

    <Action onClick={ toggleMimic }>
      <Icon
        src={ UIState.mimicEnabled ? mockedIcon : unmockedIcon }
        alt={ `Mimic is ${UIState.mimicEnabled ? 'on' : 'off'}` }/>

      Mimic — { UIState.mimicEnabled ? 'On' : 'Off' }
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
      <Icon src={ settingsIcon } alt="Settings"/>
    </Action>

    <Action>
      <Icon src={ closeIcon } onClick={ () => UIState.update({ viewMode: 'closed' }) }/>
    </Action>
  </MainActions>
);

export default UIStateListener(MainControls);
