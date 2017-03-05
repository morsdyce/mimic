import React from 'react';
import Icon from 'ui/components/common/Icon';
import URLStamp from 'ui/components/common/URLStamp';
import { RequestOptionValueContainer } from 'ui/components/QuickEdit/styled';

export const RequestOptionValue = (isActive, toggleActive) => ({ request, onClick }) => (
  <RequestOptionValueContainer onClick={ onClick }>
    <Icon src={ isActive ? 'mocked' : 'unmocked' }
          style={{ marginRight: 5, alignSelf: 'stretch', fill: isActive ? '#4b82d5' : '#f0f0f0' }}
          onClick={ toggleActive }/>
    <URLStamp request={ request }/>
    <Icon src="select"/>
  </RequestOptionValueContainer>
);

RequestOptionValue.propTypes = {

};

export default RequestOptionValue;
