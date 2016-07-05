import React, { Component, PropTypes } from 'react';

export const FileDownload = (ComposedComponent) => class FileDownload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: document.createElement('a')
    };

    this.state.link.download = `${this.props.filename}.json`;
  }

  componentWillUnmount() {
    this.state.link.remove();
    this.state.link = undefined;
  }

  export(content) {
    const blob = new Blob([content], { type: 'application/json' });

    this.state.link.href = URL.createObjectURL(blob);
    this.state.link.click();
  }

  render() {
    return <ComposedComponent { ...this.props } performExport={ (content) => this.export(content) }/>
  }
};

FileDownload.propTypes = {
  filename: PropTypes.string.isRequired
};
