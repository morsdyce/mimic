import { NAVIGATE } from 'ui/constants/action-types';

export function navigate(component, payload) {
  return { type: NAVIGATE, component, payload };
}
