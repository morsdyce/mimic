import {
  FETCH_CAPTURED_REQUESTS,
  FETCH_CAPTURED_REQUESTS_SUCCESS,
  RECORD,
  STOP_RECORDING,
  FETCH_MOCKED_REQUESTS,
  FETCH_MOCKED_REQUESTS_SUCCESS,
  MOCK_REQUEST,
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

export function fetchMockedRequests() {
  return { type: FETCH_MOCKED_REQUESTS };
}

export function fetchMockedRequestsSuccess(payload) {
  return { type: FETCH_MOCKED_REQUESTS_SUCCESS, payload };
}

export function record(payload) {
  return { type: RECORD, payload };
}

export function stopRecording() {
  return { type: STOP_RECORDING };
}

export function mockRequest(request) {
  return { type: MOCK_REQUEST, payload: { request} };
}

export function updateMock(mockId, request) {
  return { type: UPDATE_MOCK, payload: { mockId, request } };
}

export function toggleMock(mockId) {
  return { type: TOGGLE_REQUEST, payload: { mockId } };
}

export function removeMock(mockId) {
  return { type: REMOVE_MOCK, payload: { mockId } };
}

export function importMockedRequests(data) {
  return { type: IMPORT, payload: { data } };
}
