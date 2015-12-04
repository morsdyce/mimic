import { API } from 'api/index';
import { DropTarget } from 'react-dnd';
import React from 'react';
import { ActiveIndicator } from 'ui/components/active-indicator';

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
      selected: React.PropTypes.bool,
      onSelectScenario: React.PropTypes.func
    }
  }

  _removeScenario(e) {
    e.stopPropagation();
    API.removeScenario(this.props.scenario.id);
  }

  _duplicateScenario(e) {
    e.stopPropagation();
    API.duplicateScenario(this.props.scenario.id);
  }

  _selectScenario() {
    this.props.onSelectScenario(this.props.scenario);
  }

  _rowClassName() {
    return this.props.selected
      ? "name active"
      : "name";
  }

  render() {
    return this.props.dropTarget(
      <li className="scenario-name" onClick={ this._selectScenario.bind(this) }>

        <a className={ this._rowClassName() }>
          <ActiveIndicator active={ API.currentScenario === this.props.scenario.id }
                           onEnable={ () => API.setCurrentScenario(this.props.scenario.id) }
                           onDisable={ () => API.setCurrentScenario(null) }/>

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

      </li>
    );
  }

}
