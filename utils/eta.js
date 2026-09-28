export function formatEta(seconds) {
  if (seconds == null || Number.isNaN(seconds) || seconds < 0) return 'Calculating…';
  if (seconds < 60) return '< 1 min';
  if (seconds < 3600) return `${Math.max(1, Math.round(seconds / 60))} min`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return `${hours} hr ${minutes} min`;
}

export function estimateEta(totalBytes, bytesPerSecond, samples = []) {
  if (!totalBytes || !bytesPerSecond || bytesPerSecond <= 0) return { etaSeconds: null, speed: null };
  const remaining = Math.max(totalBytes, 0);
  const eta = remaining / bytesPerSecond;
  return { etaSeconds: eta, speed: bytesPerSecond };
}
