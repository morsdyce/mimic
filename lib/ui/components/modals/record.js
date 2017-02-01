import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import reactSelect from 'react-select/dist/react-select.css';
import applicationCss from 'ui/assets/stylesheets/application.scss';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import { record } from 'ui/actions/api';

let styles = {
  __html: `
  <style>
    ${ reactSelect.toString() }
    ${ applicationCss.toString() }
  </style>
`
};

export class Record extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      /**
       * @type {string}
       */
      scenarioId: null,
    };
  }

  render() {
    const { scenarios, open, onRequestClose, setRecording } = this.props;
    const { scenarioId } = this.state;
    const actions = [
      <RaisedButton
        backgroundColor="red"
        labelColor="white"
        disabled={!scenarioId}
        onTouchTap={() => {
          record({ scenarioId });
          setRecording();
          onRequestClose();
        }}
        label="record" />,
    ];
    return <Dialog {...{ open, onRequestClose }} style={{ zIndex: 2147483646 }} actions={actions}>
      <div dangerouslySetInnerHTML={ styles }></div>
      <Select value={scenarioId} options={scenarios.map(scenario => ({ value: scenario.id, label: scenario.name }))} onChange={scenarioId => this.setState({ scenarioId })} />
    </Dialog>;
  }
}

Record.propTypes = {
  scenarios: PropTypes.array,
  record: PropTypes.func,
  open: PropTypes.bool,
  close: PropTypes.func,
};

export default connect(
  ({ scenarios }) => ({ scenarios }),
  { record }
)(Record);