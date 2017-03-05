import React from 'react';
import styled from 'styled-components';
import API from 'api';
import UIState from 'ui/states/UIState';
import Icon from 'ui/components/common/Icon';

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 24px;
  padding: 0 6px;
  user-select: none;
  width: 110px;
  background-color: ${(props) => props.isInactive ? '#e5e5e5' : 'white'};
`;

const MimicStatus = styled.div`
  font-weight: 600;
  color: ${(props) => props.enabled ? props.theme.blue : 'black'};
`;

const toggleMimic = () => {
  if (API.enabled) {
    API.turnOff();
  } else {
    API.turnOn();
  }

  UIState.toggleMimic(API.enabled);
};

const MasterToggle = () => (
  <Container onClick={ toggleMimic } isInactive={ !UIState.mimicEnabled }>

    {
      UIState.mimicEnabled &&
      <Icon src="mocked"
            style={{ marginRight: 5, fill: '#4b82d5' }}
            alt="Mimic is on"/>
    }

    {
      !UIState.mimicEnabled &&
      <Icon src="unmocked"
            style={{ marginRight: 5, fill: '#f0f0f0' }}
            alt="Mimic is off"/>
    }

    <MimicStatus enabled={ UIState.mimicEnabled }>
      Mimic { UIState.mimicEnabled ? 'On' : 'Off' }
    </MimicStatus>
  </Container>
);

export default MasterToggle;
