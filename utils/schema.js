import { DEFAULT_SETTINGS, DEFAULT_STATE } from './constants.js';

export function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateSettings(value) {
  return (
    isObject(value) &&
    ['dark', 'light', 'system'].includes(value.theme) &&
    ['low', 'standard', 'high'].includes(value.liquidGlassIntensity) &&
    ['system', 'reduce', 'full'].includes(value.reduceMotionOverride) &&
    ['best_balance', 'best_quality', 'fastest', 'smallest'].includes(value.defaultQualityMode)
  );
}

export function migrateState(input) {
  const source = isObject(input) ? input : {};
  return {
    ...DEFAULT_STATE,
    ...source,
    settings: { ...DEFAULT_SETTINGS, ...(isObject(source.settings) ? source.settings : {}) },
    queue: Array.isArray(source.queue) ? source.queue : [],
    history: Array.isArray(source.history) ? source.history : [],
    library: Array.isArray(source.library) ? source.library : [],
    presets: Array.isArray(source.presets) ? source.presets : [],
    hostPreferences: isObject(source.hostPreferences) ? source.hostPreferences : {},
    diagnostics: Array.isArray(source.diagnostics) ? source.diagnostics : [],
    errorSnapshots: Array.isArray(source.errorSnapshots) ? source.errorSnapshots : []
  };
}

export function validateState(value) {
  return isObject(value) && value.schemaVersion === 1 && validateSettings(value.settings);
}

export function sanitizeSource(source) {
  const safe = isObject(source) ? source : {};
  return {
    ...safe,
    id: String(safe.id || crypto.randomUUID()),
    src: String(safe.src || ''),
    canonicalUrl: String(safe.canonicalUrl || safe.src || ''),
    label: String(safe.label || 'Untitled source'),
    protection: isObject(safe.protection) ? safe.protection : { isProtected: false, category: 'none', signals: [], reason: null, safeActions: ['explain', 'copy_url', 'save_to_library', 'cancel'] },
    eligibility: isObject(safe.eligibility) ? safe.eligibility : { canPreview: false, canDownloadDirectly: false, canSaveManifest: false, canSaveSubtitles: false, canCopySource: true, canOpenSource: true, canSaveToLibrary: true, blockReason: null, blockCode: 'NONE' }
  };
}
