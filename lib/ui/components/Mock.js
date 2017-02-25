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
  ${(props) => props.isSelected ? 'background-color: #cbddf5;' : ''};
  padding-left: ${(props) => props.nested ? '25px' : '4px'};

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
    const mock = API.getMock(this.props.mock.id);
    API.updateMock(mock.id, { ...mock, name });

    this.forceUpdate();
  };

  renderDisplayName() {
    if (this.props.mock.name) {
      return (
        <URL>{ this.props.mock.name }</URL>
      );
    }

    return (
      <URL dangerouslySetInnerHTML={{
        __html: getHighlightedText(this.props.mock.url, this.props.searchTerm)
      }}/>
    );
  }

  render() {
    const { onClick, isSelected, toggleMock, onContextMenu, mock, nested } = this.props;

    return this.props.connectDragSource(
      <div>
        <Container onClick={ onClick }
                   onContextMenu={ onContextMenu }
                   isSelected={ isSelected }
                   nested={ nested }>

          <Icon src={ mock.isActive ? 'mocked' : 'unmocked' }
                style={{ marginRight: 5 }}
                onClick={ toggleMock }/>

          <MethodLabel>{ mock.method }</MethodLabel>

          <InlineEdit id={ mock.id } defaultValue={ mock.name } onSave={ this.onSave }>
            { this.renderDisplayName() }
          </InlineEdit>

          <Status>{ mock.response && mock.response.status }</Status>
        </Container>
      </div>
    )
  }
}

export default DragSource('mock', mockSource, collect)(Mock);
