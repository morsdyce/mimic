import React from 'react';
import styled from 'styled-components';

export const SettingsContainer = styled.div`
  text-align: center;
`;

export const SettingsSectionContainer = styled.div`
  border-right: ${(props) => props.theme.lightBorder};
  display: inline-block;
  vertical-align: top;
  width: 270px;
  padding: 0 60px;
  text-align: left;
  margin-top: 5%;
  
  &:last-child {
    border-right: none;
   }
`;

export const SettingsSectionTitle = styled.div`
  font-weight: 600;
`;

export const ImportErrorMessage = styled.div`
  color: ${(props) => props.theme.red};
`;

export const SettingsInput = styled.input`
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  flex: 1;
  height: 24px;
  outline: 0;
  padding: 0 6px;
  display: block;
  width: 100%;
  
  &:focus {
    border: 2px solid #b2c9ee;
    box-sizing: border-box;
    padding: 0 4px;
  }
`;

export const SettingsBlock = styled.div`
  margin-bottom: 10px;
`;

export const SettingsHiddenFileInput = styled.input`
  display: none;
`;
