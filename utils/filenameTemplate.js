export function sanitizeFilename(rawName = 'download') {
  const cleaned = String(rawName || 'download')
    .replace(/[\\/:*?"<>|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);

  return cleaned || 'download';
}

export function renderFilenameTemplate(template, values = {}) {
  const result = template
    .replace(/\{title\}/gi, sanitizeFilename(values.title || 'media'))
    .replace(/\{quality\}/gi, String(values.quality || 'quality'))
    .replace(/\{bitrate\}/gi, String(values.bitrate || 'bitrate'))
    .replace(/\{origin\}/gi, String(values.origin || 'origin'))
    .replace(/\{ext\}/gi, String(values.ext || 'mp4'))
    .replace(/\{YYYYMMDD\}/gi, values.YYYYMMDD || new Date().toISOString().slice(0, 10).replace(/-/g, ''));

  return result;
}
