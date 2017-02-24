import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/Icon';
import MethodLabel from 'ui/components/styled/MethodLabel';

const Option = styled.div`
  padding: 2px 8px;
  font-size: 13px;
  line-height: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #cbddf5;
  }
`;

const URL = styled.span`
  white-space: nowrap;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) => props.isError ? 'color: #ba3a00' : ''};
  ${(props) => props.isMocked ? 'color: #2d7bd1' : ''};
`;

const Spacer = styled.span`
  width: 21px;
`;

const Status = styled.span`
  ${(props) => props.children >= 400 ? 'color: #ba3a00;' : ''};
  ${(props) => props.isMocked ? 'color: #2d7bd1;' : ''};
`;

export const RequestOption = ({ request, onClick }) => (
  <Option onClick={ onClick }>
    { !!request.mockId ? <Icon src="mocked" style={{ marginRight: 5 }}/> : <Spacer/> }

    <MethodLabel>{ request.method }</MethodLabel>

    <URL isError={ request.response.status > 400 }
         isMocked={ !!request.mockId }>
      { request.url }
    </URL>

    {
      request.response.status
        ? <Status isMocked={ !!request.mockId }>{ request.response.status }</Status>
        : <Icon src="spin"/>
    }
  </Option>
);

RequestOption.propTypes = {};

export default RequestOption;
