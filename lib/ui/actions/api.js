import { FETCH_CAPTURED_REQUESTS, FETCH_CAPTURED_REQUESTS_SUCCESS } from 'ui/constants/action-types';

export function fetch() {
  return { type: FETCH_CAPTURED_REQUESTS };
}

export function receive(payload) {
  return { type: FETCH_CAPTURED_REQUESTS_SUCCESS, payload };
}