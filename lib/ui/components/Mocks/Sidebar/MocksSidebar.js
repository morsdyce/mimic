import React from 'react';
import { DropTarget } from 'react-dnd';
import some from 'lodash/some';
import EVENTS from 'api/constants/events';
import first from 'lodash/first';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import API from 'api';
import Group from 'ui/components/Mocks/Sidebar/Group';
import Mock from 'ui/components/Mocks/Sidebar/Mock';
import ResizeHandle from 'ui/components/common/ResizeHandle';
import ContextMenu from 'ui/components/Mocks/Sidebar/ContextMenu';
import { SidebarContainer, ActionGroup, ActionsContainer, Action } from 'ui/components/Mocks/Sidebar/styled';
import MockState from 'ui/states/MocksState';
import Icon from 'ui/components/common/Icon';
import IconDropdown from 'ui/components/common/IconDropdown';

const noop = () => true;

const groupTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return;
    }

    const mockId = monitor.getItem().id;
    const mock   = API.getMock(mockId);

    if (mock) {
      API.updateMock(mockId, { ...mock, groupId: null });
    }
  }
};

function collect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isHovered: monitor.isOver({ shallow: true })
  };
}

class MocksSidebar extends React.PureComponent {

  componentDidMount() {
    API.on(EVENTS.UPDATE_MOCK, this.reRender);
    API.on(EVENTS.UPDATE_GROUP, this.reRender);
  }

  componentWillUnmount() {
    API.off(EVENTS.UPDATE_MOCK, this.reRender);
    API.off(EVENTS.UPDATE_GROUP, this.reRender);
  }

  reRender = () => {
    setTimeout(() => this.forceUpdate(), 0);
  };

  select = (item, isRightClick) => (event) => {
    if (isRightClick && this.props.hasMultipleSelection) {
      return;
    }

    if (!isRightClick) {
      event.stopPropagation();
    }

    if (event.shiftKey && this.props.selectedItems.length > 0) {
      const groups = flatten(API.groups.map((group) => [group, ...group.mocks]));
      const mocks  = API.mocks.filter((mock) => !mock.groupId);

      const list          = [...groups, ...mocks];
      const selectedItems = list.filter((listItem) => this.props.selectedItems.indexOf(listItem) !== -1);
      const firstIndex    = list.indexOf(first(selectedItems));
      const currentIndex  = list.indexOf(item);
      const itemsBetween  = currentIndex > firstIndex
        ? list.slice(firstIndex, currentIndex + 1)
        : list.slice(currentIndex, firstIndex);

      return itemsBetween
        .filter((itemInRange) => this.props.selectedItems.indexOf(itemInRange) === -1)
        .forEach((itemInRange) => this.props.select(itemInRange, true));
    }

    const multiple = event.metaKey || event.ctrlKey;

    this.props.select(item, multiple);
  };

  toggleMock = (mock) => (event) => {
    event.stopPropagation();

    API.toggleMock(mock.id);
  };

  toggleGroup = (group) => (event) => {
    event.stopPropagation();

    API.toggleGroup(group.id);
  };

  getMocks() {
    return API.mocks
      .filter((mock) => !mock.groupId)
      .filter((mock) => mock.url.includes(this.props.searchTerm))
      .filter(this.props.customFilter || noop)
      .map((mock) => (
          <Mock key={ mock.id }
                mock={ mock }
                searchTerm={ this.props.searchTerm }
                isSelected={ !!find(this.props.selectedMocks, { id: mock.id }) }
                toggleMock={ this.toggleMock(mock) }
                onClick={ this.select(mock) }
                onContextMenu={ this.select(mock, true) }
                renamedItemId={ this.props.renamedItemId }
                editItemName={ this.props.editItemName }/>
        )
      );
  }

  getGroups() {
    return API.groups
      .filter((group) => {
        if (!this.props.searchTerm) {
          return true;
        }

        if (group.name.includes(this.props.searchTerm)) {
          return true;
        }

        return some(group.mocks, (mock) => mock.url.includes(this.props.searchTerm))
      })
      .map((group) => {
        const mocks = group.mocks.filter(this.props.customFilter || noop);

        return (
          <Group
            key={ group.id }
            id={ group.id }
            name={ group.name }
            active={ group.active }
            isSelected={ !!find(this.props.selectedGroups, { id: group.id }) }
            mocks={ mocks }
            searchTerm={ this.props.searchTerm }
            toggleGroup={ this.toggleGroup(group) }
            toggleMock={ this.toggleMock }
            onSelect={ this.select }
            onClick={ this.select(group) }
            onContextMenu={ this.select(group, true) }
            groups={ this.props.groups }
            setGroups={ this.props.setGroups }
            selectedMocks={ this.props.selectedMocks }
            editItemName={ this.props.editItemName }
            addGroup={ this.props.addGroup }
            renamedItemId={ this.props.renamedItemId }/>
        )
      });
  }

  openContextMenu = (event) => {
    event.preventDefault();

    this.props.openMenu(event.clientX, event.clientY);
  };

  addNew = (type) => {
    if (type === 'mock') {
      const newMock = API.addMock();

      MocksState.selectItems([newMock]);
    }

    if (type === 'group') {
      const newGroup = API.addGroup({ name: 'New Group' });

      MockState.addGroup({
        id: newGroup.id,
        isOpen: false,
        lastState: null
      });
      MockState.selectItems([newGroup]);
    }
  };

  toggleRecording = () => {
    if (API.isRecording) {
      API.stopRecording();
    } else {
      API.startRecording();
    }
  };

  render() {
    return this.props.connectDropTarget(
      <div style={{ position: 'relative', height: '100%' }}>
        <ResizeHandle value="mocksSidebarWidth"/>

        <SidebarContainer
          isHovered={ this.props.isHovered }
          style={{ width: this.props.sidebarWidth }}
          onContextMenu={ this.openContextMenu }>
          <ActionsContainer>
            <ActionGroup>
              <Action>
                <IconDropdown
                  icon="add"
                  options={ [ { label: 'Mock', value: 'mock' }, { label: 'Group', value: 'group' }]}
                  onChange={ this.addNew }/>
              </Action>
              <Action onClick={ this.toggleRecording }>
                <Icon src="record"/>
              </Action>
            </ActionGroup>

            <ActionGroup autosize>
              <Action onClick={ MockState.collapseAllGroups }>
                <Icon src="collapseAll"/>
              </Action>
              <Action onClick={ MockState.expandAllGroups }>
                <Icon src="expandAll"/>
              </Action>
            </ActionGroup>

            <ActionGroup>
              <Action>
                <Icon src="undo"/>
              </Action>
              <Action onClick={ MockState.deleteSelected }>
                <Icon src="remove"/>
              </Action>
            </ActionGroup>
          </ActionsContainer>
          { this.getGroups() }
          { this.getMocks() }

          <ContextMenu
            closeMenu={ this.props.closeMenu }
            selectedMocks={ this.props.selectedMocks }
            selectedGroups={ this.props.selectedGroups }
            expandAllGroups={ this.props.expandAllGroups }
            collapseAllGroups={ this.props.collapseAllGroups }
            selectedItems={ this.props.selectedItems }
            selectFirstMock={ this.props.selectFirstMock }
            renameItemId={ this.props.renamedItemId }
            recaptureMocks={ this.props.recaptureMocks }
            recaptureRequestIds={ this.props.recaptureRequestIds }
            updateQuery={ this.props.updateQuery }
            clipboardAction={ this.props.clipboardAction }
            clipboard={ this.props.clipboard }
            contextMenu={ this.props.contextMenu }
            hasSelection={ this.props.hasSelection }
            hasMultipleSelection={ this.props.hasMultipleSelection }
            groups={ this.props.groups }
            canPaste={ this.props.canPaste }/>
        </SidebarContainer>
      </div>
    );
  }
}

MocksSidebar.propTypes = {
  hasSelection: React.PropTypes.bool.isRequired,
  selectedItems: React.PropTypes.array.isRequired,
  selectedMocks: React.PropTypes.array.isRequired,
  selectedGroups: React.PropTypes.array.isRequired,
  openMenu: React.PropTypes.func.isRequired,
  sidebarWidth: React.PropTypes.number.isRequired,
  groups: React.PropTypes.array.isRequired,
  setGroups: React.PropTypes.func.isRequired,
  renamedItemId: React.PropTypes.string,
  editItemName: React.PropTypes.func.isRequired,
  closeMenu: React.PropTypes.func.isRequired,
  expandAllGroups: React.PropTypes.func.isRequired,
  collapseAllGroups: React.PropTypes.func.isRequired,
  selectFirstMock: React.PropTypes.func.isRequired,
  renameItemId: React.PropTypes.string,
  recaptureMocks: React.PropTypes.func.isRequired,
  recaptureRequestIds: React.PropTypes.array.isRequired,
  updateQuery: React.PropTypes.func.isRequired,
  clipboardAction: React.PropTypes.func.isRequired,
  clipboard: React.PropTypes.shape({
    command: React.PropTypes.string,
    items: React.PropTypes.array.isRequired
  }),
  contextMenu: React.PropTypes.shape({
    visible: React.PropTypes.bool.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }),
  addGroup: React.PropTypes.func.isRequired,
  canPaste: React.PropTypes.func.isRequired
};

export default DropTarget('mock', groupTarget, collect)(MocksSidebar);
