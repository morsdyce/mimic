import React from 'react';
import Icon from 'ui/components/common/Icon';
import MethodLabel from 'ui/components/common/MethodLabel';
import { RequestOptionValueContainer, RequestOptionValueLabel } from 'ui/components/QuickEdit/styled';

export const RequestOptionValue = (isActive, toggleActive) => ({ request, onClick }) => (
  <RequestOptionValueContainer onClick={ onClick }>
    <Icon src={ isActive ? 'mocked' : 'unmocked' } style={{ marginRight: 5 }} onClick={ toggleActive }/>
    <MethodLabel>{ request.method }</MethodLabel>
    <RequestOptionValueLabel>{ request.url }</RequestOptionValueLabel>
    <Icon src="select"/>
  </RequestOptionValueContainer>
);

RequestOptionValue.propTypes = {

};

export default RequestOptionValue;
