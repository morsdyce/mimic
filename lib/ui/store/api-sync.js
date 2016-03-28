import EVENTS from 'api/constants/events';

import { fetch, fetchScenarios } from 'ui/actions/api';

export function syncAPI({ dispatch }) {

  window.addEventListener('message', (event) => {

    switch (event.data.type) {
      case EVENTS.REQUEST_CAPTURED:
      case EVENTS.MOCKED_REQUESTS_ADD:
        dispatch((fetch()));
        break;

      case EVENTS.SCENARIO_ADD:
      case EVENTS.SCENARIO_CHANGE:
      case EVENTS.IMPORT:
        dispatch(fetchScenarios());
        break;
    }

  }, false);
}
