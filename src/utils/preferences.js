export function readPreference(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(`arief-${key}`)
    return allowed.includes(value) ? value : fallback
  } catch {
    // Private browsing can disable storage; settings still work for this visit.
    return fallback
  }
}

export function savePreference(key, value) {
  try {
    localStorage.setItem(`arief-${key}`, value)
  } catch {
    // Keep the in-memory preference when browser storage is unavailable.
  }
}
