import EVENTS from 'api/constants/events';

import { fetch, fetchMockedRequests } from 'ui/actions/api';

export function syncAPI({ dispatch }) {

  window.onAPIMessage = (message) => {
    switch (message.type) {
      case EVENTS.REQUEST_CAPTURED:
      case EVENTS.ADD_MOCKED_REQUEST:
        dispatch((fetch()));
        break;

      case EVENTS.MOCKED_REQUEST_CHANGE:
      case EVENTS.IMPORT:
      case EVENTS.STORAGE_PERSIST:
        dispatch(fetchMockedRequests());
        dispatch((fetch()));
        break;
    }
  };
}
