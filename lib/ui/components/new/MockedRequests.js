import React from 'react';
import styled from 'styled-components';

const List = styled.div`
`;

const Mock = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: ${(props) => props.isSelected ? '#cbddf5' : 'white'};
  
  &:hover {
    cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
    background-color: #cbddf5;
  }
`;

const Method = styled.div`
  font-size: 12px;
  min-width: 40px;
`;

const URL = styled.div`
  font-size: 12px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Checkbox = styled.input`
`;

const MockedRequests = (props) => (
  <List>
    {
      props.API.mockedRequests.map((mock) => (
        <Mock onClick={ () => props.selectMock(mock) } isSelected={ mock === props.selectedMock }>
          <Method>{ mock.method }</Method>
          <URL>{ mock.url }</URL>
          <Checkbox type="checkbox" checked={ mock.active }/>
        </Mock>
      ))
    }
  </List>
);

export default MockedRequests;
