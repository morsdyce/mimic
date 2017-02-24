import React from 'react';
import styled from 'styled-components';
import MethodLabel from 'ui/components/styled/MethodLabel';
import Icon from 'ui/components/Icon';
import InlineEdit from 'ui/components/InlineEdit';
import { getHighlightedText } from 'ui/utils/string';
import { DragSource } from 'react-dnd';
import API from 'api';

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

  onSave = (name) => {
    const mock = API.getMock(this.props.id);
    API.updateMock(mock.id, { ...mock, name })
  };

  renderDisplayName() {
    if (this.props.name) {
      return (
        <URL>{ this.props.name }</URL>
      );
    }

    return (
      <URL dangerouslySetInnerHTML={{
        __html: getHighlightedText(this.props.url, this.props.searchTerm)
      }}/>
    );
  }

  render() {
    const { id, onClick, isSelected, active, method, toggleMock, onContextMenu, response = {}, name } = this.props;

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

          <InlineEdit id={ id } defaultValue={ name } onSave={ this.onSave }>
            { this.renderDisplayName() }
          </InlineEdit>

          <Status>{ response.status }</Status>
        </Container>
      </div>
    )
  }
}

export default DragSource('mock', mockSource, collect)(Mock);
