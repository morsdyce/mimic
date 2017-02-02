import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RecordIcon from 'material-ui/lib/svg-icons/av/fiber-manual-record';
import { stopRecording } from 'ui/actions/api';
import RecordModal from 'ui/components/modals/record';

export class RecordButton extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: false,
      recording: false,
    };
  }

  handleClick(e) {
    const { stopRecording } = this.props;
    this.setState(({ recording, open }) => {
      if (recording) {
        stopRecording();
        return { recording: false };
      }
      return { open: !open };
    });
  }

  render() {
    const { open, recording } = this.state;
    return <div className="col-xs-3 import cursor-pointer" onClick={this.handleClick.bind(this)}>
      <div className="row center-xs">
        <div className="col-xs-12">
          <RecordIcon style={{ fill: recording ? 'red' : 'white' }} />
        </div>
      </div>
      <div className="row center-xs">
        <div className="col-xs-12">
          Record
				</div>
      </div>
      <RecordModal
        open={open}
        setRecording={() => this.setState({ recording: true })}
        onRequestClose={() => this.setState({ open: false })} />
    </div>;
  }
}

RecordButton.propTypes = {
  stopRecording: PropTypes.func,
};

export default connect(
  ({ scenarios }) => ({ scenarios }),
  { stopRecording }
)(RecordButton);