import React from 'react';
import styled from 'styled-components';
import closeIcon from 'ui/assets/images/close@2x.png';
import settingsIcon from 'ui/assets/images/settings.svg';
import halfScreenIcon from 'ui/assets/images/half-screen.svg';
import fullScreenIcon from 'ui/assets/images/full-screen.svg';

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

const TeamSync = styled.button`
`;

const ImportExport = styled.button`
`;

export const MainControls = ({ closeFullEditor, sizeFullEditor, fullEditorSize }) => (
  <MainActions>
    <TeamSync>
      Team Sync
    </TeamSync>

    <ImportExport>
      Import & Export
    </ImportExport>
    <button disabled={fullEditorSize === 'half'}><Icon src={halfScreenIcon} alt="Half Screen" onClick={() => sizeFullEditor('half')} /></button>
    <button disabled={fullEditorSize === 'full'}><Icon src={fullScreenIcon} alt="Full Screen" onClick={() => sizeFullEditor('full')} /></button>
    <button><Icon src={settingsIcon} alt="Settings" /></button>
    <button><Icon src={ closeIcon } onClick={ closeFullEditor }/></button>
  </MainActions>
);

export default MainControls;
