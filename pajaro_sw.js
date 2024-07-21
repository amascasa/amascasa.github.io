var CACHE_VERSION = 'myapp-v2';
var CACHE_FILES = [
   './index_pajaro.html',
   './sw_register.js',
   './pajaro_sw.js',
   './pajaro_manifest.json',
];

self.addEventListener('install', event => { //installs servive worker
   console.log('SW installed');
   event.waitUntil(
      caches
         .open(CACHE_VERSION) //returns promise so .then()
         .then(cache => {
            console.log('SW caching files');
            cache.addAll(CACHE_FILES)
         })
         .then(() => self.skipWaiting())  // avoids the 'awaiting status'
   );
});

self.addEventListener('activate', event => {  //service worker takes control of page
   console.log('SW activated');
   event.waitUntil(    //old cache cleared
      caches.keys().then(keyNames => {
         return Promise.all(
            keyNames.map(key => {
               if (key !== CACHE_VERSION) {
                  console.log('SW clearing old caches');
                  return caches.delete(key);
               }
            })
         );
      })
   );
});

self.addEventListener('fetch', event => {  //fetches the cached files for offline usage
   console.log('SW fetching');
   event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))  //event.request return false for no connection
   );                                    //loads cached files
});