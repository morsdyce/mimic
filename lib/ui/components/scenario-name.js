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
      selectedScenarioId: React.PropTypes.string,
      onSelectScenario: React.PropTypes.func
    }
  }

  _removeScenario() {
    API.removeScenario(this.props.scenario.id);
  }

  _duplicateScenario() {
    API.duplicateScenario(this.props.scenario.id);
  }

  _selectScenario() {
    API.setCurrentScenario(this.props.scenario.id);

    this.props.onSelectScenario(this.props.scenario.id);
  }

  _isSelectedScenario() {
    return this.props.scenario.id === this.props.selectedScenarioId;
  }

  _rowClassName() {
    return this._isSelectedScenario()
      ? "name active"
      : "name";
  }

  render() {
    return this.props.dropTarget(
      <li className="scenario-name" onClick={ this._selectScenario.bind(this) }>

        <a className={ this._rowClassName() }>
          { this.props.scenario.name }

          <div className="actions">
            <div className="duplicate"
                 onClick={ this._duplicateScenario.bind(this) }>
              <i className="fa fa-files-o"></i>
            </div>

            <div className="remove"
                 onClick={ this._removeScenario.bind(this) }>
              <i className="fa fa-trash-o"></i>
            </div>
          </div>
        </a>

        {
          this._isSelectedScenario()
            ? <div className="active-arrow"></div>
            : null
        }

      </li>
    );
  }

}
