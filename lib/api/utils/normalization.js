import isObject from 'lodash/isObject';
import get from 'lodash/get';
import { getHeadersObject } from 'api/utils/headers';

export const getJSONRequest = (request) => ({
  id: request.id,
  method: request.method,
  url: request.url,
  body: request.body instanceof FormData ? request.body.entries.map(([type, content]) => content.name).toString() : request.body,
  headers: getHeadersObject(request.headers),
  startTime: request.startTime,
  origin: typeof window !== "undefined" ? window.location.origin : null
});

export const getJSONResponse = (response) =>({
  headers: getHeadersObject(response.headers),
  status: response.status,
  statusText: response.statusText,
  url: response.url,
  data: get(global, 'isNativeScript') && isObject(response.data) ? JSON.stringify(response.data) : response.data
});