import React from 'react';

import { StatusCodeField } from 'ui/components/response-fields/status-code-field';
import { DelayField } from 'ui/components/response-fields/delay-field';
import { ResponseHeadersField } from 'ui/components/response-fields/response-headers-field';
import { ResponseBodyField } from 'ui/components/response-fields/response-body-field';

export class ResponseDetails extends React.Component {

  static get propTypes() {
    return {
      response: React.PropTypes.object.isRequired,
      onParamChange: React.PropTypes.func,
      readOnly: React.PropTypes.bool
    }
  }

  render() {
    const { response, readOnly } = this.props;

    return (
      <div>
        <h3>Response</h3>

        <StatusCodeField value={ response.status } readOnly={ readOnly }/>
        <DelayField value={ response.delay } readOnly={ readOnly }/>
        <ResponseHeadersField value={ response.headers } readOnly={ readOnly }/>
        <ResponseBodyField value={ response.body } readOnly={ readOnly }/>
      </div>
    );
  }

}
