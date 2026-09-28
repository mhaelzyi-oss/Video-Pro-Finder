export const SUPPORTED_EXTENSIONS = new Set(['mp4', 'webm', 'm4v', 'mov', 'mp3', 'm4a', 'ogg', 'wav', 'm3u8', 'mpd', 'vtt']);
export const TORRENT_EXTENSIONS = new Set(['torrent']);
export const DEFAULT_SETTINGS = {
  theme: 'dark', liquidGlassIntensity: 'standard', reduceMotionOverride: 'system', telemetryOptIn: false,
  defaultQualityMode: 'best_balance', defaultPrompt: 'Save {title} as {quality}.{ext}', filenameTemplate: '{title}_{quality}.{ext}',
  defaultDownloadSubtitles: false, rememberAuthorityBasis: false, authorityPolicyVersion: '1.0', maxHistoryItems: 100,
  maxLibraryItems: 500, maxErrorSnapshots: 30, hostPermissionMode: 'ask', lastUpdatedAt: 0
};
export const DEFAULT_STATE = { schemaVersion: 1, settings: DEFAULT_SETTINGS, queue: [], history: [], library: [], presets: [], hostPreferences: {}, diagnostics: [], errorSnapshots: [] };
