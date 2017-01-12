import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton from 'material-ui/lib/radio-button';
import Checkbox from 'material-ui/lib/checkbox';
import ExportButton from 'ui/components/export-button';
import Select from 'react-select';
import reactSelect from 'react-select/dist/react-select.css';
import applicationCss from 'ui/assets/stylesheets/application.scss';
import { connect } from 'react-redux';
import { find, get } from 'lodash';

let styles = {
  __html: `
  <style>
    ${ reactSelect.toString() }
    ${ applicationCss.toString() }
  </style>
`
};

const mockOption = ({ method, url, params }) => (
  <div>
    <p style={{ margin: 0 }}>{method} ({url})</p>
    <p style={{ margin: 0 }}>{params}</p>
  </div>
);

const mockValue = ({ method, url, params }) => (
  <div>
    <p style={{ margin: 0 }}>{method} ({url}) {params}</p>
  </div>
);

export class ExportModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exportType: 'all',
      filename: 'mimic',
      prettify: false,
      selectedScenario: 'default-scenario',
      selectedMock: null
    }
  }

  onFilenameChange(event) {
    this.setState({ filename: event.target.value });
  }

  onPrettifyChange(event) {
    this.setState({ prettify: event.target.checked });
  }

  onExportTypeChange(event) {
    const newState = {
      exportType: event.target.value,
      selectedScenario: 'default-scenario'
    };

    this.setState(newState);
  }

  onScenarioChange(value) {
    this.setState({ selectedScenario: value });
  }

  onMockChange(mockId) {
    this.setState({ selectedMock: mockId });
  }

  handleSubmit() {
    if (this.props.onConfirm) {
      this.props.onConfirm(this.state.scenarioName);
    }

    this.props.onClose();
  }

  handleScenarioChange(event) {
    this.setState({ scenarioName: event.target.value });
  }

  renderScenarioSelect() {
    if (this.state.exportType === 'all') {
      return;
    }

    const options = this.props.scenarios.map((scenario) => ({
      value: scenario.id,
      label: scenario.name
    }));

    return (
      <div style={{ margin: '10px 0'}}>
        <label>Selected Scenario</label>
        <Select
          value={ this.state.selectedScenario }
          onChange={ this.onScenarioChange.bind(this) }
          options={options}
          multi={ this.state.exportType === 'scenarios' }
          key={ this.state.exportType === 'scenarios' }
        />
      </div>
    );
  }

  renderMockSelect() {
    if (this.state.exportType !== 'mocks') {
      return;
    }

    const currentScenario = find(this.props.scenarios, { id: this.state.selectedScenario });
    const options = get(currentScenario, 'mockedRequests', [])
      .map((mockedRequest) => ({
        value: mockedRequest.id,
        method: mockedRequest.method,
        url: mockedRequest.url,
        params: mockedRequest.params
      }));

    return (
      <div style={{ margin: '10px 0'}}>
        <label>Selected Mock</label>
        <Select
          value={ this.state.selectedMock }
          onChange={ this.onMockChange.bind(this) }
          placeholder="Select Mock"
          disabled={ !this.state.selectedScenario }
          optionRenderer={ mockOption }
          valueRenderer={ mockValue }
          options={options}
          multi
        />
      </div>
    )
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={ this.props.onClose }
      />,
      <ExportButton
        filename={ this.state.filename }
        prettify={ this.state.prettify }
        scenarioId={ this.state.selectedScenario }
        mockId={ this.state.selectedMock }
        mode={ this.state.exportType }
        label="Export"
        primary={true}
        onClick={ this.handleSubmit.bind(this) }
      />
    ];

    return (
      <div>
        <Dialog
          style={{ zIndex: 2147483646 }}
          title="Export"
          actions={ actions }
          modal={ false }
          open={ this.props.open }
          onRequestClose={ this.props.onClose }>
          <div dangerouslySetInnerHTML={ styles }></div>

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <RadioButtonGroup name="ExportType" valueSelected={ this.state.exportType } onChange={ this.onExportTypeChange.bind(this) }>
              <RadioButton value="all" label="All" style={{ display: 'inline-block', width: '200px' }} />
              <RadioButton value="scenarios" label="Scenarios" style={{ display: 'inline-block', width: '200px' }} />
              <RadioButton value="mocks" label="Mocks" style={{ display: 'inline-block', width: '200px' }} />
            </RadioButtonGroup>
          </div>

          { this.renderScenarioSelect() }
          { this.renderMockSelect() }

          <TextField value={ this.state.filename } onChange={ this.onFilenameChange.bind(this) } floatingLabelText="Filename" style={{ width: '100%' }} />
          <Checkbox checked={ this.state.prettify } onCheck={ this.onPrettifyChange.bind(this) } label="Prettify Output" />
        </Dialog>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  scenarios: state.scenarios
});

export default connect(mapStateToProps, null)(ExportModal);
