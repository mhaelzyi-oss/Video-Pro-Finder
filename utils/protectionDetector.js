export function detectProtectionSignals(text = '', sourceType = 'unknown') {
  const signals = [];
  const normalized = String(text).toLowerCase();

  if (normalized.includes('#ext-x-key') || normalized.includes('method=aes-128') || normalized.includes('method=sample-aes')) {
    signals.push('encrypted_hls');
  }
  if (normalized.includes('contentprotection') || normalized.includes('widevine') || normalized.includes('playready') || normalized.includes('fairplay')) {
    signals.push('drm_dash');
  }
  if (normalized.includes('eme') || normalized.includes('license')) {
    signals.push('eme_indicator');
  }

  return {
    isProtected: signals.length > 0,
    category: signals[0] || 'none',
    signals,
    reason: signals.length ? 'Public protection indicators detected for this source; direct download is blocked.' : null
  };
}
