import { API } from 'api';
import {
  FETCH_CAPTURED_REQUESTS,
  FETCH_SCENARIOS,
  MOCK_REQUEST,
  CREATE_NEW_SCENARIO,
  TOGGLE_SCENARIO,
  DUPLICATE_SCENARIO,
  REMOVE_SCENARIO
} from 'ui/constants/action-types';
import { fetchCapturedRequestsSuccess, fetchScenariosSuccess } from 'ui/actions/api';

export function APIMiddleware({ dispatch, getState }) {
  return next => action => {

    console.log(action);

    switch (action.type) {
      case FETCH_CAPTURED_REQUESTS:
        console.log('FETCH CAPTURED REQUESTS', API.capturedRequests);
        return dispatch(fetchCapturedRequestsSuccess(API.capturedRequests));

      case FETCH_SCENARIOS:
        console.log('FETCH SCENARIOS', API.scenarios);
        return dispatch(fetchScenariosSuccess(API.scenarios));

      case MOCK_REQUEST:
        console.log('mock request', action.payload.request.url);
        return API.mockRequest(action.payload.scenarioId, action.payload.request);

      case CREATE_NEW_SCENARIO:
        console.log('creating new scenario');
        return API.addScenario('New Scenario');

      case TOGGLE_SCENARIO:
        console.log('toggling scenario', action.payload.id);
        return API.toggleScenario(action.payload.id);

      case DUPLICATE_SCENARIO:
        console.log('duplicating scenario', action.payload.id);
        return API.duplicateScenario(action.payload.id);

      case REMOVE_SCENARIO:
        console.log('removing scenario', action.payload.id);
        return API.removeScenario(action.payload.id);
    }

    return next(action);
  }
}
