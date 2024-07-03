import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "never-bored-learning.firebaseapp.com",
  projectId: "never-bored-learning",
  storageBucket: "never-bored-learning.appspot.com",
  messagingSenderId: "456933280849",
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
    if (currentToken) {
      console.log('Token received: ', currentToken);
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});