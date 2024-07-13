import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import routes from './routes/routes';
import { auth } from './util/firebase';
import { setTokenForAxiosRequests } from './util/axios';

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`firebase-messaging-sw.js`)
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// Set bearer token for requests to server
auth.onAuthStateChanged(function (user) {
  if (user) {
    user.getIdToken().then(function (idToken) {
      setTokenForAxiosRequests(idToken);
    });
  }
});

const router = createBrowserRouter([...routes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
