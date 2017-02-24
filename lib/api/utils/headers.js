export function getHeadersObject(headers = []) {
  return Array.from(headers).reduce((result, item) => {
    result[item[0]] = item[1];
    return result
  }, {});
}

export function getContentType(type = '') {
  switch (type.toLowerCase()) {
    case 'html':
      return 'text/html';

    case 'xml':
      return 'text/xml';

    case 'json':
      return 'application/json';

    case 'plain text':
    case 'text':
      return 'text/plain';
  }
}

export function getHeaderPreset(preset) {
  return {
    pragma: 'no-cache',
    'content-type': `${getContentType(preset)}; charset=utf-8`,
    'cache-control': 'no-cache',
    expires: -1
  }
}
