import React from 'react';
import styled  from 'styled-components';
import MethodLabel from 'ui/components/common/MethodLabel';
import { getHighlightedText } from 'ui/utils/string';
import { Div } from 'ui/components/common/base';

const Container = styled(Div)`
  display: flex;
  flex: 1;
  align-items: baseline;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const URL = styled(Div)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) => props.status > 400 ? 'color: ' + props.theme.red + ';' : '' }
  ${(props) => props.mocked ? 'color: ' + props.theme.mockedBlue + ';' : '' }
`;

const URLStamp = ({ request, highlight }) => (
  <Container>
    <MethodLabel mocked={ request.mockStatus === 'active' }
                 failed={ request.response.status >= 400 }>
      { request.method }
    </MethodLabel>

    {
      highlight &&
      <URL mocked={ request.mockStatus === 'active' }
           status={ request.response.status }
           dangerouslySetInnerHTML={{ __html: getHighlightedText(request.url, highlight) }}/>
    }

    {
      !highlight &&
      <URL mocked={ request.mockStatus === 'active' }
           status={ request.response.status }>
        { request.url }
      </URL>
    }
  </Container>
);

export default URLStamp;
