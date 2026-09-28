import { scanDocument, installScanner } from './utils/sourceScanner.js';

function publish(sources) { chrome.runtime.sendMessage({ type: 'MEDIA_SOURCES', sources }); }
installScanner(publish);
chrome.runtime.onMessage.addListener((message) => { if (message?.type === 'SCAN_PAGE') publish(scanDocument()); });
