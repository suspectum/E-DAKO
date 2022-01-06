import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// project imports
import { lazyImport } from 'utils';
import { Roles } from 'constants/constants';
import { Layout, Loader, menuItems } from 'components';

// elements from menu items
const getItem = (item) => (item.element ? { path: item.url, element: item.element, role: item.role } : item.children?.map(getItem));
const notUndefined = (item) => typeof item !== 'undefined';
const filteredRoutes = menuItems.items.map(getItem).flat(Infinity).filter(notUndefined);
const adminRoutes = filteredRoutes.filter((item) => item.role === Roles.Admin);
const commonRoutes = filteredRoutes.filter((item) => item.role !== Roles.Admin);

// elements from views
const { UserSettings } = lazyImport(() => import('views/admin/UserSettings/UserSettings'), 'UserSettings');

const redirectedRoutes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" />,
  },
];

const additionalAdminRoutes = [
  {
    path: '/users/add',
    element: <UserSettings />,
  },
  {
    path: '/users/edit/:id',
    element: <UserSettings />,
  },
];

const App = () => (
  <Layout>
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  </Layout>
);
const mergedCommonRoutes = [...commonRoutes, ...redirectedRoutes];
const mergedAdminRoutes = [...adminRoutes, ...additionalAdminRoutes, ...mergedCommonRoutes];

//================================|| PROTECTED ROUTES ||================================//

export const ProtectedRoutes = (userInfo) => {
  const routes = (userInfo?.role === Roles.Admin && mergedAdminRoutes) || mergedCommonRoutes;
  return {
    path: '/',
    element: <App />,
    children: routes,
  };
};
