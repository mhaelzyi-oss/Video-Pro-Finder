export function getStorage() {
  return chrome?.storage?.local || null;
}

export async function loadState() {
  const storage = getStorage();
  if (!storage) return { schemaVersion: 1, settings: {}, queue: [], history: [], library: [], presets: [], hostPreferences: {}, diagnostics: [], errorSnapshots: [] };
  const record = await storage.get(['vpfState']);
  return record.vpfState || { schemaVersion: 1, settings: {}, queue: [], history: [], library: [], presets: [], hostPreferences: {}, diagnostics: [], errorSnapshots: [] };
}

export async function saveState(state) {
  const storage = getStorage();
  if (!storage) return;
  await storage.set({ vpfState: state });
}
