export function createGlassCard() {
  return { className: 'glass-panel' };
}

export function applyReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
}
