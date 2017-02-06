import React from 'react';
import styled from 'styled-components';
import EVENTS from 'api/constants/events';
import editIcon from 'ui/assets/images/edit@2x.png';
import spinIcon from 'ui/assets/images/spin.svg';
import menuIcon from 'ui/assets/images/left@2x.png';

const Container = styled.div`
  display: flex;
  position: fixed;
  left: 3px;
  bottom: 3px;
  font-family: Arial, sans-serif;
  font-size: 12px;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 0 8px;
  height: 20px;
  margin-right: 3px;
  border-radius: 4px;
  
  &:hover {
    cursor: pointer;
    background-color: #c8dcf4;
  }
`;

const Method = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const URL = styled.div`
  margin-right: 20px;
`;

const Status = styled.div`
  color: ${(props) => props.children >= 400 ? '#ba3a00' : 'inherit'};
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
`;

class LatestRequestNotifications extends React.Component {
  constructor() {
    super();

    this.state = {
      latestRequest: null
    };

    this.setLatestRequest = this.setLatestRequest.bind(this);
  }

  componentDidMount() {
    this.props.API.on(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.on(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  componentWillUnmount() {
    this.props.API.off(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.off(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  setLatestRequest({ requestId }) {
    this.setState({ latestRequest: this.props.API.getCapturedRequest(requestId) });
  }

  render() {
    if (!this.state.latestRequest) {
      return null;
    }

    return (
      <Container>
        <Control onClick={ () => this.props.onEdit(this.state.latestRequest.id, { openRequestLog: true }) }>
          <Icon src={ menuIcon } alt="Request History"/>
        </Control>

        <Control onClick={ () => this.props.onEdit(this.state.latestRequest.id) }>
          <Method>{ this.state.latestRequest.method }</Method>
          <URL>{ this.state.latestRequest.url }</URL>

          {
            this.state.latestRequest.response &&
            <Status>{ this.state.latestRequest.response.status }</Status>
          }

          {
            !this.state.latestRequest.response &&
            <Icon src={ spinIcon } alt="Pending Request"/>
          }

          <Icon src={ editIcon } alt="Mock Response"/>
        </Control>
      </Container>
    );
  }
}

export default LatestRequestNotifications;
