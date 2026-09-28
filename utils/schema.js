import { DEFAULT_SETTINGS, DEFAULT_STATE } from './constants.js';

const has = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
export function isObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
export function validateSettings(value) { return isObject(value) && ['dark', 'light', 'system'].includes(value.theme) && ['best_balance', 'best_quality', 'fastest', 'smallest'].includes(value.defaultQualityMode); }
export function validateSource(value) { return isObject(value) && typeof value.id === 'string' && typeof value.src === 'string' && typeof value.streamType === 'string'; }
export function migrateState(input) {
  const source = isObject(input) ? input : {};
  const state = { ...DEFAULT_STATE, ...source, settings: { ...DEFAULT_SETTINGS, ...(isObject(source.settings) ? source.settings : {}) } };
  state.schemaVersion = 1;
  for (const key of ['queue', 'history', 'library', 'presets', 'diagnostics', 'errorSnapshots']) if (!Array.isArray(state[key])) state[key] = [];
  if (!isObject(state.hostPreferences)) state.hostPreferences = {};
  return state;
}
export function validateState(value) { return isObject(value) && value.schemaVersion === 1 && validateSettings(value.settings) && Array.isArray(value.queue) && Array.isArray(value.history); }
export function sanitizeSource(source) { return { ...source, src: String(source?.src || ''), id: String(source?.id || crypto.randomUUID()), protection: source?.protection || { isProtected: false }, eligibility: source?.eligibility || {} }; }
export { has };
