import React from 'react';
import { DropTarget } from 'react-dnd';
import API from 'api';
import OutlineButton from 'ui/components/common/OutlineButton';
import Dropzone from 'ui/components/common/Dropzone';
import { GroupViewContainer, GroupViewContainerText, GroupViewTextContainer } from 'ui/components/Mocks/styled';
import { Div } from 'ui/components/common/base';
import DnD from 'ui/components/common/DnD';

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
  position: 'relative',
  height: '100%'
};

export class GroupView extends React.PureComponent {

  ungroupMocks = () => {
    const group = API.getGroup(this.props.id);

    if (group) {
      const firstMockId = (group.mocks[0] || {}).id;

      group.mocks.forEach((mock) => {
        API.updateMock(mock.id, { ...mock, groupId: null });
      });
      API.removeGroup(this.props.id);

      if (firstMockId) {
        this.props.select(API.getMock(firstMockId));
      } else {
        this.props.selectFirstMock();
      }
    }
  };

  render() {
    return (
      <DnD style={ styles } connect={ this.props.connectDropTarget }>
        { this.props.isHovered && <Dropzone/> }

        <GroupViewContainer>
          <Div>
            <OutlineButton onClick={ this.ungroupMocks }>Ungroup</OutlineButton>
            <GroupViewContainerText>these mocks</GroupViewContainerText>
          </Div>
          <GroupViewTextContainer>
            <GroupViewContainerText>Drag mocks from the left to add to this group</GroupViewContainerText>
          </GroupViewTextContainer>
        </GroupViewContainer>
      </DnD>
    );
  }
}

GroupView.propTypes = {
  selectFirstMock: React.PropTypes.func.isRequired
};

export default DropTarget('mock', groupTarget, collect)(GroupView);
