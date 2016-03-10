import { API } from 'api';
import { FETCH_CAPTURED_REQUESTS, GET_CAPTURED_REQUESTS } from 'ui/constants/action-types';
import { receive } from 'ui/actions/api';

export function APIMiddleware({ dispatch, getState }) {
  return next => action => {

    switch(action.type) {
      case FETCH_CAPTURED_REQUESTS:
        //debugger;
        console.log('FETCH CAPTURED REQUESTS', API.capturedRequests);
        return dispatch(receive(API.capturedRequests));
    }


    return next(action);
  }
}