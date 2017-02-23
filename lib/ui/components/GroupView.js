import React from 'react';
import styled from 'styled-components';
import OutlineButton from 'ui/components/styled/OutlineButton';
import { DropTarget } from 'react-dnd';
import API from 'api';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Text = styled.span`
  color: #858585;
`;

const TextContainer = styled.div`
  margin-top: 40px;
`;

const styles = {
  height: '100%'
};

export class GroupView extends React.Component {

  ungroupMocks = () => {
    const group = API.getGroup(this.props.id);

    if (group) {
      API.removeGroup(this.props.id);
      this.props.clearSelection();
    }
  };

  render() {
    return this.props.connectDropTarget(
      <div style={ styles }>
        <Container>
          <div>
            <OutlineButton onClick={ this.ungroupMocks }>Ungroup</OutlineButton>
            <Text>these mocks</Text>
          </div>
          <TextContainer>
            <Text>Drag mocks from the left to add to this group</Text>
          </TextContainer>
        </Container>
      </div>
    );
  }
}

export default DropTarget('mock', groupTarget, collect)(GroupView);
