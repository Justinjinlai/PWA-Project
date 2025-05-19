const CACHE_NAME = "monkey-cache-v1";
const urlsToCache = [
  "index.html",
  "gorilla.jpg",
  "capuchin.jpg",
  "gorilla.mp3",
  "capuchin.mp3",
  "styles.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
