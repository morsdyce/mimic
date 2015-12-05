import React from 'react';

import { StatusCodeField } from 'ui/components/response-fields/status-code-field';
import { DelayField } from 'ui/components/response-fields/delay-field';
import { ResponseHeadersField } from 'ui/components/response-fields/response-headers-field';
import { ResponseBodyField } from 'ui/components/response-fields/response-body-field';

export class ResponseDetails extends React.Component {

  static get propTypes() {
    return {
      response: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func,
      readOnly: React.PropTypes.bool
    }
  }

  _updateField(field, value) {
    const newValue = Object.assign({}, this.props.response, { [field]: value });

    this.props.onChange(newValue);
  }

  render() {
    const { response, readOnly } = this.props;

    return (
      <div className="response-details">
        <h4>Response</h4>

        <StatusCodeField value={ Number(response.status) }
                         onChange={ this._updateField.bind(this, 'status') }
                         readOnly={ readOnly }/>

        <DelayField value={ Number(response.delay) }
                    onChange={ this._updateField.bind(this, 'delay') }
                    readOnly={ readOnly }/>

        <ResponseHeadersField value={ response.headers }
                              onChange={ this._updateField.bind(this, 'headers') }
                              readOnly={ readOnly }/>

        <ResponseBodyField value={ response.body }
                           onChange={ this._updateField.bind(this, 'body') }
                           readOnly={ readOnly }/>
      </div>
    );
  }

}
