import { API } from 'api';
import { APIBridge } from 'ui/utils/api';

import {
  FETCH_CAPTURED_REQUESTS,
  FETCH_MOCKED_REQUESTS,
  RECORD,
  STOP_RECORDING,
  MOCK_REQUEST,
  TOGGLE_REQUEST,
  UPDATE_MOCK,
  REMOVE_MOCK,
  IMPORT
} from 'ui/constants/action-types';
import { fetchCapturedRequestsSuccess, fetchMockedRequestsSuccess } from 'ui/actions/api';

export function APIMiddleware({ dispatch, getState }) {
  return next => action => {

    switch (action.type) {
      case FETCH_CAPTURED_REQUESTS:
        APIBridge.get('capturedRequests')
          .then((response) => dispatch(fetchCapturedRequestsSuccess(response)));
        break;

      case FETCH_MOCKED_REQUESTS:
        APIBridge.get('mockedRequests')
          .then((response) => dispatch(fetchMockedRequestsSuccess(response)));
        break;

      case RECORD:
        APIBridge.set('record', []);
        break;

      case STOP_RECORDING:
        APIBridge.set('stopRecording', []);
        break;

      case MOCK_REQUEST:
        APIBridge.set('mockRequest', [ action.payload.request ]);
        break;

      case TOGGLE_REQUEST:
        APIBridge.set('toggleMockedRequest', [ action.payload.mockId ]);
        break;

      case UPDATE_MOCK:
        const { mockId, request } = action.payload;
        APIBridge.set('updateMockedRequest', [ mockId, request ]);
        break;

      case REMOVE_MOCK:
        APIBridge.set('removeMockedRequest', [ action.payload.mockId ]);
        break;

      case IMPORT:
        APIBridge.set('import', [ action.payload.data ]);
        break;
    }

    return next(action);
  }
}
