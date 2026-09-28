export function findMatchingHost(hostPreferences, host) {
  return hostPreferences?.[host] || null;
}
