import React from 'react';
import { Provider } from 'react-redux';

import { Layout } from 'ui/components/layout';
import { store } from 'ui/store/store';
import { syncAPI } from 'ui/store/api-sync';
import { API } from 'api';
import { fetchCapturedRequestsSuccess, fetchScenariosSuccess, fetch } from 'ui/actions/api';

syncAPI(store);

window.parent.store = store;

setTimeout(() => { store.dispatch(fetchCapturedRequestsSuccess(API.capturedRequests)); }, 2000);

export const Root = () => {
  return (
    <Provider store={ store }>
      <Layout />
    </Provider>
  );
}
