import { Navigate } from 'react-router-dom';

// project imports
import { MainLayout } from 'layout';
import { menuItems } from 'menu-items';

// Menu Items
const getItem = (item) => (item.element ? { path: item.url, element: item.element } : item.children?.map(getItem));
const notUndefined = (item) => typeof item !== 'undefined';

const filteredRoutes = menuItems.items.map(getItem).flat(Infinity).filter(notUndefined);

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

const mergedRoutes = [...filteredRoutes, ...redirectedRoutes];

export const ProtectedRoutes = {
  path: '/',
  element: <MainLayout />,
  children: mergedRoutes,
};
