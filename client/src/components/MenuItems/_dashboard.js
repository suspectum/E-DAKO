// icons
import { FiHome } from '@react-icons/all-files/fi/FiHome';
// import { FiActivity } from '@react-icons/all-files/fi/FiActivity';

// project imports
import { lazyImport } from 'utils';

const { Dashboard } = lazyImport(() => import('views/dashboard/Dashboard'), 'Dashboard');

//================================|| DASHBOARD MENU ITEMS ||================================//

export const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  children: [
    {
      id: 'default',
      title: 'Default',
      url: '/dashboard',
      element: <Dashboard />,
      icon: FiHome,
    },
    // {
    //   id: 'analytics',
    //   title: 'Analytics',
    //   url: '',
    //   icon: FiActivity,
    // },
  ],
};
