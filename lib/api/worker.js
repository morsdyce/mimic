import EVENTS from 'api/constants/events';
import WebWorkerInterceptor from 'api/interceptors/web-worker-interceptor';

const interceptor = new WebWorkerInterceptor();

self.addEventListener('message', (event) => {
  if (event.data.type === EVENTS.MIMIC_TURN_ON) {
    event.stopImmediatePropagation();
    interceptor.enable();
  }

  if (event.data.type === EVENTS.MIMIC_TURN_OFF) {
    event.stopImmediatePropagation();
    interceptor.disable();
  }
});
