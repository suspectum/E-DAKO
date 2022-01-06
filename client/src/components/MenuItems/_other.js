// icons
import { FiChrome } from '@react-icons/all-files/fi/FiChrome';
import { FiHelpCircle } from '@react-icons/all-files/fi/FiHelpCircle';

// project imports
import { lazyImport } from 'utils';

const { SamplePage } = lazyImport(() => import('views/sample-page'), 'SamplePage');

//================================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||================================//

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
      id: 'external-page',
      title: 'External Page',
      url: 'https://www.google.com',
      icon: FiHelpCircle,
      external: true,
      target: true,
    },
  ],
};
