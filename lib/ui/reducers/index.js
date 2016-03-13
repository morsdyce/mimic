import { combineReducers } from 'redux';
import { capturedRequests } from 'ui/reducers/captured-requests';
import { scenarios } from 'ui/reducers/scenarios';
import { location } from 'ui/reducers/location';

export const rootReducer = combineReducers({
  location,
  capturedRequests,
  scenarios
});
