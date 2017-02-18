export function getWindowSize(size) {
  if (size === 'full') {
    return window.innerHeight;
  }

  return window.innerHeight / 2;
}
