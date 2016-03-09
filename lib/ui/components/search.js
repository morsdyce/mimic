import 'ui/assets/stylesheets/components/search.scss';

import React from 'react';
import Paper from 'material-ui/lib/paper';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

export const Search = () => (
  <div className="search">
    <Paper zDepth={2}>
      <input type="text" />
      <SearchIcon className="search-icon" />
    </Paper>
  </div>
);
