import React from 'react';
import styled from 'styled-components';
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

const Button = styled.button`
  border: 1px solid #a2bfe8;
  border-radius: 5px;
  background: transparent;
  padding: 3px;
  margin: 0 6px;
  outline: none;
  cursor: pointer;
  color: #4882d3;
  font-size: 13px;
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
            <Button onClick={ this.ungroupMocks }>Ungroup</Button>
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
