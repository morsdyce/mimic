import React from 'react';
import Icon from 'ui/components/common/Icon';
import URLStamp from 'ui/components/common/URLStamp';
import { RequestOptionContainer, RequestOptionURL, RequestOptionSpacer, RequestOptionStatus } from 'ui/components/QuickEdit/styled';

export const RequestOption = ({ request, onClick }) => (
  <RequestOptionContainer onClick={ onClick }>
    { !!request.mockId ? <Icon src="mocked" style={{ marginRight: 5 }}/> : <RequestOptionSpacer/> }

    <URLStamp request={ request }/>

    {
      request.response.status
        ? <RequestOptionStatus isMocked={ !!request.mockId }>{ request.response.status }</RequestOptionStatus>
        : <Icon src="spin"/>
    }
  </RequestOptionContainer>
);

RequestOption.propTypes = {};

export default RequestOption;
