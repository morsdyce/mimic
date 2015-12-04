import React from 'react';

import { MethodLabel } from 'ui/components/method-label';
import { Url } from 'ui/components/url';

export class RequestDetails extends React.Component {

  static get propTypes() {
    return {
      request: React.PropTypes.object.isRequired,
      onParamChange: React.PropTypes.func,
      readOnly: React.PropTypes.bool
    }
  }

  _changeParam(paramKey, event) {
    this.props.onParamChange(paramKey, event.target.value);
  }

  _parameter(paramKey) {
    if (this.props.readOnly) {
      return (
        <div key={ paramKey }>
          { paramKey }: { this.props.request.params[paramKey] }
        </div>
      );
    }

    return (
      <div key={ paramKey }>
        { paramKey }:
        <input type="text"
               onChange={ this._changeParam.bind(this, paramKey) }
               value={ this.props.request.params[paramKey] }/>
      </div>
    );
  }

  _parameters() {
    const paramKeys = Object.keys(this.props.request.params);

    if (!paramKeys.length) {
      return null;
    }

    return (
      <div>
        Parameters:
        { paramKeys.map((key) => this._parameter(key)) }
      </div>
    );
  }

  render() {
    const { method, url } = this.props.request;

    return (
      <div>
        <h4>Request</h4>

        <div>
          <MethodLabel method={ method } />
          <Url url={ url }/>
        </div>

        { this._parameters() }
      </div>
    );
  }

}
