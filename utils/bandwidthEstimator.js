export function updateBandwidthEstimate(samples = [], current = null) {
  if (!samples.length) return { samples: [], smoothedBytesPerSecond: null, confidence: 'low' };
  const safeSamples = samples.filter((sample) => Number(sample.bytesPerSecond) > 0);
  const latest = safeSamples.at(-1);
  const smoothed = safeSamples.reduce((sum, sample) => sum + Number(sample.bytesPerSecond || 0), 0) / safeSamples.length;
  const confidence = safeSamples.length >= 3 ? 'high' : safeSamples.length >= 2 ? 'medium' : 'low';
  return { samples: safeSamples, smoothedBytesPerSecond: smoothed, confidence, latest: latest || current };
}

export function computeBytesPerSecond(bytesReceived, intervalMs) {
  if (!bytesReceived || !intervalMs || intervalMs <= 0) return 0;
  return (bytesReceived / intervalMs) * 1000;
}
