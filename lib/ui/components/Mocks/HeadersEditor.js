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

  getHeaders() {
    return map(this.props.headers, (value, key) => ({ key, value}))
      .filter((item) => !!item.key)
      .concat([{ key: '', value: '' }]);
  }

  render() {
    this.getHeaders();
    return (
      <div>
        <HeaderRow>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell autosize>Value</HeaderCell>
        </HeaderRow>
        { this.getHeaders().map((header, index) => (
          <CellRow key={ index }>
            <Cell>
              <Autocomplete
                value={ header.key }
                options={ StandardHeaders.response }
                onChange={ this.handleHeaderChange(header.key) }/>
            </Cell>
            <Cell autosize>
              <Autocomplete
                value={ String(header.value) }
                options={ responseHeaders[header.key.toLowerCase()] || [] }
                onChange={ this.handleHeaderValueChange(header.key) }/>
            </Cell>
          </CellRow>
        )) }
      </div>
    );
  }

}

HeadersEditor.propTypes = {
  headers: React.PropTypes.object
};

export default HeadersEditor;
