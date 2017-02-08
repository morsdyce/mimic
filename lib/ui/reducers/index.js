import { combineReducers } from 'redux';
import { capturedRequests } from 'ui/reducers/captured-requests';
import { location } from 'ui/reducers/location';

export const rootReducer = combineReducers({
  location,
  capturedRequests
});
