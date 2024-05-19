if (navigator.serviceWorker) {
   window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker1.js')
         .then(registration => console.log('SW registered'))
         .catch(err => console.log(`SW not registered - Error: ${err}`))
   })
} else {
   console.log('Service Worker is not supported in this browser.')
}