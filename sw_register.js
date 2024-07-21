if (navigator.serviceWorker) {
   window.addEventListener('load', () => {
      navigator.serviceWorker.register('./pajaro_sw.js')
         .then(registration => console.log('SW registered'))
         .catch(err => console.log(`SW not registered - Error: ${err}`))
   })
} else {
   console.log('Service Worker is not supported in this browser.')
}