import { NAVIGATE } from 'ui/constants/action-types';

export function navigateToMock(payload) {
  payload = { to: 'mock', params: payload };
  return { type: NAVIGATE, payload };
}

export function navigateToScenarios(payload) {
  payload = { to: 'scenarios', params: {} };
  return { type: NAVIGATE, payload };
}

export function navigate(component, payload) {
  return { type: NAVIGATE, component, payload };
}
