import { API } from 'api';
import { APIBridge } from 'ui/utils/api';

import {
  FETCH_CAPTURED_REQUESTS,
  FETCH_SCENARIOS,
  FETCH_SCENARIOS_SUCCESS,
  MOCK_REQUEST,
  CREATE_NEW_SCENARIO,
  TOGGLE_SCENARIO,
  DUPLICATE_SCENARIO,
  REMOVE_SCENARIO,
  RENAME_SCENARIO,
  TOGGLE_REQUEST,
  UPDATE_MOCK,
  REMOVE_MOCK,
  IMPORT
} from 'ui/constants/action-types';
import { fetchCapturedRequestsSuccess, fetchScenariosSuccess, fetch } from 'ui/actions/api';

export function APIMiddleware({ dispatch, getState }) {
  return next => action => {

    switch (action.type) {
      case FETCH_CAPTURED_REQUESTS:
        APIBridge.get('capturedRequests')
          .then((response) => dispatch(fetchCapturedRequestsSuccess(response)));
        break;

      case FETCH_SCENARIOS:
        APIBridge.get('scenarios')
          .then((response) => dispatch(fetchScenariosSuccess(response)));
        break;

      case MOCK_REQUEST:
        APIBridge.set('mockRequest', action.payload);
        break;

      case CREATE_NEW_SCENARIO:
        APIBridge.set('addScenario', [ action.payload.name ]);
        break;

      case TOGGLE_SCENARIO:
        APIBridge.set('toggleScenario', [ action.payload.id ]);
        break;

      case DUPLICATE_SCENARIO:
        APIBridge.set('duplicateScenario', [ action.payload.id ]);
        break;

      case REMOVE_SCENARIO:
        APIBridge.set('removeScenario', [ action.payload.id ]);
        break;

      case RENAME_SCENARIO:
        APIBridge.set('renameScenario', [ action.payload.id, action.payload.name ]);
        break;

      case TOGGLE_REQUEST:
        APIBridge.set('toggleMockedRequest', [ action.payload.scenarioId, action.payload.mockId ]);
        break;

      case UPDATE_MOCK:
        const { scenarioId, mockId, request } = action.payload;
        APIBridge.set('updateMockedRequest', [ scenarioId, mockId, request ]);
        break;

      case REMOVE_MOCK:
        APIBridge.set('removeMockedRequest', [ action.payload.scenarioId, action.payload.mockId ]);
        break;

      case IMPORT:
        APIBridge.set('import', [ action.payload.data ]);
        break;
    }

    return next(action);
  }
}
