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
import MultiSelectView from 'ui/components/Mocks/MultiSelectView';
import MocksFilter, { filterByType } from 'ui/components/Mocks/MocksFilter';
import { selectFirstMock } from 'ui/utils/mocks';
import { MocksContainer, MocksActions, MocksMainPanel, MocksActionIcons, MocksSearchInput } from 'ui/components/Mocks/styled'

class Mocks extends React.Component {

  state = {
    filterReferences: 0
  };

  componentDidMount() {
    window.addEventListener('keyup', this.closeOnEscape);

    if (!UIState.selectedItems.length && API.mocks.length) {
      selectFirstMock();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeOnEscape);
  }

  closeOnEscape = (event) => {
    if (event.keyCode === 27) {
      UIState.update({ viewMode: 'closed' });
    }
  };

  select = (selectedItem, multiple) => {
    let selectedItems = [selectedItem];

    if (multiple) {
      const isSelected = UIState.selectedItems.indexOf(selectedItem) > -1;

      if (isSelected) {
        selectedItems = UIState.selectedItems.filter((item) => item !== selectedItem);
      } else {
        selectedItems = [...UIState.selectedItems, selectedItem];
      }
    }
    UIState.update({ selectedItems });
  };

  onSearchTermChange = (event) => {
    UIState.update({ searchTerm: event.target.value });
  };

  clearSearch = () => {
    UIState.update({ searchTerm: '' });
  };

  addNewMock = () => {
    const newMock = API.addMock();

    UIState.update({ selectedItems: [newMock] });
  };

  deleteSelected = () => {
    UIState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.removeMock(item.id)
      }

      if (item instanceof Group) {
        API.removeGroup(item.id);
      }
    });

    selectFirstMock();
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
    if (UIState.selectedItems.length > 1) {
      return <MultiSelectView select={ this.select }/>;
    }

    if (UIState.selectedItems.length === 1 && UIState.selectedItems[0] instanceof Group) {
      const group = UIState.selectedItems[0];
      return <GroupView id={ group.id } select={ this.select }/>;
    }

    const selectedMocks = UIState.selectedItems.filter((item) => item instanceof Mock);
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

