import 'codemirror/lib/codemirror.css';

import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

export const Editor = ({ mode, onChange, value }) => {

  const options = {
    lineNumbers: true,
    mode
  };

  return <CodeMirror value={ value } onChange={ onChange } options={ options }/>;
};