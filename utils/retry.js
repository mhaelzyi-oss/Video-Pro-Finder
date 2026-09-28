export function isRetryableError(code) {
  const retryable = ['TEMPORARY_NETWORK_ERROR', 'BROWSER_INTERRUPTED_DOWNLOAD', 'SERVICE_WORKER_INTERRUPTION', 'MANIFEST_FETCH_FAILURE'];
  return retryable.includes(code);
}

export function getRetryDelay(attempt, base = 2000, multiplier = 2, jitterMax = 0.25) {
  const delay = Math.min(base * multiplier ** attempt, 60000);
  const jitter = delay * (Math.random() * jitterMax);
  return Math.round(delay + jitter);
}
