import React from 'react';
import styled from 'styled-components';
import Editor from 'ui/components/new/Editor';
import MockedRequests from 'ui/components/new/MockedRequests';

const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999999999999;
  background-color: white;
  border-top: 1px solid #e7e7e7;
  font-size: 14px;
  height: 400px;
  font-family: Arial, sans-serif;
`;

const Sidebar = styled.div`
  border-right: 1px solid #e7e7e7;
  width: 320px;
  min-width: 320px;
  overflow-y: auto;
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
        <Sidebar>
          <MockedRequests API={ this.props.API } selectMock={ this.selectMock } selectedMock={ this.state.selectedMock } />
        </Sidebar>

        <Editor selectedMock={ this.state.selectedMock }/>
      </Container>
    );
  }
}

export default FullEdit;
