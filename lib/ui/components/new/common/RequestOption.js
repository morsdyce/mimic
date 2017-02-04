import React from 'react';
import styled from 'styled-components';

const Method = styled.span`
  flex: 1;
  font-weight: 700;
`;

const Option = styled.div`
  padding: 5px 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  
  &:hover {
    background-color: #cbddf5;
  }
`;

const Label = styled.span`
  flex: 8;
  white-space: nowrap;
  font-size: 13px;
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
