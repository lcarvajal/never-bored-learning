import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import routes from './routes/routes';
import { auth } from './util/firebase';
import { setRequestToken } from './util/axios';
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { Banner, cookieConsentGiven } from './components/Banner';
import Navbar from './components/Navbar';
import { UserProvider } from './routes/UserContext';


// Initialize PostHog
posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
  api_host: "https://eu.i.posthog.com",
  autocapture: false, 
  persistence: cookieConsentGiven() === 'yes' ? 'localStorage+cookie' : 'memory'
})


// Register the service worker for push notifications
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`firebase-messaging-sw.js`)
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

auth.onAuthStateChanged(function (user) {
  if (user) {
    user.getIdToken().then(function (idToken) {
      setRequestToken(idToken);
    });
  }
});

// Refresh token when expired
auth.onIdTokenChanged(function (user) {
  if (user) {
    user.getIdToken().then(function (idToken) {
      setRequestToken(idToken);
    });
  }
})

const router = createBrowserRouter([...routes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <PostHogProvider client={posthog}>
        <Navbar />
        <div className="p-4 w-full">
          <RouterProvider router={router} />
        </div>
        <Banner />
      </PostHogProvider>
    </UserProvider>
  </React.StrictMode>,
)
