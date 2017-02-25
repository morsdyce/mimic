export const downloadFile = (filename, content) => {
  let link = document.createElement('a');
  const blob = new Blob([content], { type: 'application/json' });
  link.download = `${filename.replace(/\.json$/, '')}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
  link.remove();
  link = undefined;
};

export const copyToClipboard = (content) => {
  let textarea = document.createElement('textarea');
  textarea.style.marginLeft = '-9999px';
  textarea.value = content;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  textarea.remove();
  textarea = undefined;
};
