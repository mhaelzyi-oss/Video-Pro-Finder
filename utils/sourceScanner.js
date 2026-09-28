import { normalizeSource } from './sourceNormalizer.js';

const ATTRS = ['src', 'href', 'data-src', 'data-video-url', 'data-stream-url'];
export function scanDocument(doc = document) {
  const found = new Map(); const add = (item) => { const source = normalizeSource(item, { title: doc.title, url: doc.location?.href }); if (source.src && !found.has(source.canonicalUrl)) found.set(source.canonicalUrl, source); };
  doc.querySelectorAll('video, audio, source, track, a').forEach((element) => { ATTRS.forEach((attr) => { const value = element.getAttribute(attr); if (value) add({ src: value, type: element.getAttribute('type'), label: element.getAttribute('title') }); }); });
  doc.querySelectorAll('meta[property^="og:"]').forEach((meta) => { if (/og:(video|audio)(:url|:secure_url)?/.test(meta.getAttribute('property'))) add({ src: meta.content, label: doc.title }); });
  return [...found.values()];
}
export function installScanner(onSources) { let timer; const run = () => { clearTimeout(timer); timer = setTimeout(() => onSources(scanDocument()), 150); }; run(); new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true }); return run; }
