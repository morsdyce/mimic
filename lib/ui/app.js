import ReactDOM from 'react-dom';
import React from 'react';

import { ImportExport } from './components/import-export';

class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>Shredder UI</h1>
        <ImportExport />
      </div>
    );
  }
}

export class App {

  static bootstrap() {
    let shredderFrame = document.createElement('div');
    document.body.appendChild(shredderFrame);

    ReactDOM.render(<Root />, shredderFrame);

    shredderFrame = undefined;
  }

}
