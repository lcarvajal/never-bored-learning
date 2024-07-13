import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from "./pages/public/ErrorPage.tsx";
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import LearningOverviewPage from './pages/LearningOverviewPage.tsx';
import SignUpPage from './pages/public/SignUpPage.tsx';
import SignInPage from './pages/public/SignInPage.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import CreateLearnerProfilePage from './pages/CreateLearnerProfilePage.tsx';

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
  // Private routes
  {
    path: "/",
    element: (
      <PrivateRoute>
        {/* Change to TasksPage later */}
        <LearningOverviewPage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/learning-overview/",
    element: (
      <PrivateRoute>
        <LearningOverviewPage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },

  // Public routes
  {
    path: "/sign-up/",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-in/",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-learner-profile/",
    element: <CreateLearnerProfilePage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
