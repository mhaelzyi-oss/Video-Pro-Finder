export function resolveUrl(relativeOrAbsoluteUrl, baseUrl) {
  try {
    return new URL(relativeOrAbsoluteUrl, baseUrl).href;
  } catch {
    return relativeOrAbsoluteUrl;
  }
}

export function parseHlsMasterPlaylist(manifestText, manifestUrl) {
  const lines = manifestText.split(/\r?\n/);
  const variants = [];
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#EXT-X-STREAM-INF')) {
      current = { attributes: {} };
      const match = trimmed.match(/BANDWIDTH=(\d+)/i);
      const resolution = trimmed.match(/RESOLUTION=(\d+x\d+)/i);
      const codecs = trimmed.match(/CODECS=\"([^\"]+)\"/i);
      const frameRate = trimmed.match(/FRAME-RATE=(\d+(?:\.\d+)?)/i);
      if (match) current.attributes.bandwidth = Number(match[1]);
      if (resolution) current.attributes.resolution = resolution[1];
      if (codecs) current.attributes.codecs = codecs[1];
      if (frameRate) current.attributes.frameRate = Number(frameRate[1]);
      continue;
    }
    if (trimmed.startsWith('#')) {
      continue;
    }
    if (current) {
      current.url = resolveUrl(trimmed, manifestUrl);
      variants.push({
        id: `hls-${variants.length}`,
        url: current.url,
        bandwidth: current.attributes.bandwidth || 0,
        resolution: current.attributes.resolution || null,
        codecs: current.attributes.codecs || null,
        frameRate: current.attributes.frameRate || null,
        mimeType: 'application/vnd.apple.mpegurl',
        streamType: 'hls'
      });
      current = null;
    }
  }

  return variants.sort((a, b) => Number(b.bandwidth || 0) - Number(a.bandwidth || 0));
}

export function parseHlsMediaPlaylist(manifestText, manifestUrl) {
  const lines = manifestText.split(/\r?\n/);
  const segments = [];
  let isLive = true;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '#EXT-X-ENDLIST') isLive = false;
    if (!trimmed.startsWith('#') && trimmed) segments.push(resolveUrl(trimmed, manifestUrl));
  }

  return {
    isLive,
    segments,
    endList: manifestText.includes('#EXT-X-ENDLIST'),
    protection: manifestText.includes('#EXT-X-KEY') || manifestText.includes('METHOD=AES-128')
  };
}

export function parseHlsManifest(manifestText, manifestUrl) {
  const isMaster = manifestText.includes('#EXT-X-STREAM-INF');
  return isMaster
    ? parseHlsMasterPlaylist(manifestText, manifestUrl)
    : parseHlsMediaPlaylist(manifestText, manifestUrl);
}

export function parseDashManifest(mpdText, mpdUrl) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(mpdText, 'application/xml');
  const periodEls = [...doc.querySelectorAll('Period')];
  const adaptationSets = [];

  for (const period of periodEls) {
    const sets = period.querySelectorAll('AdaptationSet');
    for (const set of sets) {
      const representations = [...set.querySelectorAll('Representation')];
      for (const rep of representations) {
        const baseUrl = rep.querySelector('BaseURL')?.textContent?.trim();
        adaptationSets.push({
          id: rep.getAttribute('id') || null,
          mimeType: rep.getAttribute('mimeType') || set.getAttribute('mimeType') || null,
          codecs: rep.getAttribute('codecs') || null,
          width: Number(rep.getAttribute('width') || set.getAttribute('width') || 0) || null,
          height: Number(rep.getAttribute('height') || set.getAttribute('height') || 0) || null,
          bandwidth: Number(rep.getAttribute('bandwidth') || 0) || null,
          frameRate: Number(rep.getAttribute('frameRate') || 0) || null,
          baseUrl: baseUrl ? resolveUrl(baseUrl, mpdUrl) : null,
          contentProtection: !!rep.querySelector('ContentProtection') || !!set.querySelector('ContentProtection'),
          type: set.getAttribute('contentType') || 'video'
        });
      }
    }
  }

  return { periods: periodEls.length, adaptations: adaptationSets, hasProtection: adaptationSets.some((item) => item.contentProtection) };
}

export function sortVariants(variants) {
  return [...variants].sort((a, b) => {
    const aHeight = Number(a.height || 0);
    const bHeight = Number(b.height || 0);
    if (bHeight !== aHeight) return bHeight - aHeight;
    return Number(b.bandwidth || 0) - Number(a.bandwidth || 0);
  });
}

export function formatVariantLabel(variant) {
  if (variant?.height) return `${variant.height}p`;
  if (variant?.bandwidth) return `${Math.round(variant.bandwidth / 1000)} kbps`;
  return 'Unknown';
}

export function isLiveHlsPlaylist(manifestText) {
  return manifestText.includes('#EXT-X-STREAM-INF') && !manifestText.includes('#EXT-X-ENDLIST');
}
