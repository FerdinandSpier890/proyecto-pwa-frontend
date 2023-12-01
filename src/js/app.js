/* jshint esversion: 6 */
/* jshint esversion: 8 */

if ('serviceWorker' in navigator) {
  // Registro del Service Worker
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(function(error) {
      console.log('Error al registrar el Service Worker:', error);
    });
}
