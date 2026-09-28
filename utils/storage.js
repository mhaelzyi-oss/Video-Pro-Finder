import { DEFAULT_STATE } from './constants.js';
import { migrateState, validateState } from './schema.js';

const KEY = 'vpfState';
const api = () => globalThis.chrome?.storage?.local;
export async function loadState() { const result = await api().get(KEY); const state = migrateState(result?.[KEY]); if (!validateState(state)) return structuredClone(DEFAULT_STATE); return state; }
export async function saveState(state) { await api().set({ [KEY]: migrateState(state) }); }
export async function updateState(mutator) { const state = await loadState(); const next = await mutator(state); await saveState(next || state); return next || state; }
export { KEY };
