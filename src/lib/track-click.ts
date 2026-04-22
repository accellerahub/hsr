export function trackClick(ctaKey: string) {
  if (typeof window === "undefined") return
  try {
    const blob = new Blob([JSON.stringify({ cta_key: ctaKey })], {
      type: "application/json",
    })
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track-click", blob)
      return
    }
    fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cta_key: ctaKey }),
      keepalive: true,
    }).catch(() => {})
  } catch {}
}
