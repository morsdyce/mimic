import API from 'api';
import bootstrapUI from 'ui';

// bootstrap UI
bootstrapUI(API);

// export API
export const api = API;
export default API;

// Run web worker request in development
if (__ENV === 'development') {
  const RequestWorker = require('worker-loader!./worker_example');
  const requestWorker = new RequestWorker();

  API.bootstrapWorker(requestWorker);
}
