import React from 'react';
import styled from 'styled-components';
import Editor from 'ui/components/Editor';
import MockedRequests from 'ui/components/MockedRequests';
import MimicControls from 'ui/components/MimicControls';
import MainControls from 'ui/components/common/MainControls';

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  border-top: 1px solid #e7e7e7;
  font-size: 14px;
  height: 400px;
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
  width: 238px;
  height: 100%;
  border-top: 0;
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

class FullEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMock: null
    };

    this.selectMock = this.selectMock.bind(this);
  }

  selectMock(selectedMock) {
    this.setState({ selectedMock });
  }

  renderEdit() {
    return (
      <Container>
        <Main>
          <Sidebar>
            <MockedRequests API={ this.props.API } selectMock={ this.selectMock } selectedMock={ this.state.selectedMock } />
          </Sidebar>

          <MainSection>
            <Editor
              API={ this.props.API }
              selectedMock={ this.state.selectedMock }
              onClose={ this.props.closeFullEditor }/>
          </MainSection>
        </Main>
      </Container>
    );
  }

  render() {
    return (
      <div style={{ width: 'calc(100% - 95px)' }}>
        <MimicControls
          fullWidth
          activeTab={ this.props.activeTab }
          showLogs={ this.props.showLogs }
          showMocks={ this.props.showMocks }>
          <Actions>
            <SidebarActions>
              actions
            </SidebarActions>
            <MainControls closeFullEditor={ this.props.closeFullEditor } />
          </Actions>
        </MimicControls>

        { this.renderEdit() }
      </div>

    );
  }
}

export default FullEdit;
