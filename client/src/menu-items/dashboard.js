import { lazy } from 'react';

// assets
import { FiHome } from '@react-icons/all-files/fi/FiHome';
import { FiActivity } from '@react-icons/all-files/fi/FiActivity';

import { Loadable } from 'components';
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Dashboard')));

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  children: [
    {
      id: 'default',
      title: 'Default',
      url: '/dashboard',
      element: <DashboardDefault />,
      icon: FiHome,
    },
    {
      id: 'analytics',
      title: 'Analytics',
      url: '',
      icon: FiActivity,
    },
  ],
};
