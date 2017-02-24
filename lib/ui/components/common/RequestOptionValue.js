import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/Icon';
import MethodLabel from 'ui/components/styled/MethodLabel'

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

export const RequestOptionValue = (isActive, toggleActive) => ({ request, onClick }) => (
  <Option onClick={ onClick }>
    <Icon src={ isActive ? 'mocked' : 'unmocked' } style={{ marginRight: 5 }} onClick={ toggleActive }/>
    <MethodLabel>{ request.method }</MethodLabel>
    <Label>{ request.url }</Label>
    <Icon src="select"/>
  </Option>
);

RequestOptionValue.propTypes = {

};

export default RequestOptionValue;
