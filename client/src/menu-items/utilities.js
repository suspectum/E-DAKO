import { lazy } from 'react';

// assets
import { FiType } from '@react-icons/all-files/fi/FiType';
import { FiFramer } from '@react-icons/all-files/fi/FiFramer';
import { FiAward } from '@react-icons/all-files/fi/FiAward';

import { Loadable } from 'components';

const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
  id: 'utilities',
  title: 'Utilities',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      element: <UtilsTypography />,
      url: '/utils/util-typography',
      icon: FiType,
    },
    {
      id: 'util-color',
      title: 'Color',
      element: <UtilsColor />,
      url: '/utils/util-color',
      icon: FiAward,
      chip: {
        color: 'primary',
        variant: 'filled',
        size: 'small',
        label: 'Coded',
        avatar: 'C',
      },
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      element: <UtilsShadow />,
      url: '/utils/util-shadow',
      icon: FiAward,
    },
    {
      id: 'icons',
      title: 'Icons',
      caption: 'Icons Caption',
      url: '',
      icon: FiAward,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          caption: 'Tabler Icons Caption',
          element: <UtilsTablerIcons />,
          url: '/icons/tabler-icons',
        },
        {
          id: 'sub-test',
          title: 'Sub Test',

          children: [
            {
              id: 'material-icons',
              title: 'Material Icons',
              element: <UtilsMaterialIcons />,
              url: '/icons/material-icons',
            },
            {
              id: 'signIn',
              title: 'SignIn',
            },
            {
              id: 'signup',
              title: 'SignUp',
            },
          ],
        },
      ],
    },
    {
      id: 'animation',
      title: 'Animation',
      icon: FiFramer,
    },
    {
      id: 'grid',
      title: 'Grid',
      icon: FiAward,
    },
    {
      id: 'disabled',
      title: 'Disabled',
      icon: FiAward,
      disabled: true,
    },
  ],
};
