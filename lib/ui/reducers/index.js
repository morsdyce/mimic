import { combineReducers } from 'redux';
import { capturedRequests } from 'ui/reducers/captured-requests';
import { scenarios } from 'ui/reducers/scenarios';

export const rootReducer = combineReducers({
  capturedRequests,
  scenarios
});
