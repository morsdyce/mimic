import 'ui/assets/stylesheets/components/scenario-search.scss';
import React from 'react';
import { Paper, TextField } from 'material-ui';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

export const ScenarioSearch = () => (
  <div className="scenario-search">
    <TextField
      fullWidth={ true }
      floatingLabelText="Search"
    />
  </div>
);
