import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import { Loadable } from 'components';

const Auth = Loadable(lazy(() => import('views/authentication/Auth')));
const VerifyEmail = Loadable(lazy(() => import('views/accounts/VerifyEmail')));
const ForgotPassword = Loadable(lazy(() => import('views/accounts/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('views/accounts/ResetPassword')));

const routesPublic = [
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: <Auth />,
  },
  // {
  //   path: '*',
  //   element: <Navigate to="/" />,
  // },
];

export const PublicRoutes = {
  path: '',
  element: '',
  children: routesPublic,
};
