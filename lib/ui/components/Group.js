import React from 'react';
import styled from 'styled-components';
import some from 'lodash/some';
import mockedIcon from 'ui/assets/images/mocked@2x.png';
import unmockedIcon from 'ui/assets/images/unmocked@2x.png';
import expandIcon from 'ui/assets/images/right@2x.png';
import Mock from 'ui/components/Mock';
import { DropTarget } from 'react-dnd';
import API from 'api';
import { getHighlightedText } from 'ui/utils/string';
import UIState, { UIStateListener } from 'ui/UIState';
import find from 'lodash/find';

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

const Icon = styled.img`
  height: 16px;
  user-select: none;
  margin-right: 5px;
  ${(props) => props.open ? 'transform: rotate(90deg);' : ''}
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: ${(props) => props.isSelected ? '#cbddf5' : 'white'};
  
  &:hover {
    cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
    background-color: #cbddf5;
  }
`;

const GroupMocks = styled.div`
  margin-left: 20px;
`;

const MocksCount = styled.sup`
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

  render() {
    const { id, name, active, mocks, searchTerm, onSelectMock, onClick, connectDropTarget } = this.props;

    const group = find(UIState.groups, { id });

    if (!group) {
      return null;
    }

    return connectDropTarget(
      <div onClick={ onClick }>
        <GroupHeader isSelected={ this.props.isSelected }>
          <Icon src={ active ? mockedIcon : unmockedIcon } onClick={ this.props.toggleGroup }/>
          <Icon src={ expandIcon } onClick={ this.toggle } open={ group.isOpen }/>
          <span dangerouslySetInnerHTML={{
            __html: getHighlightedText(name, searchTerm)
          }}/>
          <MocksCount>{ mocks.length }</MocksCount>
        </GroupHeader>
        <GroupMocks>
          { group.isOpen && mocks.map((mock) => (
            <Mock
              key={ mock.id }
              mock={ mock }
              searchTerm={ searchTerm }
              onClick={ onSelectMock(mock) }
              onContextMenu={ onSelectMock(mock, true) }/>
          ))}
        </GroupMocks>
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
