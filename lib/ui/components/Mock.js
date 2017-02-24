import React from 'react';
import styled from 'styled-components';
import MethodLabel from 'ui/components/styled/MethodLabel';
import Icon from 'ui/components/Icon';
import { getHighlightedText } from 'ui/utils/string';
import { DragSource } from 'react-dnd';

const mockSource = {
  beginDrag(props) {
    return {
      id: props.id
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

export class Mock extends React.Component {
  render() {
    const { onClick, isSelected, active, method, url, searchTerm, toggleMock, onContextMenu, response } = this.props;

    return this.props.connectDragSource(
      <div>
        <Container onClick={ onClick }
                   onContextMenu={ onContextMenu }
                   isSelected={ isSelected }
                   onDoubleClick={ () => console.log('RENAME MOCK') }>

          <Icon src={ active ? 'mocked' : 'unmocked' }
                style={{ marginRight: 5 }}
                onClick={ toggleMock }/>

          <MethodLabel>{ method }</MethodLabel>

          <URL dangerouslySetInnerHTML={{
            __html: getHighlightedText(url, searchTerm)
          }}/>

          <Status>{ response.status }</Status>
        </Container>
      </div>
    )
  }
}

export default DragSource('mock', mockSource, collect)(Mock);
