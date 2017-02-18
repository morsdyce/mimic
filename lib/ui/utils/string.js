const mimeTypeRegex = /^[\w+-\.]+\/[\w+-\.]+/;

export function getContentType(value = '') {
  const contentType = value.match(mimeTypeRegex);

  return contentType ? contentType[0] : null;
}

export function getHighlightedText(text, term, styles) {
  if (!term || !styles) {
    return text;
  }

  const regex = new RegExp(term, 'ig');

  return text.replace(regex, `<span style="${styles}">$&</span>`);
}
