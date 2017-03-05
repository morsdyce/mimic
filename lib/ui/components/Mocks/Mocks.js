import React from 'react';
import Frame from 'ui/components/common/Frame';
import Editor from 'ui/components/Mocks/Editor';
import MocksSidebar from 'ui/components/Mocks/Sidebar/MocksSidebar';
import GroupView from 'ui/components/Mocks/GroupView';
import API from 'api';
import { Group } from 'api/models/group';
import UIState from 'ui/states/UIState';
import MocksState from 'ui/states/MocksState';
import { connectToState } from 'ui/states/connector';
import MultiSelectView from 'ui/components/Mocks/MultiSelectView';
import { filterMocksByType } from 'ui/utils/filters';
import SearchInput from 'ui/components/BottomBar/SearchInput';
import IconDropdown from 'ui/components/common/IconDropdown';
import {
  MocksContainer,
  MocksActions,
  MocksMainPanel,
  MocksActionIcons,
} from 'ui/components/Mocks/styled';

class Mocks extends React.Component {

  componentDidMount() {
    window.addEventListener('keyup', this.closeOnEscape);
    window.addEventListener('resize', MocksState.adjustSidebarWidthOnResize);

    if (!MocksState.selectedItems.length && API.mocks.length) {
      MocksState.selectFirstMock();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeOnEscape);
    window.removeEventListener('resize', MocksState.adjustSidebarWidthOnResize);
  }

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

  controls = () => (
    <MocksActions style={{ width: MocksState.sidebarWidth - 115 }}>
      <SearchInput query={ MocksState.query }
                   onBlur={ this.hideFilters }
                   onFocus={ this.showFilters }
                   onChange={ this.onSearchTermChange }
                   onClearQuery={ this.clearSearch }/>
      <MocksActionIcons>
        <IconDropdown
          icon="filter"
          value={ MocksState.filter }
          position="right"
          align="left"
          anchorPoint="bottom"
          onChange={ MocksState.updateFilter }
          options={ ['All', 'Mocked', 'Unmocked', 'Successful', 'Failing'] }
        />
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

    if (!mock) {
      return null;
    }

    return <Editor selectedMock={ mock } recaptureRequestIds={ MocksState.recaptureRequestIds }/>;
  }

  render() {
    return (
      <Frame controls={ this.controls() }>
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
            customFilter={ filterMocksByType }
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

