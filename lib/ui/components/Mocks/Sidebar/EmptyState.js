import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Hint = styled.div`
  margin: 10px;
`;

const Arrow = styled.div`
  margin-left: 7px;
`;

const NoMocks = styled.div`
  color: #b5b5b5;
  align-self: center;
`;

const EmptyState = () => (
  <Container>
    <Hint>
      <Arrow>↑</Arrow>
      Add a request manually, <br/>
      or record server responses as mocks
    </Hint>

    <NoMocks>
      No mocks yet
    </NoMocks>

    <Hint>
      or find an earlier request in the log
      <Arrow>↓</Arrow>
    </Hint>
  </Container>
);

export default EmptyState;