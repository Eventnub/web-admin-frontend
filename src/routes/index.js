import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

// IMPORT COMPONENTS

// Authentication
const Auth = Loadable(lazy(() => import('../pages/auth/Auth')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));

// Dashboard
const Events = Loadable(lazy(() => import('../pages/dashboard/Events')));
const EventDetailsPage = Loadable(lazy(() => import('../pages/dashboard/EventDatailsPage')));
const CreateEventPage = Loadable(lazy(() => import('../pages/dashboard/CreateEventPage')));
const UpdateEventPage = Loadable(lazy(() => import('../pages/dashboard/UpdateEvent')));
const ArchivedEventsPage = Loadable(lazy(() => import('../pages/dashboard/ArchivedEventsPage')));
const AudioValidationPage = Loadable(lazy(() => import('../pages/dashboard/AudioValidationPage')));
const PendingValidationsPage = Loadable(lazy(() => import('../pages/dashboard/PendingValidationsPage')));
const ArtistsPage = Loadable(lazy(() => import('../pages/dashboard/ArtistsPage')));
const ValidateAudioPage = Loadable(lazy(() => import('../pages/dashboard/ValidateAudioPage')));

// Main
const HomePage = Loadable(lazy(() => import('../pages/dashboard/Home')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

export default function Router() {
  return useRoutes([
    // Authentication Routes
    {
      path: 'auth',
      children: [
        {
          element: (
            <GuestGuard>
              <Auth />
            </GuestGuard>
          ),
          index: true,
        },

        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard Routes with Nav
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'events', element: <Events /> },
        { path: 'home', element: <HomePage /> },
        {
          path: 'event-details/:eventId',
          element: <EventDetailsPage />,
        },
        { path: 'create-event', element: <CreateEventPage /> },
        { path: 'archived-events', element: <ArchivedEventsPage /> },
        { path: 'audio-validation', element: <AudioValidationPage /> },
        { path: 'pending-validations', element: <PendingValidationsPage /> },
        { path: 'artists', element: <ArtistsPage /> },
        { path: 'update-event/:eventId', element: <UpdateEventPage /> },
        { path: 'validate-audio/:musicMatchSubmissionId', element: <ValidateAudioPage /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <Login />,
      index: true,
    },
    // {
    //   path: 'home',
    //   element: <HomePage />,
    // },
    // {
    //   path: 'event-details/:eventId',
    //   element: <EventDetailsPage />,
    // },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
