import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f0f0f0;
`;

const Tab = styled.div`
  padding: 2px 8px;
  ${(props) => props.isSelected ? 'padding-top: 3px;' : ''}
  text-transform: capitalize;
  border-radius: 4px 4px 0 0;
  margin-bottom: -1px;
  align-items: flex-end;
  font-weight: ${(props) => props.isSelected ? 'bold' : 'normal'};
  color: ${(props) => props.isSelected ? 'black' : '#2d7bd1'};
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
  border: ${(props) => props.isSelected ? '1px solid #f0f0f0' : 'none'};
  border-bottom: ${(props) => props.isSelected ? '1px solid white' : 'none'};
  
  &:first-child {
    border-top-left-radius: 0;
    border-left: none;
  }
`;

const Tabs = (props) => (
  <Container>
    {
      props.options.map(
        (tab) => <Tab isSelected={ tab === props.selectedTab } onClick={ () => props.selectTab(tab) }>{ tab }</Tab>
      )
    }
  </Container>
);

export default Tabs;
