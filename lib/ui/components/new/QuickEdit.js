import React from 'react';
import _ from 'lodash';
import HttpStatus from 'http-status-codes';
import CompactSelect from 'ui/components/new/CompactSelect';

const containerStyle = {
  display: 'table',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  zIndex: '999999999999',
  backgroundColor: 'white',
  borderTop: '1px solid #e7e7e7',
  fontSize: '14px',
  fontFamily: 'Arial, sans-serif'
};

const sectionStyle = {
  display: 'table-cell',
  padding: '4px 6px',
  borderRight: '1px solid #e7e7e7'
};

const responseBodyInputStyle = {
  border: 'none',
  width: '100%',
  outline: '0'
};

const applyButtonStyle = {
  color: 'white',
  backgroundColor: '#2d7bd1',
  display: 'inline-block',
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  cursor: 'pointer'
};

class QuickEdit extends React.Component {
  constructor() {
    super();

    this.selectRequest = this.selectRequest.bind(this);
  }

  selectRequest(event) {
    this.props.onSelectRequest(event.target.value);
  }

  render() {
    return (
      <div style={ containerStyle }>
        <div style={ sectionStyle }>
          <select onChange={ this.selectRequest } value={ this.props.selectedRequestId }>
            {
              this.props.API.capturedRequests.map((request) => (
                <option key={ request.id } value={ request.id }>{ request.method } { request.url }</option>
              ))
            }
          </select>
        </div>

        <div style={ sectionStyle }>
          <input type="checkbox"/>
          <CompactSelect options={ _.values(HttpStatus).map((statusCode) => ({ value: statusCode, label: statusCode })) }/>
        </div>

        <div style={ sectionStyle }>
          <CompactSelect options={ [{ value: 'JSON', label: 'JSON'}, { value: 'XML', label: 'XML'}, { value: 'TEXT', label: 'TEXT'}] }/>
        </div>

        <div style={ sectionStyle }>
          <input type="text"
                 style={ responseBodyInputStyle }
                 placeholder="Response Body"/>
        </div>

        <div style={ sectionStyle }>
          <CompactSelect options={ [{ value: 0.5, label: '0.5s'}, { value: 1, label: '1s'}, { value: 2, label: '2s'}, { value: 5, label: '5s'}] }/>
        </div>

        <div style={ sectionStyle }>
          <div style={ applyButtonStyle }
               onClick={ this.props.onSave }>
            Apply
          </div>
        </div>
      </div>
    );
  }
}

export default QuickEdit;
