import { API } from 'api/index';
import { DropTarget } from 'react-dnd';
import React from 'react';

import DRAG_SOURCE_TYPES from 'api/constants/drag-source-types';

const dropContract = {
  drop(props, monitor) {
    API.addMockedRequestToScenario(props.scenario.id, monitor.getItem().requestId);
  }
};

function mapDNDToProps(connect) {
  return {
    dropTarget: connect.dropTarget()
  }
}

@DropTarget(DRAG_SOURCE_TYPES.MOCKED_REQUEST, dropContract, mapDNDToProps)
export class ScenarioName extends React.Component {

  static get propTypes() {
    return {
      scenario: React.PropTypes.object.isRequired,
      onSelectScenario: React.PropTypes.func
    }
  }

  _removeScenario(scenarioId) {
    API.removeScenario(scenarioId);
  }

  _duplicateScenario(scenarioId) {
    API.duplicateScenario(scenarioId);
  }

  _selectScenario(scenarioId) {
    API.setCurrentScenario(scenarioId);

    this.props.onSelectScenario();
  }

  render() {
    const { id, name } = this.props.scenario;

    return this.props.dropTarget(
      <li onClick={ this._selectScenario.bind(this, id) }>
        { name }
        <button onClick={ this._duplicateScenario.bind(this, id) }>Duplicate</button>
        <button onClick={ this._removeScenario.bind(this, id) }>Remove</button>
      </li>
    );
  }

}
