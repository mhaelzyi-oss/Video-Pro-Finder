export function createJob(source, options = {}) {
  return {
    id: options.id || `job-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: 'queued',
    source: source || {},
    selectedVariant: options.selectedVariant || null,
    filename: options.filename || 'download',
    downloadId: null,
    authorization: options.authorization || { confirmed: false },
    progress: { percent: 0, bytesReceived: null, totalBytes: null, bytesPerSecond: null, etaSeconds: null, startedAt: null, lastMeasuredAt: null },
    retry: { attempts: 0, maxAttempts: 3, nextRetryAt: null, lastFailureAt: null },
    error: null
  };
}

export function updateJob(job, updates) {
  return { ...job, ...updates, updatedAt: Date.now() };
}
