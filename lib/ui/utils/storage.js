const storageKey = '__bdsmui__';

export function saveToggleCoordinates(x, y) {
  localStorage.setItem(storageKey, JSON.stringify({
    toggleX: x,
    toggleY: y
  }));
}

export function getToggleCoordinates() {
  try {
    const uiSettings = JSON.parse(localStorage.getItem(storageKey));

    return {
      x: uiSettings.toggleX,
      y: uiSettings.toggleY
    }
  } catch (err) {
    return null;
  }
}
