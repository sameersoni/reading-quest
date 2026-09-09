/* Reading Quest service worker
   Bump CACHE_NAME whenever you change any cached file so the new
   version replaces the old one on the next launch. */
const CACHE_NAME = 'reading-quest-v2';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/illustrations.js',
  './js/stories.js',
  './js/storage.js',
  './js/app.js',
  './fonts/baloo-2-latin-400-normal.woff2',
  './fonts/baloo-2-latin-500-normal.woff2',
  './fonts/baloo-2-latin-600-normal.woff2',
  './fonts/baloo-2-latin-700-normal.woff2',
  './fonts/atkinson-hyperlegible-latin-400-normal.woff2',
  './fonts/atkinson-hyperlegible-latin-700-normal.woff2',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

/**
 * iOS Safari refuses to serve a cached response for a *navigation*
 * request if that response object has redirected === true (this can
 * happen even for same-origin URLs, e.g. a host/CDN normalising
 * "/" to "/index.html"). The fix is to always rebuild a fresh,
 * non-redirected Response before putting anything in the cache.
 */
async function toPlainResponse(response) {
  const body = await response.blob();
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

async function precache() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(
    PRECACHE_URLS.map(async (url) => {
      try {
        const response = await fetch(url, { cache: 'no-cache' });
        if (!response.ok) return;
        await cache.put(url, await toPlainResponse(response));
      } catch (err) {
        console.warn('Reading Quest SW: failed to precache', url, err);
      }
    })
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first for everything in the app shell; falls back to network,
// and falls back to the cached index.html for navigations if offline
// and the exact URL wasn't precached.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then(async (response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const plain = await toPlainResponse(response.clone());
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, plain);
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') return caches.match('./index.html');
        });
    })
  );
});
