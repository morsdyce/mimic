import { API } from 'api';
import { FETCH_CAPTURED_REQUESTS, FETCH_SCENARIOS } from 'ui/constants/action-types';
import { fetchCapturedRequestsSuccess, fetchScenariosSuccess } from 'ui/actions/api';

export function APIMiddleware({ dispatch, getState }) {
  return next => action => {

    console.log(action);

    switch (action.type) {

      case FETCH_CAPTURED_REQUESTS:
        console.log('FETCH CAPTURED REQUESTS', API.capturedRequests);
        return dispatch(fetchCapturedRequestsSuccess(API.capturedRequests));

      case FETCH_SCENARIOS:
        console.log('FETCH SCeNARIOS', API.scenarios);
        return dispatch(fetchScenariosSuccess(API.scenarios));
    }


    return next(action);
  }
}
