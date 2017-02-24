import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/Icon';
import MethodLabel from 'ui/components/styled/MethodLabel';

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

export const RequestOption = ({ value, label, method, response, isMocked, onClick }) => (
  <Option onClick={ onClick } isMocked={ isMocked }>
    <MethodLabel>{ method }</MethodLabel>
    <Label>{ label }</Label>

    { isMocked && <Icon src="mocked"/> }

    {
      response
        ? <Status>{ response.status }</Status>
        : <Icon src="spin"/>
    }
  </Option>
);

RequestOption.propTypes = {};

export default RequestOption;
