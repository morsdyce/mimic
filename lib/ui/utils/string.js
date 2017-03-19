const mimeTypeRegex = /^[\w+-\.]+\/[\w+-\.]+/;
const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

export function getContentType(value = '') {
  const contentType = value.match(mimeTypeRegex);

  return contentType ? contentType[0] : null;
}

function replaceTag(tag) {
  return htmlEntities[tag] || '';
}

export function escapeHtmlEntities(text) {
  return text.replace(/[&<>]/g, replaceTag);
}


export function getHighlightedText(text, term) {
  if (!term) {
    return escapeHtmlEntities(text);
  }

  const regex = new RegExp(term, 'ig');
  const highlightedText = text.replace(regex, '_^_HIGHLIGHT_^_$&_^_END_HIGHLIGHT_^_');

  return escapeHtmlEntities(highlightedText)
    .replace(/_\^_HIGHLIGHT_\^_/g, '<span style="background-color: #f7f2d7; padding: 2px 0;">')
    .replace(/_\^_END_HIGHLIGHT_\^_/g, '</span>');
}

export function convertDelayToSeconds(delay = 0) {
  return `${(delay / 1000).toFixed(2)}s`;
}