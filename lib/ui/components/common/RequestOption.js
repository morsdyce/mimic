import React from 'react';
import styled from 'styled-components';
import spinIcon from 'ui/assets/images/spin.svg';

const Option = styled.div`
  padding: 5px 12px 5px 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.isMocked ? '#2d7bd1' : 'black'};
  
  &:hover {
    background-color: #cbddf5;
  }
`;

const Method = styled.span`
  font-weight: 700;
  width: 50px;
  font-size: 10px;
`;

const Label = styled.span`
  white-space: nowrap;
  font-size: 13px;
  line-height: 20px;
  flex-grow: 1;
`;

const Status = styled.span`
  white-space: nowrap;
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.children >= 400 ? '#ba3a00' : 'inherit'};
`;

const Icon = styled.img`
  height: 16px;
  userSelect: none;
`;

const MockIndicator = styled.div`
  border: 1px solid #2d7bd1;
  border-radius: 4px;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-content: center;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  margin-right: 4px;
  
  &:after {
    content: 'M'
  }
`;

export const RequestOption = ({ value, label, method, response, isMocked, onClick }) => (
  <Option onClick={ onClick } isMocked={ isMocked }>
    <Method>{ method }</Method>
    <Label>{ label }</Label>

    { isMocked && <MockIndicator/> }

    {
      response
        ? <Status>{ response.status }</Status>
        : <Icon src={ spinIcon } alt="Pending Request"/>
    }
  </Option>
);

RequestOption.propTypes = {};

export default RequestOption;
