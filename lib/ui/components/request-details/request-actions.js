import React from 'react';

import { RaisedButton, SelectField, MenuItem } from 'material-ui';
import Select from 'react-select';

export const RequestActions = ({ onCancel, onSave, onChange, scenarios, mocked, selectedScenario }) => {

  const scenarioList = scenarios.map((scenario) => ({ label: scenario.name, value: scenario.id }));

  const saveButtonLabel = mocked ? 'Save' : 'Mock';

  return (
    <div className="row action-buttons">

      <div className="col-xs-4">

        <Select value={ selectedScenario }
                options={ scenarioList }
                onChange={ onChange }
                clearable={ false }/>
      </div>

      <div className="col-xs-3 col-xs-offset-5">
        <div className="row around-xs end-xs">
          <div className="col-xs-6">
            <RaisedButton label="Cancel" secondary={ true } onClick={ onCancel }/>
          </div>
          <div className="col-xs-6">
            <RaisedButton label={ saveButtonLabel } primary={ true } onClick={ onSave }/>
          </div>
        </div>
      </div>
    </div>
  );
}
