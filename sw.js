const cacheName = 'kane-calc-v1.01';
// Ensure 'icon.jpg' matches your filename exactly
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.jpg'
];

// 1. Install Event: Saves the files into the browser's Cache Storage
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Caching Files');
      return cache.addAll(assets);
    })
  );
});

// 2. Activate Event: Cleans up old caches (useful if you update your app)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch Event: Serves the app from cache even when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Return the cached file if found, otherwise fetch from network
      return response || fetch(e.request);
    })
  );
});
