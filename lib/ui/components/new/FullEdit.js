import React from 'react';
import styled from 'styled-components';
import Editor from 'ui/components/new/Editor';

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
`;

class FullEdit extends React.Component {
  render() {
    return (
      <Container>
        <Sidebar/>
        <Editor/>
      </Container>
    );
  }
}

export default FullEdit;
