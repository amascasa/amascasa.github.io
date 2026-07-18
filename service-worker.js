// service-worker.js (safe version)
const VERSION = 'EriccoStudio-v1';

const APP_SHELL = [
   '/index.html',
   '/manifest.json',
   '/EriccoStudio.css',
   '/ericco-loop-modal',
   '/favicon.ico',
   '/fonts/amatic-sc-v27-latin-regular.woff2',
];

// 1x1 transparent PNG (base64)
const TRANSPARENT_PNG_BASE64 =
   'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/abM2wAAAABJRU5ErkJggg==';

const OFFLINE_HTML = new Response(
   `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
   <title>Offline — MasCasa</title>
   <body style="margin:0;font:16px/1.5 system-ui;background:#000;color:#fff;padding:24px">
   <h1 style="margin:0 0 12px">Offline</h1>
   <p>You're offline. Core pages still work; images you've viewed are cached.</p>
   </body>`,
   { headers: { 'Content-Type': 'text/html' } }
);

self.addEventListener('install', (event) => {
   event.waitUntil(caches.open(VERSION).then((c) => c.addAll(APP_SHELL)));
   self.skipWaiting();
});

self.addEventListener('activate', (event) => {
   event.waitUntil(
      caches.keys().then((keys) =>
         Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
      )
   );
   self.clients.claim();
});

self.addEventListener('fetch', (event) => {
   const req = event.request;
   if (req.method !== 'GET') return;

   const url = new URL(req.url);

   // HTML navigations: network→cache; fallback to offline page
   if (req.mode === 'navigate') {
      event.respondWith((async () => {
         try {
            const fresh = await fetch(req);
            const cache = await caches.open(VERSION);
            cache.put(req, fresh.clone());
            return fresh;
         } catch {
            const cached = await caches.match(req);
            return cached || OFFLINE_HTML;
         }
      })());
      return;
   }

   // Images: stale-while-revalidate; fallback to transparent pixel (prevents TypeError)
   if (/\.(?:avif|webp|jpe?g|png|gif|svg)$/i.test(url.pathname)) {
      event.respondWith((async () => {
         const cache = await caches.open(VERSION);
         const cached = await cache.match(req);
         try {
            const fresh = await fetch(req);
            if (fresh.ok) cache.put(req, fresh.clone());
            return cached || fresh;
         } catch {
            if (cached) return cached;
            const bytes = Uint8Array.from(atob(TRANSPARENT_PNG_BASE64), c => c.charCodeAt(0));
            return new Response(bytes, { headers: { 'Content-Type': 'image/png' } });
         }
      })());
      return;
   }

   // Everything else: cache-first; fallback to network; then a clean 504
   event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
         const fresh = await fetch(req);
         if (fresh.ok && req.url.startsWith(self.location.origin)) {
            const cache = await caches.open(VERSION);
            cache.put(req, fresh.clone());
         }
         return fresh;
      } catch {
         return new Response('Offline', { status: 504, statusText: 'Offline' });
      }
   })());
});
