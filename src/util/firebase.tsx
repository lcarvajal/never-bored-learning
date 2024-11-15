import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

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
export const auth = getAuth(app);

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

interface NotificationOptions {
  body?: string;
  icon?: string;
  // You can add other Notification options here if needed
}

export const showNotification = async (title: string, options: NotificationOptions): Promise<Notification | void> => {
  if (!("Notification" in window)) {
    throw new Error("Notification not supported");
  }

  if (Notification.permission === "granted") {
    const notification = new Notification(title, options);
    notification.onclick = () => {
      if (document.visibilityState === 'hidden') {
        window.open(window.location.href, '_blank');
      } else {
        window.focus();
      }
    };
    return notification;
  } else if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return new Notification(title, options);
    } else {
      throw new Error("Permission not granted for Notification");
    }
  } else {
    throw new Error("Permission not granted for Notification");
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

export const listenToAuthChanges = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, callback);
};