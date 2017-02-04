import React from 'react';
import styled from 'styled-components';
import selectIcon from 'ui/assets/images/up-down@2x.png';

const Method = styled.span`
  font-weight: 700;
  margin-right: 8px;
  font-size: 11px;
`;

const Option = styled.div`
  padding: 5px;
  display: flex;
  max-width: 400px;
  cursor: pointer;
  align-items: center;
`;

const Label = styled.span`
  flex: 8;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  user-select: none;
`;

const iconStyle = {
  height: '16px',
  userSelect: 'none',
  alignSelf: 'center',
  cursor: 'pointer'
};

export const RequestOptionValue = ({ value, label, method, onClick }) => (
  <Option onClick={ onClick }>
    <Method>{ method }</Method>
    <Label>{ label }</Label>
    <img src={ selectIcon } style={ iconStyle } alt="Select"/>
  </Option>
);

RequestOptionValue.propTypes = {

};

export default RequestOptionValue;
