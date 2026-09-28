export function scanDocument(documentRef = document) {
  const seen = new Map();
  const addSource = (raw) => {
    if (!raw || !raw.src) return;
    const source = normalizeSource(raw, { title: documentRef.title, url: documentRef.location?.href || location.href, baseUrl: documentRef.location?.href || location.href });
    if (!seen.has(source.canonicalUrl)) seen.set(source.canonicalUrl, source);
  };

  documentRef.querySelectorAll('video, audio, source, track, a').forEach((element) => {
    const candidates = [
      element.getAttribute('src'),
      element.getAttribute('href'),
      element.getAttribute('data-src'),
      element.getAttribute('data-video-url'),
      element.getAttribute('data-stream-url'),
      element.getAttribute('data-url')
    ];
    for (const value of candidates) {
      if (value) addSource({ src: value, mime: element.getAttribute('type'), label: element.getAttribute('title') || element.textContent || documentRef.title });
    }
  });

  documentRef.querySelectorAll('meta[property]').forEach((meta) => {
    const property = meta.getAttribute('property');
    if (/og:(video|audio)/.test(property) || /og:video/.test(property) || /og:audio/.test(property)) {
      const content = meta.getAttribute('content');
      if (content) addSource({ src: content, label: documentRef.title });
    }
  });

  return Array.from(seen.values());
}

export function installScanner(onSources) {
  const run = () => onSources(scanDocument());
  const observer = new MutationObserver(() => {
    run();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
  run();
  return observer;
}

import { normalizeSource } from './sourceNormalizer.js';
