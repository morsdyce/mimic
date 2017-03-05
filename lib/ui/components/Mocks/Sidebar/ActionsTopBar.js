import React from 'react';
import API from 'api';
import MocksState from 'ui/states/MocksState';
import Icon from 'ui/components/common/Icon';
import ActionIcon from 'ui/components/common/ActionIcon';
import IconDropdown from 'ui/components/common/IconDropdown';
import { ActionGroup, ActionsContainer, Action } from 'ui/components/Mocks/Sidebar/styled';

const toggleRecording = () => {
  if (API.isRecording) {
    API.stopRecording();
  } else {
    API.startRecording();
  }
};

const addNew = (type) => {
  if (type === 'mock') {
    const newMock = API.addMock();

    MocksState.selectItems([newMock]);
  }

  if (type === 'group') {
    const newGroup = API.addGroup({ name: 'New Group' });

    MocksState.addGroup({
      id: newGroup.id,
      isOpen: false,
      lastState: null
    });

    MocksState.selectItems([newGroup]);
  }
};

const ActionsTopBar = ({ hasSelection }) => (
  <ActionsContainer>
    <ActionGroup marginRight="40">
      <Action>
        <IconDropdown icon="add"
                      options={ ['mock', 'group'] }
                      onChange={ addNew }/>
      </Action>
      <Action onClick={ toggleRecording } margin="2">
        {
          API.isRecording
            ? <Icon src="recording" style={{ fill: '#c44a13' }}/>
            : <ActionIcon action="record"/>
        }
      </Action>
    </ActionGroup>

    <ActionGroup autosize>
      <Action onClick={ MocksState.collapseAllGroups }>
        <ActionIcon action="collapseAll" disabled={ !API.groups.length }/>
      </Action>
      <Action onClick={ MocksState.expandAllGroups }>
        <ActionIcon action="expandAll" disabled={ !API.groups.length }/>
      </Action>
    </ActionGroup>

    <ActionGroup>
      <Action>
        <ActionIcon action="undo"/>
      </Action>
      <Action onClick={ MocksState.deleteSelected } disabled={ !hasSelection }>
        <ActionIcon action="remove" disabled={ !hasSelection }/>
      </Action>
    </ActionGroup>
  </ActionsContainer>
);

export default ActionsTopBar;
