const CACHE_NAME = 'wennei-pwa-v1';
// 請確保這些路徑都加上了 /Wunai-Website-Part-2/
const ASSETS = [
  '/Wunai-Website-Part-2/',
  '/Wunai-Website-Part-2/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
