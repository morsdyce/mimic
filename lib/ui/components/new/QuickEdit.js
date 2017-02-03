import React from 'react';
import _ from 'lodash';
import HttpStatus from 'http-status-codes';
import CompactSelect from 'ui/components/new/CompactSelect';
import tuneIcon from 'ui/assets/images/tune@2x.png';
import stopwatchIcon from 'ui/assets/images/stopwatch@2x.png';
import selectIcon from 'ui/assets/images/up-down@2x.png';

const containerStyle = {
  display: 'flex',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  zIndex: '999999999999',
  backgroundColor: 'white',
  borderTop: '1px solid #e7e7e7',
  fontSize: '14px',
  height: '25px',
  fontFamily: 'Arial, sans-serif'
};

const sectionStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 6px',
  borderRight: '1px solid #e7e7e7'
};

const responseBodySectionStyle = Object.assign({}, sectionStyle, { flexGrow: 1 });

const responseBodyInputStyle = {
  border: 'none',
  width: '100%',
  fontSize: '12px',
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

const iconStyle = {
  height: '16px'
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
          <img src={ selectIcon } style={ iconStyle } alt="Select"/>
        </div>

        <div style={ sectionStyle }>
          <input type="checkbox"/>
          <CompactSelect options={ _.values(HttpStatus).map((statusCode) => ({ value: statusCode, label: statusCode })) }/>
        </div>

        <div style={ sectionStyle }>
          <CompactSelect options={ [{ value: 'JSON', label: 'JSON'}, { value: 'XML', label: 'XML'}, { value: 'TEXT', label: 'TEXT'}] }/>
        </div>

        <div style={ responseBodySectionStyle }>
          <input type="text"
                 style={ responseBodyInputStyle }
                 placeholder="Response Body"/>
        </div>

        <div style={ sectionStyle }>
          <img src={ stopwatchIcon } style={ iconStyle } alt="Response Delay"/>
          <CompactSelect options={ [{ value: 500, label: '0.5s'}, { value: 1000, label: '1s'}, { value: 2000, label: '2s'}, { value: 5000, label: '5s'}] }/>
        </div>

        <div style={ sectionStyle }>
          <div style={ applyButtonStyle }
               onClick={ this.props.onSave }>
            Apply
          </div>

          <img src={ tuneIcon } style={ iconStyle } alt="Tune Response"/>
        </div>
      </div>
    );
  }
}

export default QuickEdit;
