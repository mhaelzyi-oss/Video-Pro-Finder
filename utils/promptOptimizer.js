export function validatePrompt(template) {
  const warnings = [];
  const validVars = ['title', 'YYYYMMDD', 'quality', 'bitrate', 'origin', 'ext'];
  const matches = [...template.matchAll(/\{([^}]+)\}/g)];
  for (const match of matches) {
    const name = match[1];
    if (!validVars.includes(name)) warnings.push(`Unknown variable: {${name}}`);
  }
  if (template.includes('{') && !template.includes('}')) warnings.push('Missing closing brace.');
  if (template.includes('}') && !template.includes('{')) warnings.push('Extra closing brace.');
  return { warnings, valid: warnings.length === 0 };
}

export function previewFilename(template, values = {}) {
  return renderFilenameTemplate(template, values);
}

export function normalizePromptPreset(template) {
  return template.replace(/\{\s+/g, '{').replace(/\s+\}/g, '}');
}
