import React from 'react';
import styled from 'styled-components';
import StandardHeaders from 'standard-headers';
import Autocomplete from 'ui/components/common/Autocomplete';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import API from 'api';
import MockState from 'ui/states/MocksState';
import responseHeaders from 'ui/constants/response-headers';
import { Div } from 'ui/components/common/base';
import BlueButton from 'ui/components/common/BlueButton';

const NewButton = styled(BlueButton)`
  margin: 10px;
  ${(props) => props.disabled ? 'opacity: 0.3;' : ''}
`;

const CellContainer = styled(Div)`
  overflow-y: auto;
  height: 100%;
`;

const HeaderRow = styled(Div)`
  border-bottom: ${(props) => props.theme.lightBorder};
  display: flex;
`;

const HeaderCell = styled(Div)`
  padding: 5px;
  ${(props) => props.autosize ? 'flex-grow: 1' : 'width: 200px'};
`;

const CellRow = styled(Div)`
  display: flex;
  border-bottom: ${(props) => props.theme.lightBorder};
`;

const Cell = styled(Div)`
  padding: 3px 5px;
  ${(props) => props.autosize ? 'flex-grow: 1' : 'width: 200px'};

  &:first-child {
    border-right: ${(props) => props.theme.lightBorder};
  }
`;

export class HeadersEditor extends React.PureComponent {

  nodes = [];

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

  canAddHeader = () => {
    return this.props.selectedMock.response.headers[''] !== '';
  };

  addHeader = () => {
    if (!this.canAddHeader()) {
      return;
    }

    const headers = { ...this.props.selectedMock.response.headers, ['']: '' };

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

  removeHeader = (key) => {
    const headers = reduce(this.props.selectedMock.response.headers, (result, oldValue, oldKey) => {
      if (oldKey === key) {
        return result;
      }

      result[oldKey] = oldValue;
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

  handleKeyUp = (index, field) => {
    return (event) => {
      if (event.keyCode === 8 && !event.target.value) {
        if (field === 'key') {
          const header = this.getHeaders()[index];

          this.removeHeader(header.key);

          const previousField = this.nodes[index - 1];

          if (previousField && previousField.value) {
            previousField.value.focus();
          }

          const currentField = this.nodes[index];

          if (currentField && currentField.key) {
            currentField.key.closeSuggestions();
          }
        } else {
          const previousField = this.nodes[index];

          if (previousField && previousField.key) {
            previousField.key.focus();
          }
        }
      }

      if (event.keyCode === 13) {
        if (field === 'key') {
          const nextField = this.nodes[index];

          if (nextField && nextField.value) {
            nextField.value.focus();
          }
        } else {
          const nextField = this.nodes[index + 1];

          if (nextField && nextField.key) {
            nextField.key.focus();
          }
        }
      }
    }
  };

  getHeaders() {
    return map(this.props.headers, (value, key) => ({ key, value}));
  }

  render() {
    this.getHeaders();
    return (
      <Div>
        <HeaderRow>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell autosize>Value</HeaderCell>
        </HeaderRow>
        <CellContainer>
        { this.getHeaders().map((header, index) => (
          <CellRow key={ index }>
            <Cell>
              <Autocomplete
                ref={ (node) => { this.nodes[index] = { ...this.nodes[index], key: node ? node.__wrappedComponent: null } }}
                value={ header.key }
                options={ StandardHeaders.response }
                onChange={ this.handleHeaderChange(header.key) }
                onBlur={ this.handleHeaderChange(header.key) }
                onKeyUp={ this.handleKeyUp(index, 'key') }/>
            </Cell>
            <Cell autosize>
              <Autocomplete
                ref={ (node) => { this.nodes[index] = { ...this.nodes[index], value: node ? node.__wrappedComponent: null } }}
                value={ String(header.value) }
                options={ responseHeaders[header.key.toLowerCase()] || [] }
                onChange={ this.handleHeaderValueChange(header.key) }
                onKeyUp={ this.handleKeyUp(index, 'value') }/>
            </Cell>
          </CellRow>
        )) }
        </CellContainer>
        <NewButton disabled={ !this.canAddHeader() } onClick={ this.addHeader }>Add New</NewButton>
      </Div>
    );
  }

}

HeadersEditor.propTypes = {
  headers: React.PropTypes.object
};

export default HeadersEditor;
