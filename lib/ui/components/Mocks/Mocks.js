import React from 'react';
import Frame from 'ui/components/common/Frame';
import Editor from './Editor';
import Icon from 'ui/components/common/Icon';
import MocksSidebar from 'ui/components/Mocks/Sidebar/MocksSidebar';
import GroupView from 'ui/components/Mocks/GroupView';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import UIState, { UIStateListener } from 'ui/UIState';
import MocksSidebarState from 'ui/states/MocksSidebarState';
import MultiSelectView from 'ui/components/Mocks/MultiSelectView';
import MocksFilter, { filterByType } from 'ui/components/Mocks/MocksFilter';
import { MocksContainer, MocksActions, MocksMainPanel, MocksActionIcons, MocksSearchInput } from 'ui/components/Mocks/styled'

class Mocks extends React.Component {

  state = {
    filterReferences: 0
  };

  componentDidMount() {
    window.addEventListener('keyup', this.closeOnEscape);

    if (!MocksSidebarState.selectedItems.length && API.mocks.length) {
      MocksSidebarState.selectFirstMock();
    }

    MocksSidebarState.subscribe(this.reRender);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeOnEscape);

    MocksSidebarState.unsubscribe(this.reRender);
  }

  reRender = () => {
    setTimeout(() => this.forceUpdate(), 0);
  };

  closeOnEscape = (event) => {
    if (event.keyCode === 27) {
      UIState.update({ viewMode: 'closed' });
    }
  };

  select = (selectedItem, multiple) => {
    let selectedItems = [selectedItem];

    if (multiple) {
      const isSelected = MocksSidebarState.selectedItems.indexOf(selectedItem) > -1;

      if (isSelected) {
        selectedItems = MocksSidebarState.selectedItems.filter((item) => item !== selectedItem);
      } else {
        selectedItems = [...MocksSidebarState.selectedItems, selectedItem];
      }
    }

    MocksSidebarState.selectItems(selectedItems);
  };

  onSearchTermChange = (event) => {
    UIState.update({ searchTerm: event.target.value });
  };

  clearSearch = () => {
    UIState.update({ searchTerm: '' });
  };

  addNewMock = () => {
    const newMock = API.addMock();

    MocksSidebarState.selectItems([newMock]);
  };

  deleteSelected = () => {
    MocksSidebarState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.removeMock(item.id)
      }

      if (item instanceof Group) {
        API.removeGroup(item.id);
      }
    });

    MocksSidebarState.selectFirstMock();
  };

  toggleRecording = () => {
    if (API.isRecording) {
      API.stopRecording();
    } else {
      API.startRecording();
    }
  };

  showFilters = () => {
    this.setState({ filterReferences: this.state.filterReferences + 1 });
  };

  hideFilters = () => {
    this.setState({ filterReferences: this.state.filterReferences - 1 });
  };

  filters = () => {
    // Only show filters bar if input is not focused, filter not hovered and filter is for 'All'
    if (this.state.filterReferences === 0 && UIState.mocksType === 'All') {
      return null;
    }

    return <MocksFilter onMouseEnter={ this.showFilters } onMouseLeave={ this.hideFilters }/>
  };

  controls = () => (
    <MocksActions style={{ width: UIState.mocksSidebarWidth - 115 }}>
      <Icon src="search"/>
      <MocksSearchInput
        value={ UIState.searchTerm }
        onBlur={ this.hideFilters }
        onFocus={ this.showFilters }
        onChange={ this.onSearchTermChange }/>
      { UIState.searchTerm && <Icon src="clear" onClick={ this.clearSearch }/> }
      <MocksActionIcons>
        <Icon src="add" style={{ cursor: 'pointer' }} onClick={ this.addNewMock }/>
        <Icon src="record" style={{ cursor: 'pointer' }} onClick={ this.toggleRecording }/>
        <Icon src="remove" style={{ cursor: 'pointer' }} onClick={ this.deleteSelected }/>
      </MocksActionIcons>
    </MocksActions>
  );

  renderMainPanel() {
    if (MocksSidebarState.hasSelection) {
      return <MultiSelectView select={ this.select }/>;
    }

    if (MocksSidebarState.selectedItems.length === 1 && MocksSidebarState.selectedItems[0] instanceof Group) {
      const group = MocksSidebarState.selectedItems[0];
      return <GroupView id={ group.id } select={ this.select }/>;
    }

    const selectedMocks = MocksSidebarState.selectedMocks;
    const mock = API.getMock((selectedMocks[0] || {}).id);

    return <Editor selectedMock={ mock }/>;
  }

  render() {
    return (
      <Frame controls={ this.controls() } filters={ this.filters() }>
        <MocksContainer>
          <MocksSidebar searchTerm={ UIState.searchTerm }
                        select={ this.select }
                        customFilter={ filterByType }/>

          <MocksMainPanel>
            { this.renderMainPanel() }
          </MocksMainPanel>
        </MocksContainer>
      </Frame>
    );
  }
}

export default UIStateListener(Mocks);

