import PrivateRoute from './PrivateRoute.tsx';
import ErrorPage from '../pages/public/ErrorPage.tsx';
import SignUpPage from '../pages/public/SignUpPage.tsx';
import CreateLearnerProfilePage from '../pages/public/CreateLearnerProfilePage.tsx';
import LandingPage from '../pages/public/LandingPage.tsx';
import ProfilePage from '../pages/ProfilePage.tsx';
import JavaScriptLandingPage from '../pages/public/JavaScriptLandingPage.tsx';
import CreateRoadmapPage from '../pages/CreateRoadmapPage.tsx';
import CheckoutPage from '../pages/CheckoutPage.tsx';
import TermsPage from '../pages/public/TermsPage.tsx';
import RoadmapPage from '../pages/RoadmapPage.tsx';
import FollowedRoadmapsPage from '../pages/FollowedRoadmapsPage.tsx';

export default [
  // Private routes
  {
    path: "/",
    element: (
      <PrivateRoute>
        <FollowedRoadmapsPage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/roadmaps",
    element: (
      <PrivateRoute>
        <FollowedRoadmapsPage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/roadmaps/:roadmapId",
    element: (
      <PrivateRoute>
        <RoadmapPage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/roadmaps/new/",
    element: (
      <PrivateRoute>
        <CreateRoadmapPage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/",
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout/",
    element: (
      <PrivateRoute>
        <CheckoutPage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },

  // Public routes
  {
    path: "/get-started/",
    element: (
      <LandingPage />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/get-started/javascript",
    element: (
      <JavaScriptLandingPage />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up/",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-learner-profile/",
    element: <CreateLearnerProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms-and-conditions/",
    element: <TermsPage />,
    errorElement: <ErrorPage />,
  }
]