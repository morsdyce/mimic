const storageKey = '__bdsmui__';

export function saveTogglePosition(position) {
  localStorage.setItem(storageKey, JSON.stringify({
    togglePosition: position
  }));
}

export function getTogglePosition() {
  try {
    const uiSettings = JSON.parse(localStorage.getItem(storageKey));

    return uiSettings.togglePosition;
  } catch (err) {
    return null;
  }
}
