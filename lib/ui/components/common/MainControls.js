import React from 'react';
import styled from 'styled-components';
import closeIcon from 'ui/assets/images/close@2x.png';
import settingsIcon from 'ui/assets/images/settings.svg';

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

const TeamSync = styled.div`
`;

const ImportExport = styled.div`
`;

export const MainControls = ({ closeFullEditor }) => (
  <MainActions>
    <TeamSync>
      Team Sync
    </TeamSync>

    <ImportExport>
      Import & Export
    </ImportExport>

    <Icon src={ settingsIcon } alt="Settings"/>
    <Icon src={ closeIcon } onClick={ closeFullEditor }/>
  </MainActions>
);

export default MainControls;
