import React from 'react';

export class Url extends React.Component {

  static get propTypes() {
    return {
      url: React.PropTypes.string.isRequired
    }
  }

  _getMockedState() {
    if (!this.props.mockedState) {
      return null;
    }

    return <b className="margin-left-20">({ this.props.mockedState })</b>
  }

  _getFormattedUrl() {
    const parts = this.props.url.split('?');
    const url = parts[0];
    const queryString = parts[1] ? `?${parts[1]}` : null;

    return (
      <span>
        { url }
        <span className="query">{ queryString }</span>
        { this._getMockedState() }
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
