import { API } from 'api';
import { FETCH_CAPTURED_REQUESTS, FETCH_SCENARIOS, MOCK_REQUEST, CREATE_NEW_SCENARIO } from 'ui/constants/action-types';
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
    }

    return next(action);
  }
}
