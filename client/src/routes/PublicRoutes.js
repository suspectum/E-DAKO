import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project imports
import { lazyImport } from 'utils';
import { Loader } from 'components';

const { Auth } = lazyImport(() => import('views/authentication/Auth'), 'Auth');
const { VerifyEmail } = lazyImport(() => import('views/authentication/account/VerifyEmail'), 'VerifyEmail');
const { ResetPassword } = lazyImport(() => import('views/authentication/account/ResetPassword'), 'ResetPassword');
const { ForgotPassword } = lazyImport(() => import('views/authentication/account/ForgotPassword'), 'ForgotPassword');

const routesPublic = [
  {
    path: '/',
    element: <Auth />,
  },
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
];

const App = () => (
  <Suspense fallback={<Loader />}>
    <Outlet />
  </Suspense>
);

//================================|| PUBLIC ROUTES ||================================//

export const PublicRoutes = {
  path: '',
  element: <App />,
  children: routesPublic,
};
