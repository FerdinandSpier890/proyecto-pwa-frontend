importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyB9IXfHV6PmmHKrDdEQRCcsv_fPtE6HxLk",
    authDomain: "proyectopwa-ac78a.firebaseapp.com",
    projectId: "proyectopwa-ac78a",
    storageBucket: "proyectopwa-ac78a.appspot.com",
    messagingSenderId: "461679034490",
    appId: "1:461679034490:web:e6bccbefae1c638697fbc3",
    measurementId: "G-WFF5SJCSNV"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '../src/images/icons/app-icon-96x96.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
