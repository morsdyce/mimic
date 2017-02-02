import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RecordIcon from 'material-ui/lib/svg-icons/av/fiber-manual-record';
import { stopRecording } from 'ui/actions/api';
import RecordModal from 'ui/components/modals/record';

export class RecordButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      recording: false,
    };

    this.handleClick      = this.handleClick.bind(this);
    this.startRecording   = this.startRecording.bind(this);
    this.closeRecordModal = this.closeRecordModal.bind(this);
  }

  handleClick() {
    const { stopRecording } = this.props;

    if (!this.state.recording) {
      this.setState({
        open: true
      });

      return;
    }

    stopRecording();
    this.setState({
      recording: false
    });
  }

  startRecording() {
    this.setState({ recording: true });
  }

  closeRecordModal() {
    this.setState({ open: false });
  }

  render() {
    const { open, recording } = this.state;
    return (
      <div className="col-xs-3 import cursor-pointer"
           onClick={ this.handleClick }>
        <div className="row center-xs">
          <div className="col-xs-12">
            <RecordIcon style={{ fill: recording ? 'red' : 'white' }}/>
          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs-12">
            { recording ? 'Stop Recording' : 'Record' }
          </div>
        </div>
        <RecordModal
          open={ open }
          setRecording={ this.startRecording }
          onRequestClose={ this.closeRecordModal }/>
      </div>
    );
  }
}

RecordButton.propTypes = {
  stopRecording: PropTypes.func,
};

const mapStateToProps = (state) => ({
  scenarios: state.scenarios
});

export default connect(mapStateToProps, { stopRecording })(RecordButton);
