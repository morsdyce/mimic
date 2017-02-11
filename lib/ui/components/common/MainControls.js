import React from 'react';
import styled from 'styled-components';
import closeIcon from 'ui/assets/images/close@2x.png';

const Icon = styled.img`
  height: 16px;
  user-select: none;
  cursor: pointer;
`;

const MainActions = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

export const MainControls = ({ closeFullEditor }) => (
  <MainActions>
    <Icon src={ closeIcon } onClick={ closeFullEditor } />
  </MainActions>
);

export default MainControls;
