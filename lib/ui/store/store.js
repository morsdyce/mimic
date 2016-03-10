import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from 'ui/reducers';

import { APIMiddleware } from 'ui/middleware/api';

export const store = createStore(rootReducer, applyMiddleware(APIMiddleware));

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('ui/reducers', () => {
    const nextReducer = require('ui/reducers');
    store.replaceReducer(nextReducer);
  });
}
