import React from 'react';
import styled from 'styled-components';
import Frame from 'ui/components/Frame';
import Editor from 'ui/components/Editor';
import Icon from 'ui/components/Icon';
import MocksSidebar from 'ui/components/MocksSidebar';
import GroupView from 'ui/components/GroupView';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import UIState, { UIStateListener } from 'ui/UIState';
import MultiSelectView from 'ui/components/MultiSelectView';
import MocksFilter, { filterByType } from 'ui/components/MocksFilter';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const SidebarActions = styled.div`
  width: 234px;
  height: 23px;
  border-top: 0;
  display: flex;
  align-items: center;
  border-right: 1px solid #e7e7e7;
  padding-right: 3px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const SidebarIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const Search = styled.input`
  border: none;
  height: 100%;
  flex-grow: 1;
  outline: none;
  padding-left: 5px;
`;

class Mocks extends React.Component {

  state = {
    filterReferences: 0
  };

  componentDidMount() {
    window.addEventListener('keyup', this.closeOnEscape);

    if (!UIState.selectedMocks.length && API.mocks.length) {
      UIState.update({ selectedMocks: API.mocks.slice(0, 1) });
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

  clearSelection = () => {
    UIState.update({ selectedItems: [] });
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

    this.clearSelection();
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
    <SidebarActions style={{ width: UIState.mocksSidebarWidth - 115 }}>
      <Icon src="search"/>
      <Search
        value={ UIState.searchTerm }
        onBlur={ this.hideFilters }
        onFocus={ this.showFilters }
        onChange={ this.onSearchTermChange }/>
      { UIState.searchTerm && <Icon src="clear" onClick={ this.clearSearch }/> }
      <SidebarIcons>
        <Icon src="add" style={{ cursor: 'pointer' }} onClick={ this.addNewMock }/>
        <Icon src="record" style={{ cursor: 'pointer' }} onClick={ this.toggleRecording }/>
        <Icon src="remove" style={{ cursor: 'pointer' }} onClick={ this.deleteSelected }/>
      </SidebarIcons>
    </SidebarActions>
  );

  renderMainPanel() {
    if (UIState.selectedItems.length > 1) {
      return (
        <MultiSelectView
          selectedMocks={ UIState.selectedMocks }
          selectMock={ this.selectMock }/>
      );
    }

    if (UIState.selectedItems.length === 1 && UIState.selectedItems[0] instanceof Group) {
      const group = UIState.selectedItems[0];
      return <GroupView id={ group.id } clearSelection={ this.clearSelection }/>;
    }

    const selectedMocks = UIState.selectedItems.filter((item) => item instanceof Mock);
    const mock = API.getMock((selectedMocks[0] || {}).id);

    return <Editor selectedMock={ mock }/>;
  }

  render() {
    return (
      <Frame controls={ this.controls() } subControls={ this.filters() }>
        <Container>
          <Main>
            <MocksSidebar
              searchTerm={ UIState.searchTerm }
              select={ this.select }
              customFilter={ filterByType } />

            <MainSection>
              { this.renderMainPanel() }
            </MainSection>
          </Main>
        </Container>
      </Frame>
    );
  }
}

export default UIStateListener(Mocks);

