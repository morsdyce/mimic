import EVENTS from 'api/constants/events';
import Interceptor from 'api/interceptor';

const interceptor = new Interceptor('worker');

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
