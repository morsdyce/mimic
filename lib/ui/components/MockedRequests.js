import React from 'react';
import styled from 'styled-components';
import mockedIcon from 'ui/assets/images/mocked@2x.png';
import unmockedIcon from 'ui/assets/images/unmocked@2x.png';

const List = styled.div`
`;

const Mock = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: ${(props) => props.isSelected ? '#cbddf5' : 'white'};
  
  &:hover {
    cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
    background-color: #cbddf5;
  }
`;

const Method = styled.div`
  font-size: 12px;
  min-width: 40px;
`;

const URL = styled.div`
  font-size: 12px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
  margin-right: 5px;
`;

class MockedRequests extends React.Component {
  toggleActive(mock) {
    return (event) => {
      event.stopPropagation();

      this.props.API.toggleMock(mock.id);
      this.forceUpdate();
    }
  }

  render() {
    return (
      <List>
        {
          this.props.API.mocks.map((mock) => (
            <Mock onClick={ () => this.props.selectMock(mock) }
                  isSelected={ mock === this.props.selectedMock }
                  onDoubleClick={ () => console.log('RENAME MOCK') }
                  onContextMenu={ () => console.log('CONTEXT MENU') }>
              <Icon
                src={ mock.active ? mockedIcon : unmockedIcon }
                alt={ mock.active ? 'Unmock' : 'Mock' }
                onClick={ this.toggleActive(mock) }/>
              <Method>{ mock.method }</Method>
              <URL>{ mock.url }</URL>
            </Mock>
          ))
        }
      </List>
    );
  }
}

export default MockedRequests;
