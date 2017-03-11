import React from 'react';
import styled from 'styled-components';
import { Div } from 'ui/components/common/base';
import InputControl from 'ui/components/common/InputControl';

export const SettingsContainer = styled(Div)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const SettingsSectionContainer = styled(Div)`
  border-right: ${(props) => props.theme.lightBorder};
  width: 270px;
  padding: 0 60px;
  text-align: left;
  
  &:last-child {
    border-right: none;
   }
`;

export const SettingsSectionTitle = styled(Div)`
  font-weight: 600;
`;

export const ImportErrorMessage = styled(Div)`
  color: ${(props) => props.theme.red};
`;

export const SettingsInputStyle = {
  border: 'none',
  'background-color': '#f0f0f0',
  'border-radius': '4px',
  flex: '1',
  height: '24px',
  outline: '0',
  padding: '0 6px',
  display: 'block',
  width: '100%'
};

export const SettingsInput = styled(InputControl)`
  &:focus {
    border: 2px solid #b2c9ee !important;
    box-sizing: border-box !important;
    padding: 0 4px !important;
  }
`;

export const SettingsBlock = styled(Div)`
  margin-bottom: 10px;
`;

export const SettingsHiddenFileInput = {
  display: 'none'
};
