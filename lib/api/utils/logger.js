const consoleColorsSupported = typeof navigator !== "undefined" &&
                               navigator.userAgent.indexOf('Chrome') !== -1;

export function logGroup(collapsed = false, groupName, ...params) {
  const args = consoleColorsSupported
    ? [groupName, ...params]
    : [groupName.replace(/%c/g, '')];

  if (!console.group) {
    console.log(...args);
    return;
  }

  console[`group${collapsed ? 'Collapsed' : ''}`](...args);
}

export function logGroupEnd(name) {
  if (!console.groupEnd) {
    return;
  }

  console.groupEnd(name);
}
