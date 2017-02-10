import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Value = styled.div`
  color: red;
  padding: 4px 8px;
  background-color: ${(props) => props.isSelected ? '#2d7bd1' : '#f0f0f0'};
  color: ${(props) => props.isSelected ? 'white' : 'black'};
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

const SelectBar = (props) => (
  <Container>
    { props.values.map((value) => <Value key={ value } isSelected={ value === props.selectedValue }>{ value }</Value>)}

    { props.other && <Value>Other...</Value> }
  </Container>
);

export default SelectBar;
