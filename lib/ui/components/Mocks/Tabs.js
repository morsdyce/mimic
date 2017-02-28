import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: ${(props) => props.theme.lightBorder};
`;

const Tab = styled.div`
  padding: 2px ${(props) => props.isSelected ? '6px' : '10px'};
  ${(props) => props.isSelected ? 'padding-top: 1px;' : ''}
  text-transform: capitalize;
  border-radius: 4px 4px 0 0;
  margin-bottom: -1px;
  align-items: flex-end;
  user-select: none;
  font-weight: ${(props) => props.isSelected ? 'bold' : 'normal'};
  color: ${(props) => props.isSelected ? 'black' : props.theme.blue};
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
  border: ${(props) => props.isSelected ? props.theme.lightBorder : 'none'};
  border-bottom: ${(props) => props.isSelected ? '1px solid white' : 'none'};
  
  &:first-child {
    padding-right: ${(props) => props.isSelected ? '5px' : '6px'};
    border-top-left-radius: 0;
    border-left: none;
  }
`;

const Text = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b5b5b5;
  font-size: 14px;
  padding-right: 10px;
`;

const Tabs = (props) => (
  <Container>
    {
      props.options.map(
        (tab) => (
          <Tab isSelected={ tab === props.selectedTab }
               onClick={ () => props.selectTab(tab) }
               key={ tab }>
            { tab }
          </Tab>
        )
      )
    }
    <Text>In URI and body * means anything, \* means *</Text>
  </Container>
);

export default Tabs;
