import { API } from 'api';
import { fetch } from 'ui/actions/api';

export function syncAPI({ dispatch }) {
  API.on('REQUEST_CAPTURED', () => dispatch(fetch()));
}
