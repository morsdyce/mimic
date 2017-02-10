import React from 'react';
import styled from 'styled-components';
import Editor from 'ui/components/Editor';
import MockedRequests from 'ui/components/MockedRequests';

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
  overflow-y: auto;
  width: 340px;
  min-width: 340px;
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

        <Editor
          API={ this.props.API }
          selectedMock={ this.state.selectedMock }
          onClose={ this.props.closeFullEditor }/>
      </Container>
    );
  }
}

export default FullEdit;
