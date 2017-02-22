import React from 'react';
import styled from 'styled-components';
import API from 'api';

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
  font-size: 14px;
`;

const Text = styled.span`
  color: #858585;
`;

export class MultiSelectView extends React.Component {

  groupMocks = () => {
    const group = API.addGroup({ name: 'Grouped Mocks' });

    if (group) {
      this.props.selectedMocks.forEach((mock) => {
        if (mock.groupId) {
          API.mockRequest({ ...mock, groupId: group.id });
          return;
        }

        API.updateMock(mock.id, { ...mock, groupId: group.id })
      });
    }

    this.props.selectMock(group.mocks[0]);
  };

  render() {
    return (
      <Container>
        <div>
          <Button onClick={ this.groupMocks }>Group</Button>
          <Text>these mocks</Text>
        </div>
      </Container>
    );
  }

}

export default MultiSelectView;
