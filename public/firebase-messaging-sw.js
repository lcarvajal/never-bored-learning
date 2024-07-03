importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyAK0N08gVwwWEa79sSlcdTLz1YENDa5-uM',
  authDomain: "never-bored-learning.firebaseapp.com",
  projectId: 'never-bored-learning',
  storageBucket: 'never-bored-learning.appspot.com',
  messagingSenderId: "456933280849",
  appId: '1:456933280849:web:cca8b312e967b5709efc70',
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.addEventListener('notificationclick', event => {
  const notificationData = event.notification.data;

  if (notificationData.url) {
    clients.openWindow(notificationData.url);
  }

  event.notification.close();
});