export function renderDownloadProgress(job) {
  const percent = job?.progress?.percent ?? 0;
  return `${percent}%`;
}
