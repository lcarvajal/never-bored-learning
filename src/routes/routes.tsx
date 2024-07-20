import LearningOverviewPage from '../pages/LearningOverviewPage.tsx';
import PrivateRoute from './PrivateRoute.tsx';
import ErrorPage from '../pages/public/ErrorPage.tsx';
import SignUpPage from '../pages/public/SignUpPage.tsx';
import CreateLearnerProfilePage from '../pages/public/CreateLearnerProfilePage.tsx';
import LandingPage from '../pages/public/LandingPage.tsx';
import ProfilePage from '../pages/ProfilePage.tsx';
import TasksPage from '../pages/TasksPage.tsx';

export default [
  {
    // Private routes
    path: "/",
    element: (
      <PrivateRoute>
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
  {
    path: "/:roadmapName/:moduleId",
    element: (
      <PrivateRoute>
        <TasksPage />
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

  // Public routes
  {
    path: "/get-started/",
    element: (
      <LandingPage />
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
]