import { SUPPORTED_EXTENSIONS, TORRENT_EXTENSIONS } from './constants.js';

export function canonicalizeUrl(value, baseUrl = globalThis.location?.href) {
  try { const url = new URL(value, baseUrl); url.hash = ''; return url.href; } catch { return ''; }
}
export function extensionOf(value) { try { return new URL(value, 'https://invalid.local').pathname.split('.').pop().toLowerCase(); } catch { return ''; } }
export function classifySource(src, mime = '') {
  const lower = String(mime).toLowerCase(); const ext = extensionOf(src);
  if (TORRENT_EXTENSIONS.has(ext) || /^magnet:/i.test(src)) return 'torrent';
  if (lower.includes('mpegurl') || ext === 'm3u8') return 'hls';
  if (lower.includes('dash') || ext === 'mpd') return 'dash';
  if (lower.startsWith('audio/') || ['mp3', 'm4a', 'ogg', 'wav'].includes(ext)) return 'audio';
  if (lower.startsWith('video/') || SUPPORTED_EXTENSIONS.has(ext)) return 'direct';
  return 'unknown';
}
export function normalizeSource(input, page = {}) {
  const src = canonicalizeUrl(input.src || input.url, page.url); const streamType = classifySource(src, input.mime || input.type);
  const url = new URL(src || 'https://invalid.local'); const title = input.label || page.title || url.pathname.split('/').pop() || 'Untitled media';
  return { id: input.id || btoa(src).replace(/[^a-z0-9]/gi, '').slice(0, 32), src, canonicalUrl: src, label: title, pageTitle: page.title || null, pageUrl: page.url || null, thumbnail: input.thumbnail || null, resolution: input.resolution || null, width: input.width || null, height: input.height || null, bitrate: input.bitrate || null, durationSeconds: input.durationSeconds || null, fps: input.fps || null, mime: input.mime || input.type || null, codecs: input.codecs || null, streamType, originHost: url.hostname, estimatedSize: null, discoveredAt: Date.now(), subtitles: input.subtitles || [], variants: [], protection: { isProtected: false, category: 'none', signals: [], reason: null, detectedAt: Date.now() }, eligibility: { canPreview: streamType === 'direct' || streamType === 'audio', canDownloadDirectly: streamType === 'direct' || streamType === 'audio', canSaveManifest: streamType === 'hls' || streamType === 'dash', canSaveSubtitles: false, canCopySource: Boolean(src), canOpenSource: Boolean(src), canSaveToLibrary: Boolean(src), blockReason: streamType === 'torrent' ? 'Torrent and magnet sources are unsupported.' : null, blockCode: streamType === 'torrent' ? 'TORRENT_UNSUPPORTED' : 'NONE' } };
}
