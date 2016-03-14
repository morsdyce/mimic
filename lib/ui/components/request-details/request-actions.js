import React from 'react';

import { RaisedButton, SelectField, MenuItem } from 'material-ui';

export const RequestActions = ({ onCancel, onSave, onChange, scenarios, mocked }) => {

  const scenarioList = scenarios.map((scenario) =>
    <option key={ scenario.id } value={ scenario.id }>{ scenario.name }</option>);

  const saveButtonLabel = mocked ? 'Save' : 'Mock';

  return (
    <div className="row action-buttons">

      <div className="col-xs-10">
        <select onChange={ onChange }>
          { scenarioList }
        </select>
      </div>

      <div className="col-xs-1">
        <RaisedButton label="Cancel" secondary={ true } onClick={ onCancel }/>
      </div>

      <div className="col-xs-1">
        <RaisedButton label={ saveButtonLabel } primary={ true } onClick={ onSave }/>
      </div>
    </div>
  );
}
