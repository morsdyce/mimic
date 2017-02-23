const mimeTypeRegex = /^[\w+-\.]+\/[\w+-\.]+/;

export function getContentType(value = '') {
  const contentType = value.match(mimeTypeRegex);

  return contentType ? contentType[0] : null;
}

export function getHighlightedText(text, term) {
  if (!term) {
    return text;
  }

  const regex = new RegExp(term, 'ig');

  return text.replace(regex, `<span style="background-color: #f7f2d7; padding: 2px 0;">$&</span>`);
}
