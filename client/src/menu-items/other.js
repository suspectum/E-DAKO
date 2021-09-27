import { lazy } from 'react';

// assets
import { FiChrome } from '@react-icons/all-files/fi/FiChrome';
import { FiCheckSquare } from '@react-icons/all-files/fi/FiCheckSquare';
import { FiHelpCircle } from '@react-icons/all-files/fi/FiHelpCircle';

import { Loadable } from 'components';
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const other = {
  id: 'samples',
  title: 'Samples',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      url: '/sample-page',
      element: <SamplePage />,
      icon: FiChrome,
    },
    {
      id: 'documentation',
      title: 'Documentation',
      url: '/https://codedthemes.gitbook.io/berry/',
      icon: FiHelpCircle,
      external: true,
      target: true,
    },
    {
      id: 'raodmap',
      title: 'Roadmap',
      url: '',
      icon: FiCheckSquare,
    },
  ],
};
