import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import Select from 'react-select';

export const RequestActions = ({ onCancel, onSave, onDelete, onChange, onDuplicate, scenarios, mocked, selectedScenario }) => {

  const scenarioList = scenarios.map((scenario) => ({ label: scenario.name, value: scenario.id }));

  const saveButtonLabel = mocked ? 'Save' : 'Mock';

  return (
    <div className="row action-buttons">

      <div className="col-xs-4">

        <Select value={ selectedScenario }
                options={ scenarioList }
                onChange={ onChange }
                clearable={ false } />
      </div>
      <div className="col-xs-2">
        <RaisedButton label={ saveButtonLabel } primary={ true } onClick={ onSave }/>
      </div>

      <div className="col-xs-5 col-xs-offset-1">
        <div className="row end-xs" style={{ paddingRight: mocked ? '3px' : '0'}}>
          <RaisedButton style={{ margin: '0 5px' }} label="Cancel" secondary={ true } onClick={ onCancel }/>
          <RaisedButton style={{ margin: '0 5px' }} label="Duplicate" primary={ true } onClick={ onDuplicate }/>
          { mocked && (<RaisedButton style={{ margin: '0 5px' }} label="Delete" secondary={ true } onClick={ onDelete }/>) }
        </div>
      </div>
    </div>
  );
}
