export function logDiagnostic(category, severity, code, title, userMessage, technicalDetail, sourceHost = null, jobId = null) {
  return {
    id: `diag-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: Date.now(),
    category,
    severity,
    code,
    title,
    userMessage,
    technicalDetail,
    sourceHost,
    jobId,
    resolved: false
  };
}
