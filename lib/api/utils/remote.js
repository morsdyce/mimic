import Emitter from 'api/emitter';
import MockedRequests from 'api/mocked-requests';
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
    socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload: API.mockedRequests });
    API.on(EVENTS.STORAGE_PERSIST, () => socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload: API.mockedRequests }));
  });

  const channel = socket.subscribe('mimic-message');

  channel.watch(function (message) {

    if (message.type === EVENTS.REQUEST_CAPTURED) {
      onRequestCaptured(message);
    }

    if (message.type === 'MIMIC_SET_MOCKED_REQUESTS') {
      onSetData(message);
    }

    if (message.type === EVENTS.GET_MOCKED_REQUESTS) {
      socket.emit('mimic-message', { type: EVENTS.MIMIC_SET_DATA, payload: API.mockedRequests });
    }
  });
}

function onRequestCaptured(message) {
  const { mockId, request, response } = message.payload;
  const mock = MockedRequests.getMockedRequest(mockId);

  if (mock) {
    request.mock = mock;
  }

  Requests.capture(request, response);
  Emitter.emit(EVENTS.REQUEST_CAPTURED);
}

function onSetData(message) {
  MockedRequests.setMockedRequests(message.payload);
  Emitter.emit(EVENTS.MOCKED_REQUEST_CHANGE);
}
