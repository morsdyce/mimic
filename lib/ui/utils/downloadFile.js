export const downloadFile = (filename, content) => {
  let link = document.createElement('a');
  const blob = new Blob([content], { type: 'application/json' });
  link.download = `${filename.replace(/\.json$/, '')}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
  link.remove();
  link = undefined;
};