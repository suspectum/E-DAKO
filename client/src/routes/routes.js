import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// routes
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

// ===========================|| ROUTING RENDER ||=========================== //

export const AppRoutes = () => {
  const { userInfo } = useSelector((state) => state.userSignIn);

  const routes = userInfo ? ProtectedRoutes : PublicRoutes;
  return useRoutes([routes]);
};
