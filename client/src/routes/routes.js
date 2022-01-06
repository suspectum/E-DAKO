import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

// project import
import { useAuth } from 'utils';

// ===========================|| ROUTING RENDER ||=========================== //

export const AppRoutes = () => {
  const userInfo = useAuth();

  const memoizedProtectedRoutes = useMemo(() => {
    return ProtectedRoutes(userInfo);
  }, [userInfo]);

  const routes = userInfo ? memoizedProtectedRoutes : PublicRoutes;

  return useRoutes([routes]);
};
