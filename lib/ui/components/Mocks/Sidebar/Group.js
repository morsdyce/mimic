import React from 'react';
import { DropTarget } from 'react-dnd';
import some from 'lodash/some';
import find from 'lodash/find';
import API from 'api';
import { getHighlightedText } from 'ui/utils/string';
import Icon from 'ui/components/common/Icon';
import Dropzone from 'ui/components/common/Dropzone';
import Mock from 'ui/components/Mocks/Sidebar/Mock';
import InlineEdit from 'ui/components/Mocks/Sidebar/InlineEdit';
import { GroupHeader, GroupMocksCount } from 'ui/components/Mocks/Sidebar/styled';

const groupTarget = {
  drop(props, monitor) {
    const mockId = monitor.getItem().id;
    const mock   = API.getMock(mockId);

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
  transform: isOpen ? '' : 'rotate(-90deg)'
});

export class Group extends React.PureComponent {

  toggle = (event) => {
    event.stopPropagation();

    const group = find(this.props.groups, { id: this.props.id });

    this.updateGroup({
      isOpen: !group.isOpen,
      lastState: null
    });
  };

  updateGroup = (partialUpdate) => {
    const id     = this.props.id;
    const groups = this.props.groups.map((group) => {
      if (group.id === id) {
        return {
          id,
          ...partialUpdate
        }
      }

      return group;
    });

    this.props.setGroups(groups);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm !== this.props.searchTerm) {
      this.checkMockMatch(nextProps.searchTerm || null);
    }
  }

  checkMockMatch(searchTerm) {
    const hasMatches = some(this.props.mocks, (mock) => mock.url.indexOf(searchTerm) > -1);
    const group      = find(this.props.groups, { id: this.props.id });

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

    const group = find(this.props.groups, { id });

    if (!group) {
      return null;
    }

    return connectDropTarget(
      <div onClick={ onClick } style={{ position: 'relative '}}>
        { isHovered && <Dropzone/> }

        <GroupHeader isSelected={ this.props.isSelected } onContextMenu={ this.onContextMenu }>
          <Icon src={ active ? 'mocked' : 'unmocked' }
                style={{ fill: active ? '#4b82d5' : '#f0f0f0' }}
                onClick={ this.props.toggleGroup }/>
          <Icon src="expand" onClick={ this.toggle } style={ iconStyle(group.isOpen) }/>

          <InlineEdit
            id={ id }
            defaultValue={ name }
            onSave={ this.onSave }
            renamedItemId={ this.props.renamedItemId }
            editItemName={ this.props.editItemName }>
            <span dangerouslySetInnerHTML={{
              __html: getHighlightedText(name, searchTerm)
            }}/>
            <GroupMocksCount>{ mocks.length }</GroupMocksCount>
          </InlineEdit>

        </GroupHeader>

        { group.isOpen && mocks.map((mock) => (
          <Mock key={ mock.id }
                mock={ mock }
                searchTerm={ searchTerm }
                isSelected={ find(this.props.selectedMocks, { id: mock.id }) }
                toggleMock={ this.props.toggleMock(mock) }
                onClick={ onSelect(mock) }
                onContextMenu={ onSelect(mock, true) }
                editItemName={ this.props.editItemName }
                renamedItemId={ this.props.renamedItemId }
                nested/>
        ))}
      </div>
    )
  }
}

Group.propTypes = {
  name: React.PropTypes.string,
  active: React.PropTypes.bool,
  mocks: React.PropTypes.array,
  groups: React.PropTypes.array.isRequired,
  setGroups: React.PropTypes.func.isRequired,
  selectedMocks: React.PropTypes.array.isRequired,
  renamedItemId: React.PropTypes.string,
  editItemName: React.PropTypes.func.isRequired,
  addGroup: React.PropTypes.func.isRequired
};

export default DropTarget('mock', groupTarget, collect)(Group);
