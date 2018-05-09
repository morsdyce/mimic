import API from 'api';
import WebInterceptor from 'api/interceptors/web-interceptor';
import EVENTS from 'api/constants/events';
import Mocks from 'api/mocks';
import Groups from 'api/groups';
import { normalizeFormData } from 'api/utils/form-data';

import { getJSONRequest, getJSONResponse } from 'api/utils/normalization';

class RemoteInterceptor extends WebInterceptor {
  constructor() {
    super();
    
    this.initRemoteListeners();
  }

  initRemoteListeners() {
    API.socket.on('error', function (err) {
      console.error('Mimic Remote unable to connect. Please check mimic-remote is running.', err);
    });

    API.socket.on('connect', () => {
      API.socket.emit('mimic-message', { type: EVENTS.GET_MOCKED_REQUESTS });
    });

    const channel = API.socket.subscribe('mimic-message');

    channel.watch((message) => {
      if (message.type === EVENTS.MIMIC_SET_DATA) {
        Mocks.setMocks(message.payload.mocks);
        Groups.setGroups(message.payload.groups);
        this.initialized = true;
      }
    });
  }

  capturePendingRequest(request) {
    const normalizedRequest = normalizeFormData(request);
    API.socket.emit('mimic-message', {
      type: EVENTS.PENDING_REQUEST_CAPTURED,
      payload: {
        request: getJSONRequest(normalizedRequest)
      }
    });
  }

  setRequestMock(id, mock) {
    API.socket.emit('mimic-message', {
      type: EVENTS.SET_REQUEST_MOCK,
      payload: {
        requestId: id,
        mock
      }
    });
  }

  updateCapturedRequest(request, response) {
    API.socket.emit('mimic-message', {
      type: EVENTS.SET_RESPONSE,
      payload: {
        request: getJSONRequest(request),
        response: getJSONResponse(response)
      }
    });
  }

  getMocks() {
    return this.waitForInit()
      .then(() => Mocks.all);
  }

  waitForInit() {
    return new Promise((resolve, reject) => {
      if (this.initialized) {
        return resolve();
      }

      let channel = this.socket.subscribe('mimic-message');

      channel.watch((message) => {
        if (message.type === EVENTS.MIMIC_SET_DATA) {
          this.initialized = true;
          resolve();
        }
      });
    });
  }
}

export default RemoteInterceptor;