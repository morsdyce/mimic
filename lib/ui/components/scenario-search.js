import 'ui/assets/stylesheets/components/scenario-search.scss';
import React from 'react';
import TextField from 'material-ui/TextField';

export const ScenarioSearch = () => (
  <div className="scenario-search">
    <TextField
      fullWidth={ true }
      floatingLabelText="Search"
    />
  </div>
);
