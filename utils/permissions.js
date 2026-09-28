export function getHostPermissions() {
  return chrome?.permissions?.getAll?.() || Promise.resolve({ origins: [] });
}

export async function requestHostPermission(origin) {
  if (!chrome?.permissions?.request) return false;
  const granted = await chrome.permissions.request({ origins: [origin] });
  return Boolean(granted);
}

export async function removeHostPermission(origin) {
  if (!chrome?.permissions?.remove) return false;
  const removed = await chrome.permissions.remove({ origins: [origin] });
  return Boolean(removed);
}
