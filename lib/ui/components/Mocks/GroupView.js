import React from 'react';
import { DropTarget } from 'react-dnd';
import API from 'api';
import MocksState from 'ui/states/MocksState';
import OutlineButton from 'ui/components/common/OutlineButton';
import { GroupViewContainer, GroupViewContainerText, GroupViewTextContainer } from 'ui/components/Mocks/styled';

const groupTarget = {
  drop(props, monitor) {
    const mockId = monitor.getItem().id;
    const mock = API.getMock(mockId);

    if (mock) {
      API.updateMock(mockId, { ...mock, groupId: props.id });
    }
  }
};

function collect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isHovered: monitor.isOver()
  };
}

const styles = {
  height: '100%'
};

export class GroupView extends React.Component {

  ungroupMocks = () => {
    const group = API.getGroup(this.props.id);

    if (group) {
      const firstMockId = group.mocks[0].id;

      group.mocks.forEach((mock) => {
        API.updateMock(mock.id, { ...mock, groupId: null });
      });
      API.removeGroup(this.props.id);

      if (firstMockId) {
        this.props.select(API.getMock(firstMockId));
      } else {
        MocksState.selectFirstMock();
      }
    }
  };

  render() {
    return this.props.connectDropTarget(
      <div style={ styles }>
        <GroupViewContainer>
          <div>
            <OutlineButton onClick={ this.ungroupMocks }>Ungroup</OutlineButton>
            <GroupViewContainerText>these mocks</GroupViewContainerText>
          </div>
          <GroupViewTextContainer>
            <GroupViewContainerText>Drag mocks from the left to add to this group</GroupViewContainerText>
          </GroupViewTextContainer>
        </GroupViewContainer>
      </div>
    );
  }
}

export default DropTarget('mock', groupTarget, collect)(GroupView);
