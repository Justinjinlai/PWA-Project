const cacheName = 'bmw-m5-cache-v1';
const staticAssets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/images/f90-m5.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/sounds/engine.mp3',
  '/data/facts.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(staticAssets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
