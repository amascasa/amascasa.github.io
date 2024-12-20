if (navigator.serviceWorker) {
   window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw2.js')
         .then(registration => console.log('SW registered'))
         .catch(err => console.log(`SW not registered - Error: ${err}`))
   })
} else {
   console.log('Service Worker is not supported in this browser.')
}