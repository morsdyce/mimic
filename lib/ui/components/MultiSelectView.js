import React from 'react';
import styled from 'styled-components';
import OutlineButton from 'ui/components/styled/OutlineButton';
import API from 'api';
import UIState from 'ui/UIState';
import omit from 'lodash/omit';

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

export class MultiSelectView extends React.Component {

  groupMocks = () => {
    const group = API.addGroup({ name: 'Grouped Mocks' });

    if (group) {
      UIState.selectedMocks.forEach((mock) => {
        if (mock.groupId) {
          API.mockRequest({ ...omit(mock, ['id']), groupId: group.id });
          return;
        }

        API.updateMock(mock.id, { ...mock, groupId: group.id })
      });
    }

    this.props.selectMock(group.mocks[0]);

    const groups = UIState.groups.map((item) => {
      if (item.id === group.id) {
        return { ...item, isOpen: true }
      }

      return item;
    });

    UIState.update({ groups });
  };

  render() {
    return (
      <Container>
        <div>
          <OutlineButton onClick={ this.groupMocks }>Group</OutlineButton>
          <Text>these mocks</Text>
        </div>
      </Container>
    );
  }

}

export default MultiSelectView;
