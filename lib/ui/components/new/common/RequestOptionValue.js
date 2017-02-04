import React from 'react';
import styled from 'styled-components';
import selectIcon from 'ui/assets/images/up-down@2x.png';

const Method = styled.span`
  flex: 1;
  font-weight: 700;
  margin-right: 20px;
`;

const Option = styled.div`
  padding: 5px;
  display: flex;
`;

const Label = styled.span`
  flex: 8;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
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
