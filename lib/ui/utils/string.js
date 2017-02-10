const mimeTypeRegex = /^[\w+-\.]+\/[\w+-\.]+/;

export function getContentType(value = '') {
  const contentType = value.match(mimeTypeRegex);

  return contentType ? contentType[0] : null;
}
