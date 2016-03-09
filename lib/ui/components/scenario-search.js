import 'ui/assets/stylesheets/components/scenario-search.scss';

import React from 'react';
import Paper from 'material-ui/lib/paper';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import TextField from 'material-ui/lib/text-field';

export const ScenarioSearch = () => (
  <div className="scenario-search">
    <TextField
      fullWidth={ true }
      floatingLabelText="Search"
    />
  </div>
);

//<Paper zDepth={2}>
//  <input type="text" />
//  <SearchIcon className="search-icon" />
//</Paper>
