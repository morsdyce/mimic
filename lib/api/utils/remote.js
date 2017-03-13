import assign from 'lodash/assign';
import Emitter from 'api/emitter';
import Mocks from 'api/mocks';
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
  const socket = socketCluster.connect(assign({}, defaultSocketOptions, options));

  socket.on('error', function () {
    console.error('Unable to connect to Mimic Remote. Is it running?');
  });

  socket.on('connect', () => {
    const getPayload = () => ({ mocks: API.mocks, groups: API.groups });
    
    socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload: getPayload() });
    API.on(EVENTS.STORAGE_PERSIST, () => socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload: getPayload() }));
  });

  const channel = socket.subscribe('mimic-message');

  channel.watch(function (message) {

    if (message.type === EVENTS.PENDING_REQUEST_CAPTURED) {
      onPendingRequestCaptured(message);
    }

    if (message.type === EVENTS.SET_RESPONSE) {
      setResponse(message);
    }

    if (message.type === EVENTS.REQUEST_CAPTURED) {
      onRequestCaptured(message);
    }

    if (message.type === 'MIMIC_SET_MOCKED_REQUESTS') {
      onSetData(message);
    }

    if (message.type === EVENTS.GET_MOCKED_REQUESTS) {
      const payload = { mocks: API.mocks, groups: API.groups };
      socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload });
    }
  });
}

function onPendingRequestCaptured(message) {
  const { request } = message.payload;

  Requests.capturePending(request);
  Emitter.emit(EVENTS.PENDING_REQUEST_CAPTURED, { requestId: request.id });
}

function onRequestCaptured(message) {
  const { mockId, request, response } = message.payload;
  const mock = Mocks.find({ id: mockId });

  if (mock) {
    request.mock = mock;
  }

  Requests.capture(request, response);
  Emitter.emit(EVENTS.REQUEST_CAPTURED, { requestId: request.id });
}

function setResponse(message) {
  const { request, response } = message.payload;

  Requests.setResponse(request.id, response, request.startTime);
  Emitter.emit(EVENTS.RESPONSE_RECEIVED, { requestId: request.id });
}

function onSetData(message) {
  Mocks.setMocks(message.payload);
  Emitter.emit(EVENTS.UPDATE_MOCK);
}
