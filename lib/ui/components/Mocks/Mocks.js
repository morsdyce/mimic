import React from 'react';
import Frame from 'ui/components/common/Frame';
import Editor from 'ui/components/Mocks/Editor';
import Icon from 'ui/components/common/Icon';
import MocksSidebar from 'ui/components/Mocks/Sidebar/MocksSidebar';
import GroupView from 'ui/components/Mocks/GroupView';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import UIState from 'ui/states/UIState';
import MocksState from 'ui/states/MocksState';
import { connectToState } from 'ui/states/connector';
import MultiSelectView from 'ui/components/Mocks/MultiSelectView';
import MocksFilter, { filterByType } from 'ui/components/Mocks/MocksFilter';
import {
  MocksContainer,
  MocksActions,
  MocksMainPanel,
  MocksActionIcons,
  MocksSearchInput
} from 'ui/components/Mocks/styled';

class Mocks extends React.Component {

  state = {
    filterReferences: 0
  };

  componentDidMount() {
    window.addEventListener('keyup', this.closeOnEscape);

    if (!MocksState.selectedItems.length && API.mocks.length) {
      MocksState.selectFirstMock();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeOnEscape);
  }

  reRender = () => {
    setTimeout(() => this.forceUpdate(), 0);
  };

  closeOnEscape = (event) => {
    if (event.keyCode === 27) {
      UIState.setViewMode('closed');
    }
  };

  select = (selectedItem, multiple) => {
    let selectedItems = [selectedItem];

    if (multiple) {
      const isSelected = MocksState.selectedItems.indexOf(selectedItem) > -1;

      if (isSelected) {
        selectedItems = MocksState.selectedItems.filter((item) => item !== selectedItem);
      } else {
        selectedItems = [...MocksState.selectedItems, selectedItem];
      }
    }

    MocksState.selectItems(selectedItems);
  };

  onSearchTermChange = (event) => {
    MocksState.updateQuery(event.target.value);
  };

  clearSearch = () => {
    MocksState.updateQuery('');
  };

  addNewMock = () => {
    const newMock = API.addMock();

    MocksState.selectItems([newMock]);
  };

  deleteSelected = () => {
    MocksState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.removeMock(item.id)
      }

      if (item instanceof Group) {
        API.removeGroup(item.id);
      }
    });

    MocksState.selectFirstMock();
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
    if (this.state.filterReferences === 0 && MocksState.filter === 'All') {
      return null;
    }

    return <MocksFilter onMouseEnter={ this.showFilters } onMouseLeave={ this.hideFilters }/>
  };

  controls = () => (
    <MocksActions style={{ width: MocksState.sidebarWidth - 115 }}>
      <Icon src="search"/>
      <MocksSearchInput placeholder="Find"
                        value={ MocksState.query }
                        onBlur={ this.hideFilters }
                        onFocus={ this.showFilters }
                        onChange={ this.onSearchTermChange }/>
      { MocksState.query && <Icon src="clear" onClick={ this.clearSearch }/> }
      <MocksActionIcons>
        <Icon src="add" style={{ cursor: 'pointer' }} onClick={ this.addNewMock }/>
        <Icon src="record" style={{ cursor: 'pointer' }} onClick={ this.toggleRecording }/>
        <Icon src="remove" style={{ cursor: 'pointer' }} onClick={ this.deleteSelected }/>
      </MocksActionIcons>
    </MocksActions>
  );

  renderMainPanel() {
    if (MocksState.hasMultipleSelection) {
      return (
        <MultiSelectView
          selectedItems={ MocksState.selectedItems }
          groups={ MocksState.groups }
          selectItems={ MocksState.selectItems }
          setGroups={ MocksState.setGroups }
          addGroup={ MocksState.addGroup }/>
      );
    }

    if (MocksState.selectedItems.length === 1 && MocksState.selectedItems[0] instanceof Group) {
      const group = MocksState.selectedItems[0];
      return (
        <GroupView
          id={ group.id }
          select={ this.select }
          selectFirstMock={ MocksState.selectFirstMock }/>
      );
    }

    const selectedMocks = MocksState.selectedMocks;
    const mock = API.getMock((selectedMocks[0] || {}).id);

    return <Editor selectedMock={ mock } recaptureRequestIds={ MocksState.recaptureRequestIds }/>;
  }

  render() {
    return (
      <Frame controls={ this.controls() } filters={ this.filters() }>
        <MocksContainer>
          <MocksSidebar
            hasSelection={ MocksState.hasSelection }
            hasMultipleSelection={ MocksState.hasMultipleSelection }
            selectedItems={ MocksState.selectedItems }
            selectedMocks={ MocksState.selectedMocks }
            selectedGroups={ MocksState.selectedGroups }
            openMenu={ MocksState.openMenu }
            sidebarWidth={ MocksState.sidebarWidth }
            groups={ MocksState.groups }
            setGroups={ MocksState.setGroups }
            renamedItemId={ MocksState.renamedItemId }
            editItemName={ MocksState.editItemName }
            recaptureRequestIds={ MocksState.recaptureRequestIds }
            clipboardAction={ MocksState.clipboardAction }
            closeMenu={ MocksState.closeMenu }
            collapseAllGroups={ MocksState.collapseAllGroups }
            expandAllGroups={ MocksState.expandAllGroups }
            recaptureMocks={ MocksState.recaptureMocks }
            selectFirstMock={ MocksState.selectFirstMock }
            updateQuery={ MocksState.updateQuery }
            clipboard={ MocksState.clipboard }
            contextMenu={ MocksState.contextMenu }
            addGroup={ MocksState.addGroup }
            searchTerm={ MocksState.query }
            select={ this.select }
            customFilter={ filterByType }
            canPaste={ MocksState.canPaste }/>

          <MocksMainPanel>
            { this.renderMainPanel() }
          </MocksMainPanel>
        </MocksContainer>
      </Frame>
    );
  }
}

export default connectToState(MocksState, Mocks);

