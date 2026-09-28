export function ensureQueueIntegrity(queue) {
  return Array.isArray(queue) ? queue : [];
}

export function repairQueueState(state) {
  return { ...state, queue: ensureQueueIntegrity(state.queue) };
}
