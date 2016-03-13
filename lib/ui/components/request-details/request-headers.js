import React from 'react';

import { AutoComplete, TextField, List } from 'material-ui';



export const RequestHeaders = ({headers, onChange}) => {


  return (
    <div>
      <div style={{ margin: '10px 0'}}>
        { headerList }
      </div>
    </div>
  );

};
