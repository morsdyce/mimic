import React from 'react';
import OutlineButton from 'ui/components/common/OutlineButton';
import API from 'api';
import UIState from 'ui/UIState';
import omit from 'lodash/omit';
import { Group } from 'api/models/group';
import { MultiSelectContainer, MultiSelectContainerText } from 'ui/components/Mocks/styled';

export class MultiSelectView extends React.Component {

  groupMocks = () => {
    const group = API.addGroup({ name: 'Grouped Mocks' });

    if (group) {
      UIState.selectedItems.forEach((item) => {
        if (item instanceof Group) {
          return;
        }

        if (item.groupId) {
          API.mockRequest({ ...omit(item, ['id']), groupId: group.id });
          return;
        }

        API.updateMock(item.id, { ...item, groupId: group.id })
      });
    }

    const groups = [
      ...UIState.groups,
      {
        id: group.id,
        isOpen: true,
        lastState: null
      }
    ];

    const firstMock = group.mocks[0];
    UIState.update({ groups, selectedItems: [firstMock] });
  };

  render() {
    return (
      <MultiSelectContainer>
        <div>
          <OutlineButton onClick={ this.groupMocks }>Group</OutlineButton>
          <MultiSelectContainerText>these mocks</MultiSelectContainerText>
        </div>
      </MultiSelectContainer>
    );
  }

}

export default MultiSelectView;
