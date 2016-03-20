import { API } from 'api';
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
  REMOVE_MOCK
} from 'ui/constants/action-types';
import { fetchCapturedRequestsSuccess, fetchScenariosSuccess, fetch } from 'ui/actions/api';

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

      case FETCH_SCENARIOS_SUCCESS:
        console.log('fetch scenarios success');
        return;

      case MOCK_REQUEST:
        console.log('mock request', action.payload.request.url);
        return API.mockRequest(action.payload.scenarioId, action.payload.request);

      case CREATE_NEW_SCENARIO:
        console.log('creating new scenario');
        return API.addScenario('New ScenarioOverview');

      case TOGGLE_SCENARIO:
        console.log('toggling scenario', action.payload.id);
        return API.toggleScenario(action.payload.id);

      case DUPLICATE_SCENARIO:
        console.log('duplicating scenario', action.payload.id);
        return API.duplicateScenario(action.payload.id);

      case REMOVE_SCENARIO:
        console.log('removing scenario', action.payload.id);
        return API.removeScenario(action.payload.id);

      case RENAME_SCENARIO:
        console.log('renaming scenario', action.payload);
        return API.renameScenario(action.payload.id, action.payload.name);

      case TOGGLE_REQUEST:
        console.log('toggling mocked request', action.payload);
        return API.toggleMockedRequest(action.payload.scenarioId, action.payload.mockId);

      case UPDATE_MOCK:
        console.log('updating mocked request', action.payload);
        const { scenarioId, mockId, request } = action.payload;
        return API.updateMockedRequest(scenarioId, mockId, request);

      case REMOVE_MOCK:
        console.log('removing mock request', action.payload);
        return API.removeMockedRequest(action.payload.scenarioId, action.payload.mockId);
    }

    return next(action);
  }
}
