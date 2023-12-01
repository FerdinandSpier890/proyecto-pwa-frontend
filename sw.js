// const CACHE_NAME = 'my-pwa-cache-v1';
// const urlsToCache = [
// '/',
// '/index.html',
// '/src/views/EmpresasPage.vue',
// '/src/views/HomePage.vue',
// '/src/views/RegistrarEmpresasPage.vue',
// '/src/views/RegistrarProyectosPage.vue',
// '/src/views/RegistroPage.vue',
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('activate', (event) => {
//   console.log('Service Worker activado con éxito:', event);
//   event.waitUntil(
//     // ... rest of the activation logic
//   );
//   return self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         // Si el recurso está en caché, devuélvelo
//         if (response) {
//           return response;
//         }
//         // Si el recurso no está en caché, obténlo de la red
//         return fetch(event.request)
//           .then((response) => {
//             // Abre el caché y guarda la respuesta para futuros accesos offline
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             const responseToCache = response.clone();
//             caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, responseToCache);
//             });

//             return response;
//           });
//       })
//   );
// });

// Instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('static')
      .then((cache) => {
          return cache.addAll([
            "/",
            "index.html",
            "src/App.vue",
            "src/views/EmpresasPage.vue",
            "src/views/RegistrarEmpresaPage.vue",
            "src/views/RegistrarProyectosPage.vue",
            "src/views/RegistroPage.vue",
        
            "src/main.ts",
            "firebase-messaging-sw.js",
          ]);
      })
  );
});

// Activación
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando SW ', event);

  // Reclamar el control de todas las páginas abiertas por el Service Worker
  return self.clients.claim();
});

//fetch
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
      // Ignorar solicitudes que no son de tipo GET
      return fetch(event.request);
  }

  // Para contenido estático
  if (event.request.url.match(/\.(js|png|jpg|html|vue)$/)) {
      event.respondWith(
          caches.open('static').then((cache) => {
              return cache.match(event.request).then((response) => {
                  return response || fetch(event.request).then((newResponse) => {
                      cache.put(event.request, newResponse.clone());
                      return newResponse;
                  });
              });
          })
      );
  }

  // Para contenido dinámico de la API
  else if (event.request.url.startsWith('https://localhost:7121/api')) {
      event.respondWith(
          caches.open('apiCache').then((cache) => {
              return cache.match(event.request).then((response) => {
                  return response || fetch(event.request).then((newResponse) => {
                      cache.put(event.request, newResponse.clone());
                      return newResponse;
                  });
              });
          })
      );
  }

  else {
      event.respondWith(
          caches.open('static').then((cache) => {
              return cache.match(event.request).then((response) => {
                  return response || fetch(event.request).then((newResponse) => {
                      cache.put(event.request, newResponse.clone());
                      return newResponse;
                  });
              });
          })
      );
  }
});
// self.addEventListener('fetch', (event) => {

//     // Para contenido estático
//     if (event.request.method === 'GET' && event.request.url.match(/\.(js|png|jpg|html|vue)$/)) {
//         event.respondWith(
//             caches.open('static').then((cache) => {
//                 return cache.match(event.request).then((response) => {
//                     return response || fetch(event.request).then((newResponse) => {
//                         cache.put(event.request, newResponse.clone());
//                         return newResponse;
//                     });
//                 });
//             })
//         );
//     }

//     // Para contenido dinámico de la API
//     else if (event.request.url.startsWith('https://localhost:7121/api')) {
//         event.respondWith(
//             caches.open('apiCache').then((cache) => {
//                 return cache.match(event.request).then((response) => {
//                     return response || fetch(event.request).then((newResponse) => {
//                         cache.put(event.request, newResponse.clone());
//                         return newResponse;
//                     });
//                 });
//             })
//         );
//     }

//     else {
//         event.respondWith(
//             caches.open('static').then((cache) => {
//                 return cache.match(event.request).then((response) => {
//                     return response || fetch(event.request).then((newResponse) => {
//                         cache.put(event.request, newResponse.clone());
//                         return newResponse;
//                     });
//                 });
//             })
//         );
//     }
// });