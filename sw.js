// // sw.js estatico

// const cacheName = "my-cache-v2";

// const staticAssets = [
//    "./",
//    "./index.html",
//    "./src/views/EmpresasPage.vue",
//    "./src/views/HomePage.vue",
//    "./src/views/RegistrarEmpresasPage.vue",
//    "./src/views/RegistrarProyectosPage.vue",
//    "./src/views/RegistroPage.vue",
//    "./src/images/logo.png",
//    "./src/images/perfil.png",
//    "./src/images/icons/app-icon-48x48.png",
//    "./src/images/icons/app-icon-96x96.png",
//    "./src/images/icons/app-icon-144x144.png",
//    "./src/images/icons/app-icon-192x192.png",
//    "./src/images/icons/app-icon-256x256.png",
//    "./src/images/icons/app-icon-384x384.png",
//    "./src/images/icons/app-icon-512x512.png",
//    "./public/firebase-messaging-sw.js",
//  ];

// // self.addEventListener("install", function (event) {
// //   console.log("Service Worker instalándose...");

// //   event.waitUntil(
// //     caches
// //       .open(cacheName)
// //       .then(function (cache) {
// //         return cache.addAll(staticAssets);
// //       })
// //       .catch(function (error) {
// //         console.error("Error durante la instalación:", error);
// //       })
// //   );
// // });

// // self.addEventListener("activate", function (event) {
// //   console.log("Service Worker activándose...");

// //   event.waitUntil(
// //     caches.keys().then(function (cacheNames) {
// //       return Promise.all(
// //         cacheNames
// //           .filter(function (name) {
// //             return name !== cacheName;
// //           })
// //           .map(function (name) {
// //             console.log("Eliminando caché antigua:", name);
// //             return caches.delete(name);
// //           })
// //       );
// //     })
// //   );
// // });

// // self.addEventListener("fetch", function (event) {
// //   console.log(
// //     "Service Worker manejando solicitud de fetch para:",
// //     event.request.url
// //   );

// //   event.respondWith(
// //     caches.match(event.request).then(function (response) {
// //       return response || fetch(event.request);
// //     })
// //   );
// // });

// // sw.js dinamico

// //const cacheName = 'my-cache-v4';

// self.addEventListener('install', function(event) {
// console.log('Service Worker instalándose...');

//    event.waitUntil(
//      caches.open(cacheName).then(function(cache) {
//        // Puedes agregar recursos iniciales aquí si es necesario
//      })
//    );
//  });

//  self.addEventListener('activate', function(event) {
//    console.log('Service Worker activándose...');

//    event.waitUntil(
//      caches.keys().then(function(cacheNames) {
//        return Promise.all(
//          cacheNames.filter(function(name) {
//            return name !== cacheName;
//          }).map(function(name) {
//            console.log('Eliminando caché antigua:', name);
//            return caches.delete(name);
//          })
//        );
//      })
//    );
//  });

//  self.addEventListener('fetch', function(event) {
//    console.log('Service Worker manejando solicitud de fetch para:', event.request.url);

//    event.respondWith(
//      caches.match(event.request).then(function(cachedResponse) {
//        if (cachedResponse) {
//          return cachedResponse;
//        }

//        // Si no hay una respuesta en la caché, realiza la solicitud de red
//        return fetch(event.request).then(function(response) {
//          // Clona la respuesta antes de almacenarla en la caché
//          const responseToCache = response.clone();

//          // Abre la caché y almacena la respuesta clonada para futuras solicitudes
//          caches.open(cacheName).then(function(cache) {
//            cache.put(event.request, responseToCache);
//          });

// //         // Retorna la respuesta original
//          return response;
//        });
//      })
//    );
//  });


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
            "src/images/logo.png",
            "src/images/perfil.png",
            "src/images/icons/app-icon-48x48.png",
            "src/images/icons/app-icon-96x96.png",
            "src/images/icons/app-icon-144x144.png",
            "src/images/icons/app-icon-192x192.png",
            "src/images/icons/app-icon-256x256.png",
            "src/images/icons/app-icon-384x384.png",
            "src/images/icons/app-icon-512x512.png",
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

  