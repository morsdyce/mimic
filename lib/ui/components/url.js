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
    const queryString = parts[1] ? `?${parts[1]}` : null;

    return (
      <span>
        { url }
        <span className="query">{ queryString }</span>
      </span>
    )
  }

  _getPencilEdit() {
    return this.props.pencilEdit ?
      <i className="fa fa-pencil" onClick={ this.props.pencilEdit }></i> :
      ''
  }

  render() {
    return (
      <div className="url" title={ this.props.url }>
        { this._getFormattedUrl() }
        { this._getPencilEdit() }
      </div>
    );
  }
}
