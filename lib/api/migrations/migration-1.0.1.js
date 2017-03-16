import isObject from 'lodash/isObject';
import isArray  from 'lodash/isArray';
import assign from 'lodash/assign';

export function migrate(data) {

  data.version = '1.0.1';

  // migrate request params to string instead of objects
  assign(data, {
    mockedRequests: transformRequestParamsToString(data.mockedRequests)
  });

  // migrate request hash to use string parameters
  assign(data, {
    mockedRequests: transformRequestHashToStringParams(data.mockedRequests)
  });

  return data;
}

function transformRequestParamsToString(mockedRequests) {
  return mockedRequests.map((mockedRequest) => {
    if (isObject(mockedRequest.params) || isArray(mockedRequest.params)) {
      mockedRequest.params = JSON.stringify(mockedRequest.params);

      // cancel previous default value
      if (mockedRequest.params === '{}') {
        mockedRequest.params = null;
      }
    }

    return mockedRequest;
  });
}

function transformRequestHashToStringParams(mockedRequests) {
  return mockedRequests.map((mockedRequest) => {
    mockedRequest.requestHash = [
      mockedRequest.method,
      mockedRequest.url,
      mockedRequest.params
    ].join('|');

    return mockedRequest;
  });
}