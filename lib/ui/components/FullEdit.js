import React from 'react';
import styled from 'styled-components';
import Frame from 'ui/components/Frame';
import Editor from 'ui/components/Editor';
import MockedRequestsSidebar from 'ui/components/MockedRequestsSidebar';
import GroupView from 'ui/components/GroupView';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import MultiSelectView from 'ui/components/MultiSelectView';
import deleteIcon from 'ui/assets/images/delete@2x.png';
import addIcon from 'ui/assets/images/plus@2x.png';
import recordIcon from 'ui/assets/images/rec@2x.png';
import searchIcon from 'ui/assets/images/loupe@2x.png';
import clearIcon from 'ui/assets/images/clear@2x.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SidebarActions = styled.div`
  width: 234px;
  height: 23px;
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

const Icon = styled.img`
  height: 16px;
  user-select: none;
  cursor: pointer;
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

class FullEdit extends React.Component {

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

  selectMock = (selectedMock, multiple) => {
    let selectedMocks = [selectedMock];

    if (multiple) {
      const isSelected = UIState.selectedMocks.indexOf(selectedMock) > -1;

      if (isSelected) {
        selectedMocks = UIState.selectedMocks.filter((mock) => mock !== selectedMock);
      } else {
        selectedMocks = [...UIState.selectedMocks, selectedMock];
      }
    }

    UIState.update({ selectedMocks, selectedGroup: null });
  };

  selectGroup = (selectedGroup) => {
    UIState.update({ selectedGroup, selectedMocks: [] })
  };

  onSearchTermChange = (event) => {
    UIState.update({ searchTerm: event.target.value });
  };

  clearSearch = () => {
    UIState.update({ searchTerm: '' });
  };

  clearSelection = () => {
    if (API.mocks.length) {
      UIState.update({ selectedMocks: API.mocks.slice(0, 1), selectedGroup: null });
    } else {
      UIState.update({ selectedMocks: [], selectedGroup: null });
    }
  };

  deleteSelected = () => {
    UIState.selectedMocks.forEach((mock) => API.removeMock(mock.id));

    if (UIState.selectedGroup) {
      API.removeGroup(UIState.selectedGroup.id);
    }

    this.clearSelection();
  };

  renderMainPanel() {
    if (UIState.selectedGroup) {
      return <GroupView id={ UIState.selectedGroup.id } clearSelection={ this.clearSelection }/>;
    }

    if (UIState.selectedMocks.length > 1) {
      return <MultiSelectView selectMock={ this.selectMock }/>;
    }

    const mock = API.getMock((UIState.selectedMocks[0] || {}).id);

    return <Editor selectedMock={ mock }/>;
  }

  controls = () => (
    <SidebarActions>
      <Icon src={ searchIcon }/>
      <Search value={ UIState.searchTerm } onChange={ this.onSearchTermChange }/>
      { UIState.searchTerm && <Icon src={ clearIcon } onClick={ this.clearSearch }/> }
      <SidebarIcons>
        <Icon src={ addIcon }/>
        <Icon src={ recordIcon }/>
        <Icon src={ deleteIcon } onClick={ this.deleteSelected }/>
      </SidebarIcons>
    </SidebarActions>
  );

  render() {
    return (
      <Frame controls={ this.controls() }>
        <Container>
          <MockedRequestsSidebar
            searchTerm={ UIState.searchTerm }
            selectMock={ this.selectMock }
            selectGroup={ this.selectGroup }/>

          <MainSection>
            { this.renderMainPanel() }
          </MainSection>
        </Container>
      </Frame>
    );
  }
}

export default UIStateListener(FullEdit);

