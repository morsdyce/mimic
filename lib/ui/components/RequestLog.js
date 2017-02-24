import React from 'react';
import styled from 'styled-components';
import Frame from 'ui/components/Frame';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import { getHighlightedText } from 'ui/utils/string';
import Icon from 'ui/components/Icon';
import RequestsFilter, { filterByType } from 'ui/components/RequestsFilter';

const ScrollableContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(
    to bottom,
    white,
    white 50%,
    #f0f0f0 50%,
    #f0f0f0
  );
  background-size: 100% 48px;
`;

const rowColor = ({ status, mock }) => {
  if (status >= 400 && status < 600) {
    return '#D54900'
  }

  if (mock) {
    return '#4B82D5';
  }

  return 'inherit';
};

const RequestRow = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
  div {
    color: ${ rowColor };
  }
  
  &:nth-child(even) {
    background-color: #f0f0f0;
  }
  
  &:nth-child(odd) {
    background-color: white;
  }
  
  &:hover {
    cursor: pointer;
    background-color: #cbddf5;
  }
`;

const HeaderRow = styled.div`
  background-color: white;
  border-bottom: 1px solid #b3b3b3;
  height: 24px;
  width: 100%;
  display: flex;
`;

const Cell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
  border-right: 1px solid #b3b3b3;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  
  &:last-child {
    border-right: none;
  }
`;

const Search = styled.input`
  border: none;
  height: 100%;
  flex-grow: 1;
  outline: none;
  padding-left: 5px;
`;

class RequestLog extends React.Component {

  editRequest = (request) => () => {
    if (!request.mockId) {
      API.mockRequest(request);
    }

    const mockId = API.getCapturedRequest(request.id).mockId;

    UIState.update({
      viewMode: 'mocks',
      selectedMocks: [API.getMock(mockId)]
    });
  };

  onQueryChange = (event) => {
    UIState.update({ requestsQuery: event.target.value });
  };

  clearQuery = () => {
    UIState.update({ requestsQuery: '' });
  };

  controls = () => (
    <div>
      <Icon src="search"/>
      <Search value={ UIState.requestsQuery } onChange={ this.onQueryChange }/>
      { UIState.requestsQuery && <Icon src="clear" onClick={ this.clearQuery }/> }
    </div>
  );

  render() {
    return (
      <Frame controls={ this.controls() } subControls={ <RequestsFilter /> } >
        <HeaderRow>
          <Cell style={{ width: 80 }}>Method</Cell>
          <Cell style={{ width: 200 }}>URL</Cell>
          <Cell style={{ width: 160 }}>Request Params</Cell>
          <Cell style={{ width: 40 }}>Status</Cell>
          <Cell style={{ width: 40 }}>Delay</Cell>
          <Cell style={{ flex: '1' }}>Response Body</Cell>
        </HeaderRow>

        <ScrollableContainer>
          {
            API.capturedRequests
              .filter((request) => request.url.includes(UIState.requestsQuery))
              .filter(filterByType)
              .map((request) => {
                const { mock, method, url, params, response: { status, delay, body } } = request;
                return (
                  <RequestRow key={ request.id }
                              onClick={ this.editRequest(request) }
                              status={ status }
                              mock={ mock }>
                    <Cell style={{ width: 80 }}>{ method }</Cell>
                    <Cell style={{ width: 200 }}
                          dangerouslySetInnerHTML={{
                            __html: getHighlightedText(url, UIState.requestsQuery)
                          }} />
                    <Cell style={{ width: 160 }}>{ params }</Cell>
                    <Cell style={{ width: 40 }}>{ status }</Cell>
                    <Cell style={{ width: 40 }}>{ delay }</Cell>
                    <Cell style={{ flex: '1' }}>{ body }</Cell>
                  </RequestRow>
                )
              }).reverse()
          }
        </ScrollableContainer>
      </Frame>
    );
  }
}

export default UIStateListener(RequestLog);
