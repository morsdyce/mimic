import { FETCH_CAPTURED_REQUESTS, FETCH_CAPTURED_REQUESTS_SUCCESS, FETCH_SCENARIOS, FETCH_SCENARIOS_SUCCESS } from 'ui/constants/action-types';

export function fetch() {
  return { type: FETCH_CAPTURED_REQUESTS };
}

export function fetchCapturedRequestsSuccess(payload) {
  return { type: FETCH_CAPTURED_REQUESTS_SUCCESS, payload };
}

export function fetchScenarios() {
  return { type: FETCH_SCENARIOS };
}

export function fetchScenariosSuccess(payload) {
  return { type: FETCH_SCENARIOS_SUCCESS, payload };
}

