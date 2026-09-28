export function getHostPermissions() {
  return chrome?.permissions?.getAll?.() || Promise.resolve({ origins: [] });
}

export async function requestHostPermission(origin) {
  const result = await chrome.permissions.request({ origins: [origin] });
  return Boolean(result);
}

export async function removeHostPermission(origin) {
  const result = await chrome.permissions.remove({ origins: [origin] });
  return Boolean(result);
}
