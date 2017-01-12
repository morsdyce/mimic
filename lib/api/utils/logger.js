export function logGroup(collapsed = false, ...params) {
  if (!console.group) {
    console.log(...params);
    return;
  }

  console[`group${collapsed ? 'Collapsed' : ''}`](...params);
}

export function logGroupEnd(name) {
  if (!console.groupEnd) {
    return;
  }

  console.groupEnd(name);
}
