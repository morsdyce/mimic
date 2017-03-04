import MocksState from 'ui/states/MocksState';
import RequestLogState from 'ui/states/RequestLogState';

export const filterMocksByType = (mock) => {
  const status = mock.response.status;

  switch (MocksState.filter) {
    case 'Mocked':
      return !!mock.active;

    case 'Unmocked':
      return !mock.active;

    case 'Successful':
      return status < 400 || status >= 600;

    case 'Failing':
      return status >= 400 && status < 600;

    default:
      return true;
  }
};


export const filterLogByType = (request) => {
  const status = request.response.status || 0;

  switch (RequestLogState.filter) {
    case 'Mocked':
      return !!request.mock;

    case 'Unmocked':
      return !request.mock;

    case 'Successful':
      return status < 400 || status >= 600;

    case 'Failing':
      return status >= 400 && status < 600;

    default:
      return true;
  }
};
