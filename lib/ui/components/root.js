import React from 'react';
import { Provider } from 'react-redux';

import { Layout } from 'ui/components/layout';
import { store } from 'ui/store/store';


export const Root = () => (
  <Provider store={ store }>
    <Layout />
  </Provider>
);
