import {
  FETCH_CAPTURED_REQUESTS,
  FETCH_CAPTURED_REQUESTS_SUCCESS,
  RECORD,
  STOP_RECORDING,
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
  REMOVE_MOCK,
  IMPORT
} from 'ui/constants/action-types';

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

export function record() {
  return { type: RECORD };
}

export function stopRecording() {
  return { type: STOP_RECORDING };
}

export function mockRequest(scenarioId, request) {
  return { type: MOCK_REQUEST, payload: { scenarioId, request} };
}

export function updateMock(scenarioId, mockId, request) {
  return { type: UPDATE_MOCK, payload: { scenarioId, mockId, request } };
}

export function createNewScenario(name) {
  return { type: CREATE_NEW_SCENARIO, payload: { name } };
}

export function toggleScenario(id) {
  return { type: TOGGLE_SCENARIO, payload: { id } }
}

export function duplicateScenario(id) {
  return { type: DUPLICATE_SCENARIO, payload: { id } };
}

export function removeScenario(id) {
  return { type: REMOVE_SCENARIO, payload: { id } };
}

export function renameScenario(id, name) {
  return { type: RENAME_SCENARIO, payload: { id, name } };
}

export function toggleMock(scenarioId, mockId) {
  return { type: TOGGLE_REQUEST, payload: { scenarioId, mockId } };
}

export function removeMock(scenarioId, mockId) {
  return { type: REMOVE_MOCK, payload: { scenarioId, mockId } };
}

export function importScenarios(data) {
  return { type: IMPORT, payload: { data } };
}