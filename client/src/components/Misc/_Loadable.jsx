import { Suspense } from 'react';

// project imports
import { Loader } from 'components';

//================================|| LOADABLE - LAZY LOADING ||================================//

export const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};
