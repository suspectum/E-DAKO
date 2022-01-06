// icons
import { FiType } from '@react-icons/all-files/fi/FiType';
import { FiCloud } from '@react-icons/all-files/fi/FiCloud';
import { FiFeather } from '@react-icons/all-files/fi/FiFeather';
import { FiDroplet } from '@react-icons/all-files/fi/FiDroplet';

// project imports
import { lazyImport } from 'utils';

const { UIColor } = lazyImport(() => import('views/utilities/Color'), 'UIColor');
const { Typography } = lazyImport(() => import('views/utilities/Typography'), 'Typography');
const { ReactIcons } = lazyImport(() => import('views/utilities/ReactIcons'), 'ReactIcons');
const { TablerIcons } = lazyImport(() => import('views/utilities/TablerIcons'), 'TablerIcons');
const { FeatherIcons } = lazyImport(() => import('views/utilities/FeatherIcons'), 'FeatherIcons');
const { UtilitiesShadow } = lazyImport(() => import('views/utilities/Shadow'), 'UtilitiesShadow');
const { MaterialIcons } = lazyImport(() => import('views/utilities/MaterialIcons'), 'MaterialIcons');
const { BootstrapIcons } = lazyImport(() => import('views/utilities/BootstrapIcons'), 'BootstrapIcons');

//================================|| UTILITIES MENU ITEMS ||================================//

export const utilities = {
  id: 'utilities',
  title: 'Utilities',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      element: <Typography />,
      url: '/utils/util-typography',
      icon: FiType,
    },
    {
      id: 'util-color',
      title: 'Color',
      element: <UIColor />,
      url: '/utils/util-color',
      icon: FiDroplet,
      // chip: {
      //   color: 'primary',
      //   variant: 'filled',
      //   size: 'small',
      //   label: 'Coded',
      //   avatar: 'C',
      // },
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      element: <UtilitiesShadow />,
      url: '/utils/util-shadow',
      icon: FiCloud,
    },
    {
      id: 'icons',
      title: 'Icons',
      caption: 'Icons Caption',
      url: '',
      icon: FiFeather,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          element: <TablerIcons />,
          url: '/icons/tabler-icons',
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          element: <MaterialIcons />,
          url: '/icons/material-icons',
        },
        {
          id: 'react-icons',
          title: 'React Icons',
          // caption: 'React Icons Caption',
          url: '',
          children: [
            {
              id: 'all-react-icons',
              title: 'All React Icons',
              element: <ReactIcons />,
              url: '/icons/react-icons',
            },
            {
              id: 'feather-icons',
              title: 'Feather Icons',
              element: <FeatherIcons />,
              url: '/icons/feather-icons',
            },
            {
              id: 'bootstrap-icons',
              title: 'Bootstrap Icons',
              element: <BootstrapIcons />,
              url: '/icons/bootstrap-icons',
            },
          ],
        },
      ],
    },
  ],
};
