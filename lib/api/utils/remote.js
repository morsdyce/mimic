import Emitter from 'api/emitter';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';
import socketCluster from 'socketcluster-client';

const defaultSocketOptions = {
  secure: false,
  hostname: 'localhost',
  port: 5000,
  autoReconnect: true,
  autoReconnectOptions: {
    randomness: 30000
  }
};

export function connect(options, API) {
  const socket = socketCluster.connect(Object.assign({}, defaultSocketOptions, options));

  socket.on('error', function () {
    console.error('Unable to connect to Mimic Remote. Is it running?');
  });

  socket.on('connect', () => {
    socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload: API.scenarios });
    API.on(EVENTS.STORAGE_PERSIST, () => socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload: API.scenarios }));
  });

  const channel = socket.subscribe('mimic-message');

  channel.watch(function (message) {

    if (message.type === EVENTS.REQUEST_CAPTURED) {
      onRequestCaptured(message);
    }

    if (message.type === 'MIMIC_SET_SCENARIOS') {
      onSetData(message);
    }

    if (message.type === EVENTS.GET_MOCKED_REQUESTS) {
      socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload: API.scenarios });
    }
  });
}

function onRequestCaptured(message) {
  const { mockId, request, response } = message.payload;
  const mock = Scenarios.findMockById(mockId);

  if (mock) {
    request.mock = mock;
  }

  Requests.capture(request, response);
  Emitter.emit(EVENTS.REQUEST_CAPTURED);
}

function onSetData(message) {
  Scenarios.setScenarios(message.payload);
  Emitter.emit(EVENTS.SCENARIO_CHANGE);
}
