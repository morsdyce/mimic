import React from 'react';

export class Url extends React.Component {

  static get propTypes() {
    return {
      url: React.PropTypes.string.isRequired
    }
  }

  _getFormattedUrl() {
    const parts = this.props.url.split('?');
    const url = parts[0];
    const queryString = parts[1];

    return (
      <span>
        { url }
        <span className="query">?{ queryString }</span>
      </span>
    )
  }

  render() {
    return (
      <div className="url" title={ this.props.url }>
        { this._getFormattedUrl() }
      </div>
    );
  }
}
