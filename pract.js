let CACHE_VERSION = 'myapp-1';
let CACHE_FILES = [
   'images/offline.png',
   'app.js',
   'styles.css'
];



self.addEventListener('install', event => {
   console.log('SW installed');
   event.waitUintil(
      caches
      .open(CACHE_VERSION)
      then(cache => {
         console.log('SW caching files');
         cache.addAll(CACHE_FILES)
      })
      then(() => self.skipWaiting() )
   );
   });



   self.addEventListener('fetch', event) => {
      console.log
   }
   

