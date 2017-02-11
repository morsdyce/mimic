import React from 'react';
import styled from 'styled-components';
import MimicControls from 'ui/components/MimicControls';
import MainControls from 'ui/components/common/MainControls';

const Container = styled.div`
  position: fixed;
  bottom: 51px;
  width: 100%;
  z-index: 999999999999;
  background-color: white;
  border-top: 1px solid #e7e7e7;
  font-size: 14px;
  height: 241px;
  font-family: Arial, sans-serif;
`;

const ScrollableContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  background-size: 100% 48px;
`;

const RequestRow = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
  
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
`;

const MethodCell = styled(Cell)`
  width: 80px;
  min-width: 40px;
  font-size: 12px;
`;

const URLCell = styled(Cell)`
  flex-grow: 1;
`;

const RequestBodyCell = styled(Cell)`
  width: 160px;
  min-width: 120px;
`;

const StatusCell = styled(Cell)`
  width: 40px;
  min-width: 40px;
`;

const ResponseDelayCell = styled(Cell)`
  width: 40px;
  min-width: 40px;
`;

const ResponseBodyyCell = styled(Cell)`
  width: 580px;
  min-width: 120px;
`;

class RequestLog extends React.Component {
  renderLog() {
    return (
      <Container>
        <HeaderRow>
          <MethodCell>Method</MethodCell>
          <URLCell>Url</URLCell>
          <RequestBodyCell>Request Params</RequestBodyCell>
          <StatusCell>Status</StatusCell>
          <ResponseDelayCell>Delay</ResponseDelayCell>
          <ResponseBodyyCell>Response Body</ResponseBodyyCell>
        </HeaderRow>

        <ScrollableContainer>
          {
            this.props.API.capturedRequests.map((request, index) => (
              <RequestRow key={ request.id }>
                <MethodCell>{ request.method }</MethodCell>
                <URLCell>{ request.url }</URLCell>
                <RequestBodyCell>{ request.params }</RequestBodyCell>
                <StatusCell>{ request.response && request.response.status }</StatusCell>
                <ResponseDelayCell>{ request.response && request.response.delay }</ResponseDelayCell>
                <ResponseBodyyCell>{ request.response && request.response.body }</ResponseBodyyCell>
              </RequestRow>
            )).reverse()
          }
        </ScrollableContainer>
      </Container>
    );
  }

  render() {
    return (
      <div style={{ width: 'calc(100% - 95px)' }}>
        <MimicControls
          fullWidth
          activeTab={ this.props.activeTab }
          showLogs={ this.props.showLogs }
          showMocks={ this.props.showMocks }>
          <MainControls closeFullEditor={ this.props.closeFullEditor } />
        </MimicControls>

        { this.renderLog() }
      </div>

    );
  }
}

export default RequestLog;
