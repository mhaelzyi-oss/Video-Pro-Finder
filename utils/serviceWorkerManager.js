export async function checkServiceWorker() {
  return { ready: true, healthy: true };
}

export async function hydrateExtensionState() {
  return { ok: true };
}
