import React from 'react';
import styled from 'styled-components';
import { getWindowSize } from 'ui/utils/measurements';
import Editor from 'ui/components/Editor';
import MockedRequests from 'ui/components/MockedRequests';
import MimicControls from 'ui/components/MimicControls';
import MainControls from 'ui/components/common/MainControls';
import withAPI from 'ui/components/withAPI';
import deleteIcon from 'ui/assets/images/delete@2x.png';
import addIcon from 'ui/assets/images/plus@2x.png';
import recordIcon from 'ui/assets/images/rec@2x.png';
import searchIcon from 'ui/assets/images/loupe@2x.png';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  border-top: 1px solid #e7e7e7;
  font-size: 14px;
  font-family: Arial, sans-serif;
  flex-direction: column;
`;

const Sidebar = styled.div`
  border-right: 1px solid #e7e7e7;
  overflow-y: auto;
  width: 340px;
  min-width: 340px;
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
  height: 96%;
  border-top: 0;
  display: flex;
  align-items: center;
  border-right: 1px solid #e7e7e7;
  padding-right: 3px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
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
  constructor() {
    super();

    this.state = {
      selectedMock: null
    };

    this.selectMock    = this.selectMock.bind(this);
    this.closeOnEscape = this.closeOnEscape.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.closeOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeOnEscape);
  }

  closeOnEscape(event) {
    if (event.keyCode === 27) {
      this.props.closeFullEditor();
    }
  }

  selectMock(selectedMock) {
    this.setState({ selectedMock });
  }

  renderEdit() {
    return (
      <Container>
        <Main>
          <Sidebar>
            <MockedRequests
              selectMock={ this.selectMock }
              selectedMock={ this.state.selectedMock }/>
          </Sidebar>

          <MainSection>
            <Editor
              selectedMock={ this.state.selectedMock }
              onClose={ this.props.closeFullEditor }/>
          </MainSection>
        </Main>
      </Container>
    );
  }

  render() {
    return (
      <div style={{ width: '100%', height: getWindowSize(this.props.editorSize) }}>
        <MimicControls
          fullWidth
          activeTab={ this.props.activeTab }
          showLogs={ this.props.showLogs }
          showMocks={ this.props.showMocks }>
          <Actions>
            <SidebarActions>
              <Icon src={ searchIcon }/>
              <Search/>
              <SidebarIcons>
                <Icon src={ addIcon }/>
                <Icon src={ recordIcon }/>
                <Icon src={ deleteIcon }/>
              </SidebarIcons>
            </SidebarActions>
            <MainControls
              closeFullEditor={this.props.closeFullEditor}
              setEditorSize={ this.props.setEditorSize }
              editorSize={ this.props.editorSize }/>
          </Actions>
        </MimicControls>

        { this.renderEdit() }
      </div>

    );
  }
}

export default withAPI(FullEdit);

