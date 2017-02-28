import React from 'react';
import { DropTarget } from 'react-dnd';
import some from 'lodash/some';
import EVENTS from 'api/constants/events';
import first from 'lodash/first';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import API from 'api';
import MocksState from 'ui/states/MocksState';
import Group from 'ui/components/Mocks/Sidebar/Group';
import Mock from 'ui/components/Mocks/Sidebar/Mock';
import ResizeHandle from 'ui/components/common/ResizeHandle';
import ContextMenu from 'ui/components/Mocks/Sidebar/ContextMenu';
import { SidebarContainer } from 'ui/components/Mocks/Sidebar/styled';

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
    isHovered: monitor.isOver()
  };
}

class MocksSidebar extends React.Component {

  componentDidMount() {
    API.on(EVENTS.UPDATE_MOCK, this.reRender);
    API.on(EVENTS.UPDATE_GROUP, this.reRender);

    MocksState.subscribe(this.reRender);
  }

  componentWillUnmount() {
    API.off(EVENTS.UPDATE_MOCK, this.reRender);
    API.off(EVENTS.UPDATE_GROUP, this.reRender);

    MocksState.unsubscribe(this.reRender);
  }

  reRender = () => {
    setTimeout(() => this.forceUpdate(), 0);
  };

  select = (item, isRightClick) => (event) => {
    if (isRightClick && MocksState.hasSelection) {
      return;
    }

    if (!isRightClick) {
      event.stopPropagation();
    }

    if (event.shiftKey && MocksState.selectedItems.length > 0) {
      const groups = flatten(API.groups.map((group) => [group, ...group.mocks]));
      const mocks = API.mocks.filter((mock) => !mock.groupId);

      const list = [...groups, ...mocks];
      const selectedItems = list.filter((listItem) => MocksState.selectedItems.indexOf(listItem) !== -1);
      const firstIndex = list.indexOf(first(selectedItems));
      const currentIndex = list.indexOf(item);
      const itemsBetween = currentIndex > firstIndex
        ? list.slice(firstIndex, currentIndex + 1)
        : list.slice(currentIndex, firstIndex);

      return itemsBetween
        .filter((itemInRange) => MocksState.selectedItems.indexOf(itemInRange) === -1)
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
                isSelected={ !!find(MocksState.selectedMocks, { id: mock.id }) }
                toggleMock={ this.toggleMock(mock) }
                onClick={ this.select(mock) }
                onContextMenu={ this.select(mock, true) }/>
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
          <Group key={ group.id }
                 id={ group.id }
                 name={ group.name }
                 active={ group.active }
                 isSelected={ !!find(MocksState.selectedGroups, { id: group.id }) }
                 mocks={ mocks }
                 searchTerm={ this.props.searchTerm }
                 toggleGroup={ this.toggleGroup(group) }
                 toggleMock={ this.toggleMock }
                 onSelect={ this.select }
                 onClick={ this.select(group) }
                 onContextMenu={ this.select(group, true) }/>
        )
      });
  }

  openContextMenu = (event) => {
    event.preventDefault();

    MocksState.openMenu(event.clientX, event.clientY);
  };

  render() {
    return this.props.connectDropTarget(
      <div style={{ position: 'relative', height: '100%' }}>
        <ResizeHandle value="mocksSidebarWidth"/>

        <SidebarContainer style={{ width: MocksState.sidebarWidth }}
                 onContextMenu={ this.openContextMenu }>
          { this.getGroups() }
          { this.getMocks() }

          <ContextMenu/>
        </SidebarContainer>
      </div>
    );
  }
}

export default DropTarget('mock', groupTarget, collect)(MocksSidebar);
