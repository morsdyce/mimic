import React from 'react';
import Icon from 'ui/components/common/Icon';
import MethodLabel from 'ui/components/common/MethodLabel';
import { RequestOptionContainer, RequestOptionURL, RequestOptionSpacer, RequestOptionStatus } from 'ui/components/QuickEdit/styled';

export const RequestOption = ({ request, onClick }) => (
  <RequestOptionContainer onClick={ onClick }>
    { !!request.mockId ? <Icon src="mocked" style={{ marginRight: 5 }}/> : <RequestOptionSpacer/> }

    <MethodLabel>{ request.method }</MethodLabel>

    <RequestOptionURL isError={ request.response.status > 400 } isMocked={ !!request.mockId }>
      { request.url }
    </RequestOptionURL>

    {
      request.response.status
        ? <RequestOptionStatus isMocked={ !!request.mockId }>{ request.response.status }</RequestOptionStatus>
        : <Icon src="spin"/>
    }
  </RequestOptionContainer>
);

RequestOption.propTypes = {};

export default RequestOption;
