import { loadState, updateState } from './utils/storage.js';

const menus = [{ id: 'scan', title: 'Scan page for media', contexts: ['page'] }];
async function setup() { for (const menu of menus) { try { await chrome.contextMenus.create(menu); } catch { /* idempotent */ } } await loadState(); }
chrome.runtime.onInstalled.addListener(setup);
chrome.runtime.onStartup.addListener(setup);
chrome.contextMenus.onClicked.addListener((info, tab) => { if (info.menuItemId === 'scan' && tab?.id) chrome.tabs.sendMessage(tab.id, { type: 'SCAN_PAGE' }).catch(() => {}); });
chrome.runtime.onMessage.addListener((message, sender) => { if (message?.type === 'MEDIA_SOURCES') updateState((state) => { state.sourcesByTab = state.sourcesByTab || {}; state.sourcesByTab[String(sender.tab?.id || 'unknown')] = message.sources; return state; }); });
chrome.downloads?.onChanged?.addListener((delta) => { if (delta.state?.current === 'complete') updateState((state) => { state.lastDownloadCompletedAt = Date.now(); return state; }); });
setup();
