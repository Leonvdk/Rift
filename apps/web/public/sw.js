// Kill-switch service worker.
// If a previous deployment registered a real service worker, this no-op
// version unregisters itself and clears all caches so the browser stops
// serving stale chunks. Safe to keep around; it does nothing on first load.
self.addEventListener("install", () => self.skipWaiting())
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map((name) => caches.delete(name)))
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: "window" })
      for (const client of clients) client.navigate(client.url)
    })(),
  )
})
