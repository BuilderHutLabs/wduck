// Retires the service worker of the old WDuck install (scope /wduck/):
// drops its caches, unregisters itself and sends open windows to the new address.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      // only this scope's caches: DuckFix (/duckfix/) shares the origin
      await Promise.all(keys.filter((k) => k.includes('/wduck/')).map((k) => caches.delete(k)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: 'window' });
      for (const w of windows) w.navigate('https://builderhutlabs.github.io/duckfix/');
    })(),
  );
});
