import React from 'react';
import styled  from 'styled-components';
import MethodLabel from 'ui/components/common/MethodLabel';
import { getHighlightedText } from 'ui/utils/string';

const Container = styled.div`
  display: flex;
  align-items: baseline;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const URL = styled.div`
  margin-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) => props.status > 400 ? 'color: ' + props.theme.red + ';' : '' }
  ${(props) => props.mocked ? 'color: ' + props.theme.mockedBlue + ';' : '' }
`;

const URLStamp = ({ request, highlight }) => (
  <Container>
    <MethodLabel mocked={ request.mock && request.mock.active }
                 failed={ request.response.status >= 400 }>
      { request.method }
    </MethodLabel>

    {
      highlight &&
      <URL mocked={ request.mock && request.mock.active }
           status={ request.response.status }
           dangerouslySetInnerHTML={{ __html: getHighlightedText(request.url, highlight) }}/>
    }

    {
      !highlight &&
      <URL mocked={ request.mock && request.mock.active }
           status={ request.response.status }>
        { request.url }
      </URL>
    }
  </Container>
);

export default URLStamp;