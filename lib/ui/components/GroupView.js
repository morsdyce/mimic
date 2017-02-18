import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Button = styled.button`
  border: 1px solid #a2bfe8;
  border-radius: 5px;
  background: transparent;
  padding: 3px;
  margin: 0 6px;
  outline: none;
  cursor: pointer;
  color: #4882d3;
  font-size: 14px;
`;

const Text = styled.span`
  color: #858585;
`;

const TextContainer = styled.div`
  margin-top: 40px;
`;

export const GroupView = () => (
  <Container>
    <div>
      <Button>Ungroup</Button>
      <Text>these mocks</Text>
    </div>
    <TextContainer>
      <Text>Drag mocks from the left to add to this group</Text>
    </TextContainer>
  </Container>
);

export default GroupView;
