export function validateAuthority({ basis, confirmed, protectedSource = false }) {
  const errors = [];
  if (protectedSource) errors.push('Protected media cannot proceed to download.');
  if (!basis) errors.push('Authority basis is required.');
  if (!confirmed) errors.push('User confirmation is required.');
  return { valid: errors.length === 0, errors };
}
