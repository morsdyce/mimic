import React from 'react';
import styled from 'styled-components';
import StandardHeaders from 'standard-headers';
import Autocomplete from 'ui/components/common/Autocomplete';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import API from 'api';
import MockState from 'ui/states/MocksState';
import responseHeaders from 'ui/constants/response-headers';

const HeaderRow = styled.div`
  border-bottom: ${(props) => props.theme.lightBorder};
  display: flex;
`;

const HeaderCell = styled.div`
  padding: 5px;
  ${(props) => props.autosize ? 'flex-grow: 1' : 'width: 200px'};
`;

const CellRow = styled.div`
  display: flex;
  border-bottom: ${(props) => props.theme.lightBorder};
`;

const Cell = styled.div`
  padding: 3px 5px;
  ${(props) => props.autosize ? 'flex-grow: 1' : 'width: 200px'};

  &:first-child {
    border-right: ${(props) => props.theme.lightBorder};
  }
`;

export class HeadersEditor extends React.PureComponent {

  state = {
    headerName: '',
    headerValue: ''
  };

  handleHeaderChange = (header) => {
    return (value) => {
      const headers = reduce(this.props.selectedMock.response.headers, (result, oldValue, oldKey) => {
        if (oldKey === header) {
          result[value] = this.props.selectedMock.response.headers[header];
        } else {
          result[oldKey] = oldValue;
        }

        return result;
      }, {});

      const mock = {
        ...this.props.selectedMock,
        response: {
          ...this.props.selectedMock.response,
          headers
        },
      };

      API.updateMock(this.props.selectedMock.id, mock);
      MockState.selectItems([API.getMock(this.props.selectedMock.id)]);
    };
  };

  handleHeaderValueChange = (header) => {
    return (value) => {
      const headers = { ...this.props.selectedMock.response.headers };
      headers[header] = value;

      const mock = {
        ...this.props.selectedMock,
        response: {
          ...this.props.selectedMock.response,
          headers
        }
      };

      API.updateMock(this.props.selectedMock.id, mock);
    }
  };

  updateState = (key) => (value) => {
    this.setState({ [key]: value });
  };

  handleNewHeaderBlur = () => {
    if (this.state.headerName && this.state.headerValue) {
      const mock = {
        ...this.props.selectedMock,
        response: {
          ...this.props.selectedMock.response,
          headers: {
            ...this.props.selectedMock.response.headers,
            ...{ [this.state.headerName]: this.state.headerValue }
          }
        }
      };

      API.updateMock(this.props.selectedMock.id, mock);
      MockState.selectItems([API.getMock(this.props.selectedMock.id)]);

      this.setState({ headerName: '', headerValue: ''});
    }
  };

  render() {
    return (
      <div>
        <HeaderRow>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell autosize>Value</HeaderCell>
        </HeaderRow>
        { map(this.props.headers, (value, header) => (
          <CellRow key={ header }>
            <Cell>
              <Autocomplete
                value={ header }
                options={ StandardHeaders.response }
                onChange={ this.handleHeaderChange(header) }/>
            </Cell>
            <Cell autosize>
              <Autocomplete
                value={ String(value) }
                options={ responseHeaders[header.toLowerCase()] || [] }
                onChange={ this.handleHeaderValueChange(header) }/>
            </Cell>
          </CellRow>
        )) }
        <CellRow>
          <Cell>
            <Autocomplete
              value={ this.state.headerName }
              options={ StandardHeaders.response }
              onChange={ this.updateState('headerName') }/>
          </Cell>
          <Cell autosize>
            <Autocomplete
              value={ this.state.headerValue }
              options={ responseHeaders[this.state.headerName.toLowerCase()] || [] }
              onChange={ this.updateState('headerValue') }
              onBlur={ this.handleNewHeaderBlur }/>
          </Cell>
        </CellRow>
      </div>
    );
  }

}

HeadersEditor.propTypes = {
  headers: React.PropTypes.object
};

export default HeadersEditor;
