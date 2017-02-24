import React from 'react';
import styled from 'styled-components';
import Frame from 'ui/components/Frame';
import { getWindowSize } from 'ui/utils/measurements';
import Editor from 'ui/components/Editor';
import Icon from 'ui/components/Icon';
import MockedRequestsSidebar from 'ui/components/MockedRequestsSidebar';
import MimicControls from 'ui/components/MimicControls';
import MainControls from 'ui/components/common/MainControls';
import GroupView from 'ui/components/GroupView';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import MultiSelectView from 'ui/components/MultiSelectView';
import ResizeHandle from 'ui/components/common/ResizeHandle';
import deleteIcon from 'ui/assets/images/delete@2x.png';
import addIcon from 'ui/assets/images/plus@2x.png';
import recordIcon from 'ui/assets/images/rec@2x.png';
import searchIcon from 'ui/assets/images/loupe@2x.png';
import clearIcon from 'ui/assets/images/clear@2x.png';
import MocksFilter, { filterByType } from 'ui/components/MocksFilter';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: white;
  border-top: 1px solid #e7e7e7;
  font-size: 14px;
  font-family: Arial, sans-serif;
  flex-direction: column;
`;

const Actions = styled.div`
  height: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
  border-top: 1px solid #e7e7e7;
  position: relative;
  justify-content: flex-end;
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
        <Icon src="add"/>
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

  renderEdit() {
    return (
      <Frame controls={ this.controls() } subControls={ <MocksFilter /> }>
        <Container>
          <Main>
            <MockedRequestsSidebar
              searchTerm={ UIState.searchTerm }
              selectMock={ this.selectMock }
              selectGroup={ this.selectGroup }
              selectedMocks={ UIState.selectedMocks }
              customFilter={ filterByType } />

            <MainSection>
              { this.renderMainPanel() }
            </MainSection>
          </Main>
        </Container>
      </Frame>
    );
  }

  render() {
    return (
      <div style={{ width: '100%', height: getWindowSize(UIState.editorHeight) }}>
        <ResizeHandle horizontal/>

        <MimicControls fullWidth>
          <Actions>
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

            <MainControls/>
          </Actions>
        </MimicControls>

        { this.renderEdit() }
      </div>

    );
  }
}

export default UIStateListener(FullEdit);

