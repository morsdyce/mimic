import 'ui/assets/stylesheets/components/scenario-search.scss';
import React from 'react';
import TextField from 'material-ui/lib/text-field';

export const ScenarioSearch = () => (
  <div className="scenario-search">
    <TextField
      fullWidth={ true }
      floatingLabelText="Search"
    />
  </div>
);
