import MocksState from 'ui/states/MocksState';
import RequestLogState from 'ui/states/RequestLogState';
import EXCLUDED_URLS from 'ui/constants/excluded-urls';

export const filterMocksByType = (mock) => {
  const status = mock.response.status;

  switch (MocksState.filter) {
    case 'Active':
      return !!mock.isActive;

    case 'Inactive':
      return !mock.isActive;

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

export const glob = (pattern, input) => {
  return pattern.test(input);
}

export const filterByIgnoreList = (request) => {
  const hasMatch = EXCLUDED_URLS.some((ignorePattern) => {
    return glob(ignorePattern, request.url)
  })
  return !hasMatch;
}
