import React from 'react';
import styled from 'styled-components';
import Frame from 'ui/components/Frame';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import { getHighlightedText } from 'ui/utils/string';
import Icon from 'ui/components/Icon';
import RequestsFilter, { filterByType } from 'ui/components/RequestsFilter';
import ResizeableCell from 'ui/components/ResizeableCell';

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
  
  ${() => !!UIState.requestsQuery ? 'background: none;' : ''}
`;

const rowColor = ({ status, mock }) => {
  if (mock) {
    return '#4B82D5';
  }

  if (status >= 400 && status < 600) {
    return '#D54900'
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
  
  &:last-child {
    border-bottom: ${() => !!UIState.requestsQuery ? '1px solid #b3b3b3' : 'none'};
  }
`;

const HeaderRow = styled.div`
  background-color: white;
  border-bottom: 1px solid #b3b3b3;
  height: 24px;
  width: 100%;
  display: flex;
`;

const Search = styled.input`
  border: none;
  height: 100%;
  flex-grow: 1;
  outline: none;
  padding-left: 5px;
`;

class RequestLog extends React.Component {

  state = {
    filterReferences: 0
  };

  editRequest = (request) => (event) => {
    if (event.nativeEvent.srcElement.dataset.resizeHandle) {
      return;
    }
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

  showFilters = () => {
    this.setState({ filterReferences: this.state.filterReferences + 1 });
  };

  hideFilters = () => {
    this.setState({ filterReferences: this.state.filterReferences - 1 });
  };

  controls = () => (
    <div>
      <Icon src="search"/>
      <Search value={ UIState.requestsQuery }
              onBlur={  this.hideFilters }
              onFocus={ this.showFilters }
              onChange={ this.onQueryChange } />

      { UIState.requestsQuery && <Icon src="clear" onClick={ this.clearQuery }/> }
    </div>
  );

  filters = () => {
    // Only show filters bar if input is not focused, filter not hovered and filter is for 'All'
    if (this.state.filterReferences === 0 && UIState.requestsType === 'All') {
      return null;
    }

    return <RequestsFilter onMouseEnter={ this.showFilters } onMouseLeave={ this.hideFilters }/>
  };

  render() {
    return (
      <Frame controls={ this.controls() } subControls={ this.filters() } >
        <HeaderRow>
          <ResizeableCell cell="method">Method</ResizeableCell>
          <ResizeableCell cell="url">URL</ResizeableCell>
          <ResizeableCell cell="params">Request Params</ResizeableCell>
          <ResizeableCell cell="status">Status</ResizeableCell>
          <ResizeableCell cell="delay">Delay</ResizeableCell>
          <ResizeableCell autosize>Response Body</ResizeableCell>
        </HeaderRow>

        <ScrollableContainer>
          {
            API.capturedRequests
              .filter((request) => request.url.includes(UIState.requestsQuery))
              .filter(filterByType)
              .map((request) => {
                const { method, url, params, mock, response: { status, delay, body } } = request;
                return (
                  <RequestRow key={ request.id }
                              onClick={ this.editRequest(request) }
                              status={ status }
                              mock={ mock }>
                    <ResizeableCell cell="method" status={ status }>{ method }</ResizeableCell>
                    <ResizeableCell cell="url" innerHTML={ getHighlightedText(url, UIState.requestsQuery) }
                                    status={ status }/>
                    <ResizeableCell cell="params" status={ status }>{ params }</ResizeableCell>
                    <ResizeableCell cell="status" status={ status }>{ status }</ResizeableCell>
                    <ResizeableCell cell="delay" status={ status }>{ delay }</ResizeableCell>
                    <ResizeableCell autosize status={ status }>{ body }</ResizeableCell>
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
