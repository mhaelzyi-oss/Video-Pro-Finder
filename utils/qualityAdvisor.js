export function getQualityOrder() {
  return ['2160p', '1440p', '1080p', '720p', '480p', '360p', 'audio', 'unknown'];
}

export function scoreVariant(variant, mode = 'best_balance', hostPreference = null) {
  if (hostPreference && variant.label === hostPreference) return 999;
  const height = Number(variant.height || 0);
  if (mode === 'smallest') return -(height || 0) + Number(variant.bandwidth || 0) * 0.0001;
  if (mode === 'fastest') return 1000000 / Math.max(Number(variant.bandwidth || 1), 1);
  if (mode === 'best_quality') return height * 100 + Number(variant.bandwidth || 0) * 0.01;
  return ((height >= 1080 ? 1500 : height >= 720 ? 1000 : 700) + Number(variant.bandwidth || 0) * 0.005);
}

export function pickRecommendedVariant(variants = [], mode = 'best_balance', hostPreference = null) {
  const safe = variants.filter((v) => !v.protected && v.url && !v.blocked);
  if (!safe.length) return null;

  if (hostPreference) {
    const match = safe.find((v) => v.label === hostPreference || v.height === Number(hostPreference.replace(/[^\d]/g, '')) || v.quality === hostPreference);
    if (match) return match;
  }

  const ordered = [...safe].sort((a, b) => scoreVariant(b, mode, hostPreference) - scoreVariant(a, mode, hostPreference));
  return ordered[0];
}
