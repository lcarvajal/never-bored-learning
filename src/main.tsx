import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import ErrorPage from "./pages/ErrorPage.tsx";
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import LandingPage from './pages/LandingPage.tsx';
import LearningOverviewPage from './pages/LearningOverviewPage.tsx';

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "learning-overview/",
    element: <LearningOverviewPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tasks/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
