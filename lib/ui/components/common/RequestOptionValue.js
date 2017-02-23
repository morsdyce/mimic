import React from 'react';
import styled from 'styled-components';

const Method = styled.span`
  font-weight: 700;
  margin-right: 8px;
  width: 36px;
  font-size: 10px;
`;

const Option = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 450px;
`;

const Label = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  line-height: 20px;
  user-select: none;
`;

export const RequestOptionValue = ({ value, label, method, onClick }) => (
  <Option onClick={ onClick }>
    <Method>{ method }</Method>
    <Label>{ label }</Label>
  </Option>
);

RequestOptionValue.propTypes = {

};

export default RequestOptionValue;
