export default function parseSize(size) {
  if (size === 'full') {
    return window.innerHeight;
  }
  if (size === 'half') {
    return window.innerHeight / 2;
  }
}