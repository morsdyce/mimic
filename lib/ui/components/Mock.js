import React from 'react';
import styled from 'styled-components';
import mockedIcon from 'ui/assets/images/mocked@2x.png';
import unmockedIcon from 'ui/assets/images/unmocked@2x.png';

const Container = styled.div`
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
  font-size: 11px;
  margin-right: 5px;
`;

const URL = styled.div`
  font-size: 12px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
  margin-right: 5px;
`;

export const Mock = ({ onClick, isSelected, active, method, url, toggleMock }) => (
  <Container
    onClick={ onClick }
    isSelected={ isSelected }
    onDoubleClick={ () => console.log('RENAME MOCK') }
    onContextMenu={ () => console.log('CONTEXT MENU') }>
    <Icon
      src={ active ? mockedIcon : unmockedIcon }
      alt={ active ? 'Unmock' : 'Mock' }
      onClick={ toggleMock }/>
    <Method>{ method }</Method>
    <URL>{ url }</URL>
  </Container>
);

export default Mock;
