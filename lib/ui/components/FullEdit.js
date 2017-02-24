import React from 'react';
import styled from 'styled-components';
import Frame from 'ui/components/Frame';
import Editor from 'ui/components/Editor';
import Icon from 'ui/components/Icon';
import MockedRequestsSidebar from 'ui/components/MockedRequestsSidebar';
import GroupView from 'ui/components/GroupView';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import MultiSelectView from 'ui/components/MultiSelectView';

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
    UIState.update({ selectedMocks: [], selectedGroup: null });
  };

  addNewMock = () => {
    const newMock = API.addMock();

    UIState.update({ selectedMocks: [newMock], selectedGroup: null });
  };

  deleteSelected = () => {
    UIState.selectedMocks.forEach((mock) => API.removeMock(mock.id));

    if (UIState.selectedGroup) {
      API.removeGroup(UIState.selectedGroup.id);
    }

    this.clearSelection();
  };

  toggleRecording = () => {
    if (API.isRecording) {
      API.stopRecording();
    } else {
      API.startRecording();
    }
  };

  controls = () => (
    <SidebarActions style={{ width: UIState.mocksSidebarWidth - 115 }}>
      <Icon src="search"/>
      <Search value={ UIState.searchTerm } onChange={ this.onSearchTermChange }/>
      { UIState.searchTerm && <Icon src="clear" onClick={ this.clearSearch }/> }
      <SidebarIcons>
        <Icon src="add" style={{ cursor: 'pointer' }} onClick={ this.addNewMock }/>
        <Icon src="record" style={{ cursor: 'pointer' }} onClick={ this.toggleRecording }/>
        <Icon src="delete" style={{ cursor: 'pointer' }} onClick={ this.deleteSelected }/>
      </SidebarIcons>
    </SidebarActions>
  );

  renderMainPanel() {
    if (UIState.selectedGroup) {
      return <GroupView id={ UIState.selectedGroup.id } clearSelection={ this.clearSelection }/>;
    }

    if (UIState.selectedMocks.length > 1) {
      return (
        <MultiSelectView
          selectedMocks={ UIState.selectedMocks }
          selectMock={ this.selectMock }/>
      );
    }

    const mock = API.getMock((UIState.selectedMocks[0] || {}).id);

    return (
      <Editor
        selectedMock={ mock }
        onClose={ this.props.closeFullEditor }/>
    )
  }

  render() {
    return (
      <Frame controls={ this.controls() }>
        <Container>
          <Main>
            <MockedRequestsSidebar
              searchTerm={ UIState.searchTerm }
              selectMock={ this.selectMock }
              selectGroup={ this.selectGroup }
              selectedMocks={ UIState.selectedMocks }/>

            <MainSection>
              { this.renderMainPanel() }
            </MainSection>
          </Main>
        </Container>
      </Frame>
    );
  }
}

export default UIStateListener(FullEdit);

