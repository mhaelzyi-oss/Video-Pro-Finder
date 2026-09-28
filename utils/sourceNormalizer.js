export function normalizeUrl(value, baseUrl = globalThis.location?.href || 'https://example.com') {
  if (!value) return '';
  try {
    if (value.startsWith('//')) return new URL(`https:${value}`, baseUrl).href;
    return new URL(value, baseUrl).href;
  } catch {
    return value;
  }
}

export function classifyStreamType(src, mimeType = '') {
  const text = String(src || '').toLowerCase();
  const mime = String(mimeType || '').toLowerCase();

  if (/magnet:/i.test(text) || /\.torrent(?:[?#]|$)/i.test(text)) return 'torrent';
  if (mime.includes('mpegurl') || text.endsWith('.m3u8') || /m3u8/i.test(text)) return 'hls';
  if (mime.includes('dash') || text.endsWith('.mpd') || /mpd/i.test(text)) return 'dash';
  if (mime.startsWith('audio/') || /\.(mp3|m4a|ogg|wav)(?:[?#]|$)/i.test(text)) return 'audio';
  if (mime.startsWith('video/') || /\.(mp4|webm|m4v|mov)(?:[?#]|$)/i.test(text)) return 'direct';
  return 'unknown';
}

export function buildSourceId(src) {
  const safe = String(src || '').replace(/[^a-zA-Z0-9]/g, '');
  return safe || `source-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function normalizeSource(input = {}, pageInfo = {}) {
  const src = normalizeUrl(input.src || input.url || input.href, pageInfo.baseUrl || pageInfo.url || globalThis.location?.href || 'https://example.com');
  const streamType = classifyStreamType(src, input.mime || input.type || '');

  try {
    const url = new URL(src);
    return {
      id: input.id || buildSourceId(src),
      src,
      canonicalUrl: src,
      label: input.label || input.title || url.pathname.split('/').pop() || 'Media source',
      pageTitle: pageInfo.title || null,
      pageUrl: pageInfo.url || null,
      thumbnail: input.thumbnail || null,
      resolution: input.resolution || null,
      width: input.width || null,
      height: input.height || null,
      bitrate: input.bitrate || null,
      durationSeconds: input.durationSeconds || null,
      fps: input.fps || null,
      mime: input.mime || input.type || null,
      codecs: input.codecs || null,
      streamType,
      originHost: url.hostname,
      estimatedSize: input.estimatedSize || null,
      discoveredAt: Date.now(),
      subtitles: Array.isArray(input.subtitles) ? input.subtitles : [],
      variants: Array.isArray(input.variants) ? input.variants : [],
      protection: { isProtected: false, category: 'none', signals: [], reason: null, detectedAt: Date.now() },
      eligibility: {
        canPreview: streamType === 'direct' || streamType === 'audio',
        canDownloadDirectly: streamType === 'direct' || streamType === 'audio',
        canSaveManifest: streamType === 'hls' || streamType === 'dash',
        canSaveSubtitles: false,
        canCopySource: true,
        canOpenSource: true,
        canSaveToLibrary: true,
        blockReason: streamType === 'torrent' ? 'Torrent and magnet links are unsupported.' : null,
        blockCode: streamType === 'torrent' ? 'TORRENT_UNSUPPORTED' : 'NONE'
      }
    };
  } catch {
    return {
      id: input.id || `source-${Date.now()}`,
      src: String(input.src || ''),
      canonicalUrl: String(input.src || ''),
      label: input.label || 'Media source',
      pageTitle: pageInfo.title || null,
      pageUrl: pageInfo.url || null,
      thumbnail: input.thumbnail || null,
      mime: input.mime || input.type || null,
      streamType: 'unknown',
      originHost: 'unknown',
      estimatedSize: null,
      discoveredAt: Date.now(),
      subtitles: [],
      variants: [],
      protection: { isProtected: false, category: 'none', signals: [], reason: null, detectedAt: Date.now() },
      eligibility: { canPreview: false, canDownloadDirectly: false, canSaveManifest: false, canSaveSubtitles: false, canCopySource: true, canOpenSource: true, canSaveToLibrary: true, blockReason: null, blockCode: 'NONE' }
    };
  }
}
