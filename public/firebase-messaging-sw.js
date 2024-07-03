importScripts('https://www.gstatic.com/firebasejs/<v9+>/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/<v9+>/firebase-messaging-compat.js');
importScripts('/__/firebase/init.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "never-bored-learning.firebaseapp.com",
  projectId: "never-bored-learning",
  storageBucket: "never-bored-learning.appspot.com",
  messagingSenderId: "456933280849",
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});