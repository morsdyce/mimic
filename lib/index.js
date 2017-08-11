import API from 'api';
import bootstrapUI from 'ui';
export { Group } from 'api/models/group';
export { Mock } from 'api/models/mock';
export { Request } from 'api/models/request';

// bootstrap UI
bootstrapUI();

// export API
export const api = API;
export default API;

// Run web worker request in development
if (__ENV === 'development') {
  const RequestWorker = require('worker-loader!./worker_example');
  const requestWorker = new RequestWorker();

  API.bootstrapWorker(requestWorker);

  // exposed so the demo page can access it
  window.requestWorker = requestWorker;
}
