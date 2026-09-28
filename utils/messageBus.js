export function getTabInfo() {
  return chrome.tabs?.query ? chrome.tabs.query({ active: true, currentWindow: true }) : Promise.resolve([]);
}

export function broadcast(type, payload) {
  if (chrome.runtime) {
    chrome.runtime.sendMessage({ type, payload });
  }
}
