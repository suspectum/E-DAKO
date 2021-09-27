import { lazy } from 'react';

// assets
import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiDollarSign } from '@react-icons/all-files/fi/FiDollarSign';
import { FiTool } from '@react-icons/all-files/fi/FiTool';
import { FiBell } from '@react-icons/all-files/fi/FiBell';
import { FiPhoneCall } from '@react-icons/all-files/fi/FiPhoneCall';

import { Loadable } from 'components';

const AccountSettings = Loadable(lazy(() => import('views/user/AccountSettings')));
const SocialProfile = Loadable(lazy(() => import('views/user/SocialProfile')));

//-----------------------|| EXTRA PAGES MENU ITEMS ||-----------------------//

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
        },
      ],
    },

    {
      id: 'pricing',
      title: 'Pricing',
      url: '',
      icon: FiDollarSign,
      chip: {
        color: 'primary',
        variant: 'filled',
        size: 'small',
        label: '5',
      },
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      url: '',
      icon: FiTool,
    },
    {
      id: 'landing',
      title: 'Landing',

      icon: FiBell,
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      url: '',
      icon: FiPhoneCall,
    },
  ],
};
