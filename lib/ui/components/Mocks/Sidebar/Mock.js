import PropTypes from 'prop-types';
import React from 'react';
import { getHighlightedText } from 'ui/utils/string';
import { DragSource } from 'react-dnd';
import API from 'api';
import MethodLabel from 'ui/components/common/MethodLabel';
import Icon from 'ui/components/common/Icon';
import InlineEdit from 'ui/components/Mocks/Sidebar/InlineEdit';
import { MockContainer, MockStatus, MockURL } from 'ui/components/Mocks/Sidebar/styled';
import DnD from 'ui/components/common/DnD';

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

export class Mock extends React.PureComponent {

  onSave = (name) => {
    const mock = API.getMock(this.props.mock.id);
    API.updateMock(mock.id, { ...mock, name });

    this.forceUpdate();
  };

  renderDisplayName() {
    if (this.props.mock.name) {
      return (
        <MockURL dangerouslySetInnerHTML={{
          __html: getHighlightedText(this.props.mock.name, this.props.searchTerm)
        }}/>
      );
    }

    return (
      <MockURL dangerouslySetInnerHTML={{
        __html: getHighlightedText(this.props.mock.url, this.props.searchTerm)
      }}/>
    );
  }

  render() {
    const { onClick, isSelected, toggleMock, onContextMenu, mock, nested } = this.props;

    return (
      <DnD connect={ this.props.connectDragSource }>
        <MockContainer onClick={ onClick }
                   onContextMenu={ onContextMenu }
                   isSelected={ isSelected }
                   nested={ nested }>

          {
            mock.active &&
            <Icon src="mocked"
                  style={{ marginRight: 5, alignSelf: 'stretch', fill: mock.isActive ? '#4b82d5' : '#b0b0b0' }}
                  onClick={ toggleMock }/>
          }

          {
            !mock.active &&
            <Icon src="unmocked"
                  style={{ marginRight: 5, alignSelf: 'stretch', fill: '#b0b0b0' }}
                  onClick={ toggleMock }/>
          }

          <MethodLabel>{ mock.method }</MethodLabel>

          <InlineEdit
            id={ mock.id }
            defaultValue={ mock.name }
            onSave={ this.onSave }
            editItemName={ this.props.editItemName }
            renamedItemId={ this.props.renamedItemId }>
            { this.renderDisplayName() }
          </InlineEdit>

          <MockStatus>{ mock.response && mock.response.status }</MockStatus>
        </MockContainer>
      </DnD>
    )
  }
}

Mock.propTypes = {
  renamedItemId: PropTypes.string,
  editItemName: PropTypes.func.isRequired
};

export default DragSource('mock', mockSource, collect)(Mock);
