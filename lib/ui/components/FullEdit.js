import React from 'react';
import styled from 'styled-components';
import Editor from 'ui/components/Editor';
import MockedRequests from 'ui/components/MockedRequests';
import closeIcon from 'ui/assets/images/close@2x.png';

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
    margin-left: 44px;
    padding-left: 8px;
    border-top: 1px solid #e7e7e7;
    position: relative;
    justify-content: flex-end;
`;

const SidebarActions = styled.div`
  width: 238px;
  height: 100%;
  border-top: 0;
  border-right: 1px solid #e7e7e7;
  margin-left: 50px;
`;

const MainActions = styled.div`
  display: flex;
  flex-grow: 1;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
  cursor: pointer;
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

  render() {
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

        <Actions>
          <SidebarActions>
            actions
          </SidebarActions>
          <MainActions>
            <div style={{ height: '100%', width: '100%' }}>
              <Icon src={ closeIcon } onClick={ this.props.closeFullEditor } />
            </div>
          </MainActions>
        </Actions>
      </Container>
    );
  }
}

export default FullEdit;
