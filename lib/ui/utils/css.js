import assign from 'lodash/assign';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import kebabCase from 'lodash/kebabCase';

export const cssReset = {
  display: 'block',
  background: 'white none repeat scroll 0% 0%',
  'background-color': 'white',
  border: '0px none black',
  'border-collapse': 'separate',
  'border-spacing': '0px',
  bottom: 'auto',
  'caption-side': 'top',
  clear: 'none',
  clip: 'auto',
  color: 'black',
  content: 'none',
  'counter-increment': 'none',
  'counter-reset': 'none',
  float: 'none',
  cursor: 'auto',
  direction: 'ltr',
  'empty-cells': 'hide',
  'font-family': '-apple-system, BlinkMacSystemFont, Arial, sans-serif',
  'font-size': '13px',
  'font-size-adjust': 'none',
  'font-style': 'normal',
  'font-variant': 'normal',
  'font-weight': 'normal',
  height: 'auto',
  'ime-mode': 'auto',
  left: 'auto',
  'letter-spacing': 'normal',
  margin: '0px',
  'marker-offset': 'auto',
  'max-height': 'none',
  'max-width': 'none',
  'min-height': '0px',
  'min-width': '0px',
  opacity: '1',
  outline: '0px none black',
  'outline-offset': '0px',
  overflow: 'inherit',
  padding: '0px',
  'page-break-after': 'auto',
  'page-break-before': 'auto',
  position: 'static',
  right: 'auto',
  'table-layout': 'auto',
  'text-align': 'left',
  'text-decoration': 'none',
  'text-indent': '0px',
  'text-transform': 'none',
  top: 'auto',
  'unicode-bidi': 'normal',
  'vertical-align': 'baseline',
  visibility: 'visible',
  'white-space': 'normal',
  width: 'auto',
  'word-spacing': 'normal',
  'z-index': 'auto'
};

export const cssResetInput = {
  'background-color': 'white',
  'border': '1px inset #F0F0F0',
  'cursor': 'text',
  'font-family': 'sans-serif',
  'font-size': 'small',
  'padding': '2px',
};

export const cssResetTextArea = {
  ...cssResetInput,
  'font-family': 'monospace',
  'margin-top': '1px',
  'margin-bottom': '1px',
  'vertical-align': 'text-bottom'
};

export const cssResetCheckbox = {
  ...cssResetInput,
  'border-width': '0px',
  cursor: 'default',
  margin: '3px 3px 3px 4px',
  padding: '0px'
};

export const cssResetRadio = {
  ...cssResetInput,
  'margin-bottom': '0px',
  'margin-left': '5px'
};

export const getStyles = (reset, overrides = {}) => {
  const overrideStyles = reduce(overrides, (result, value, key) => {
    result[kebabCase(key)] = value;
    return result;
  }, {});
  const styles         = assign({}, reset, overrideStyles);

  return map(styles, (value, key) => {
    return `${key}: ${value} !important;`;
  }).join('');
};
