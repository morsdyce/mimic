import React from 'react';
import styled from 'styled-components';
import MethodLabel from 'ui/components/styled/MethodLabel';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import mockedIcon from 'ui/assets/images/mocked@2x.png';
import unmockedIcon from 'ui/assets/images/unmocked@2x.png';
import { getHighlightedText } from 'ui/utils/string';
import { DragSource } from 'react-dnd';

const mockSource = {
  beginDrag(props) {
    return {
      id: props.mock.id
    };
  }
};

function collect(connect) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: ${(props) => props.isSelected ? '#cbddf5' : 'white'};

  &:hover {
    cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
    background-color: #cbddf5;
  }
`;

const URL = styled.div`
  font-size: 13px;
  line-height: 20px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Status = styled.div`
  width: 28px;
  color: ${(props) => props.children > 400 ? '#ba3a00' : 'black'};
  margin-left: 5px;
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
  margin-right: 5px;
`;

export class Mock extends React.Component {
  toggleMock = (event) => {
    event.stopPropagation();
    API.toggleMock(this.props.mock.id);
  };

  render() {
    const { onClick, onContextMenu, mock, searchTerm } = this.props;

    return this.props.connectDragSource(
      <div>
        <Container onClick={ onClick }
                   onContextMenu={ onContextMenu }
                   isSelected={ UIState.selectedMocks.includes(mock) }
                   onDoubleClick={ () => console.log('RENAME MOCK') }>

          <Icon src={ mock.isActive ? mockedIcon : unmockedIcon }
                alt={ mock.isActive ? 'Unmock' : 'Mock' }
                onClick={ this.toggleMock }/>

          <MethodLabel>{ mock.method }</MethodLabel>

          <URL dangerouslySetInnerHTML={{
            __html: getHighlightedText(mock.url, searchTerm)
          }}/>

          <Status>{ mock.response.status }</Status>
        </Container>
      </div>
    )
  }
}

export default DragSource('mock', mockSource, collect)(UIStateListener(Mock));
