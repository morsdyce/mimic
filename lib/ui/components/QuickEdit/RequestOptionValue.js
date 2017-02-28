import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/common/Icon';
import MethodLabel from 'ui/components/common/MethodLabel'

const Option = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 450px;
`;

const Label = styled.span`
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
