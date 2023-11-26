/* jshint esversion: 6 */
/* jshint esversion: 8 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: '/' })
    .then(() => {
      console.log('Service Worker Registered!');
    })
    .catch((error) =>{
      console.log('Error al registro de SW: ' + error);
    });
  });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});