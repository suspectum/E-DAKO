// icons
import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import { FiRefreshCw } from '@react-icons/all-files/fi/FiRefreshCw';
// import { FiBell } from '@react-icons/all-files/fi/FiBell';
// import { FiTool } from '@react-icons/all-files/fi/FiTool';
// import { FiPhoneCall } from '@react-icons/all-files/fi/FiPhoneCall';
// import { FiDollarSign } from '@react-icons/all-files/fi/FiDollarSign';

// project imports
import { lazyImport } from 'utils';
import { Roles } from 'constants/constants';

// const { Assets } = lazyImport(() => import('views/assets/Assets'), 'Assets');
const { UserList } = lazyImport(() => import('views/admin/UserList/UserList'), 'UserList');
const { Transactions } = lazyImport(() => import('views/transactions/Transactions'), 'Transactions');
const { SocialProfile } = lazyImport(() => import('views/user/SocialProfile/SocialProfile'), 'SocialProfile');
const { AccountSettings } = lazyImport(() => import('views/user/AccountSetting/AccountSettings'), 'AccountSettings');

//================================|| EXTRA PAGES MENU ITEMS ||================================//

export const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  children: [
    {
      id: 'user',
      title: 'User',
      url: '',
      icon: FiUser,
      children: [
        {
          id: 'account-settings',
          title: 'Account Settings',
          url: '/user/account-settings',
          element: <AccountSettings />,
        },
        {
          id: 'social-profile',
          title: 'Social Profile',
          url: '/user/social-profile',
          element: <SocialProfile />,
          disabled: true,
        },
      ],
    },
    {
      id: 'users',
      title: 'Users',
      element: <UserList />,
      url: '/users',
      icon: FiUsers,
      role: Roles.Admin,
    },
    {
      id: 'transactions',
      title: 'Transactions',
      element: <Transactions />,
      url: '/transactions',
      icon: FiRefreshCw,
    },
    // {
    //   id: 'assets',
    //   title: 'Assets',
    //   element: <Assets />,
    //   url: '/assets',
    //   icon: FiDollarSign,
    //   chip: {
    //     color: 'primary',
    //     variant: 'filled',
    //     size: 'small',
    //     label: '5',
    //   },
    // },
    // {
    //   id: 'maintenance',
    //   title: 'Maintenance',
    //   icon: FiTool,
    // },
    // {
    //   id: 'landing',
    //   title: 'Landing',
    //   icon: FiBell,
    // },
    // {
    //   id: 'contact-us',
    //   title: 'Contact Us',
    //   url: '',
    //   icon: FiPhoneCall,
    // },
  ],
};
