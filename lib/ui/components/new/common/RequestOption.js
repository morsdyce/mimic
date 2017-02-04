import React from 'react';
import styled from 'styled-components';

const Method = styled.span`
  font-weight: 700;
  width: 50px;
  font-size: 11px;
`;

const Option = styled.div`
  padding: 5px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #cbddf5;
  }
`;

const Label = styled.span`
  white-space: nowrap;
  font-size: 13px;
  flex-grow: 1;
`;

export const RequestOption = ({ value, label, method, onClick }) => (
  <Option onClick={ onClick }>
    <Method>{ method }</Method>
    <Label>{ label }</Label>
  </Option>
);

RequestOption.propTypes = {

};

export default RequestOption;
