export function getHeadersObject(headers = []) {
  return Array.from(headers).reduce((result, item) => {
    result[item[0]] = item[1];
    return result
  }, {});
}
