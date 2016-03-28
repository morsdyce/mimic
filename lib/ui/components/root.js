import React from 'react';
import { Provider } from 'react-redux';

import { Layout } from 'ui/components/layout';
import { store } from 'ui/store/store';
import { syncAPI } from 'ui/store/api-sync';

syncAPI(store);

window.parent.store = store;

export const Root = () => (
  <Provider store={ store }>
    <Layout />
  </Provider>
);
