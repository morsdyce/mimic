import { FETCH_CAPTURED_REQUESTS_SUCCESS } from 'ui/constants/action-types';

const initialState = [];

export function capturedRequests(state = initialState, action) {

  switch (action.type) {
    case FETCH_CAPTURED_REQUESTS_SUCCESS:
      return [...action.payload];
  }

  return state;
}