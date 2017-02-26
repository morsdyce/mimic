import React from 'react';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';
import some from 'lodash/some';
import find from 'lodash/find';
import Icon from 'ui/components/Icon';
import Mock from 'ui/components/Mock';
import InlineEdit from 'ui/components/InlineEdit';
import API from 'api';
import { getHighlightedText } from 'ui/utils/string';
import UIState, { UIStateListener } from 'ui/UIState';

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

const iconStyle = (isOpen) => ({
  marginRight: 5,
  marginLeft: 5,
  transition: 'transform 100ms',
  transform: isOpen ? 'rotate(90deg)' : ''
});

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  user-select: none;
  ${(props) => props.isSelected ? 'background-color:' + props.theme.selectionBlue + ';': ''}
  ${(props) => props.isHovered ? 'background-color:' + props.theme.lightGray + ';': ''}
  
  &:hover {
    cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
    background-color: ${(props) => props.selectionBlue};
  }
`;

const MocksCount = styled.div`
  display: inline-block;
  vertical-align: top;
  user-select: none;
  margin-left: 3px;
  font-size: 10px;
`;

export class Group extends React.Component {

  componentWillMount() {
    const id = this.props.id;
    const group = find(UIState.groups, { id });

    if (!group) {
      UIState.update({
        groups: [
          ...UIState.groups,
          {
            id,
            isOpen: false,
            lastState: null
          }
        ]
      });
    }
  }

  toggle = (event) => {
    event.stopPropagation();

    const group = find(UIState.groups, { id: this.props.id });

    this.updateGroup({
      isOpen: !group.isOpen,
      lastState: null
    });
  };

  updateGroup = (partialUpdate) => {
    const id = this.props.id;
    const groups = UIState.groups.map((group) => {
      if (group.id === id) {
        return {
          id,
          ...partialUpdate
        }
      }

      return group;
    });

    UIState.update({
      groups
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm !== this.props.searchTerm) {
      this.checkMockMatch(nextProps.searchTerm || null);
    }
  }

  checkMockMatch(searchTerm) {
    const hasMatches = some(this.props.mocks, (mock) => mock.url.indexOf(searchTerm) > -1);
    const group = find(UIState.groups, { id: this.props.id });

    if (hasMatches && !group.isOpen) {
      this.updateGroup({
        isOpen: true,
        lastState: group.isOpen
      });
    }

    if (!hasMatches && group.lastState !== null) {
      this.updateGroup({
        isOpen: group.lastState,
        lastState: null
      });
    }
  }

  onSave = (name) => {
    const group = API.getGroup(this.props.id);

    API.updateGroup(group.id, { ...group, name });
    this.forceUpdate();
  };

  onContextMenu = (event) => {
    event.preventDefault();

    this.props.onContextMenu(event);
  };

  render() {
    const { id, name, active, mocks, searchTerm, onSelect, onClick, connectDropTarget, isHovered } = this.props;

    const group = find(UIState.groups, { id });

    if (!group) {
      return null;
    }

    return connectDropTarget(
      <div onClick={ onClick } style={{ backgroundColor: isHovered ? '#f0f0f0' : 'white' }}>
        <GroupHeader isSelected={ this.props.isSelected } onContextMenu={ this.onContextMenu } isHovered={ isHovered }>
          <Icon src={ active ? "mocked" : "unmocked" } onClick={ this.props.toggleGroup }/>
          <Icon src="expand" onClick={ this.toggle } style={ iconStyle(group.isOpen) }/>

          <InlineEdit id={ id } defaultValue={ name } onSave={ this.onSave }>
            <span dangerouslySetInnerHTML={{
              __html: getHighlightedText(name, searchTerm)
            }}/>
            <MocksCount>{ mocks.length }</MocksCount>
          </InlineEdit>

        </GroupHeader>

        { group.isOpen && mocks.map((mock) => (
          <Mock key={ mock.id }
                mock={ mock }
                searchTerm={ searchTerm }
                isSelected={ find(UIState.selectedItems, { id: mock.id }) }
                toggleMock={ this.props.toggleMock(mock) }
                onClick={ onSelect(mock) }
                onContextMenu={ onSelect(mock, true) }
                nested/>
        ))}
      </div>
    )
  }
}

Group.propTypes = {
  name: React.PropTypes.string,
  active: React.PropTypes.bool,
  mocks: React.PropTypes.array
};

export default UIStateListener(DropTarget('mock', groupTarget, collect)(Group));
