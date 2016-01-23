import { API } from 'api';
import bootstrapUI from 'ui';

// bootstrap UI
bootstrapUI();

// expose on window
if (window) {
  if (window.bdsm) {
    console.warn('bdsm already defined on window, not overriding');
  } else {
    window.bdsm = {api};
  }
}

// export API
export const api = API;
