/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { AdminLayout, UserLayout } from '../components';
import adminNavigationConfig from '../routes/adminNavigationConfig';
import SplashScreen from '../../global/splashScreen';

interface PrivateRouteProps {
  element: React.ReactElement;
  roles: string[] | 'SUPER_ADMIN' | 'MANAGER' | 'STAFF' | 'CLIENT' | 'GUEST';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const location = useLocation();
  const { me } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const userType =
    me?.role === Number(process.env.REACT_APP_SUPER_ADMIN)
      ? 'SUPER_ADMIN'
      : me?.role === Number(process.env.REACT_APP_MANAGER)
        ? 'MANAGER'
        : me?.role === Number(process.env.REACT_APP_STAFF)
          ? 'STAFF'
          : me?.role === Number(process.env.REACT_APP_CLIENT)
            ? 'CLIENT'
            : 'GUEST';

  const hasRequiredRole = roles.includes(userType);

  useEffect(() => {
    const checkUserState = async () => {
      setIsLoading(false);
    };

    checkUserState();
  }, [me, roles, isAuthenticated, hasRequiredRole]);

  if (isLoading) {
    return <SplashScreen />;
  }

  // Bypass authentication for admin routes - allow direct access
  const isAdminRoute = adminNavigationConfig.some((route) => {
    if (!route.path) return false;
    const pathRegex = new RegExp(`^${route.path.replace(/:\w+/g, '[^/]+')}$`);
    return pathRegex.test(location.pathname);
  });

  // If it's an admin route, bypass authentication
  if (isAdminRoute) {
    return <AdminLayout>{element}</AdminLayout>;
  }

  // For non-admin routes, keep original authentication logic
  if ((!isAuthenticated || roles !== 'GUEST') && !hasRequiredRole) {
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" />;
    }
    return <Navigate to="*" />;
  }

  // if (!isAuthenticated) {
  //   // Redirect to login page if not authenticated
  //   return <Navigate to="/admin-login" state={{ from: location }} />;
  // }

  // if (!hasRequiredRole) {
  //   // Redirect to unauthorized page if user doesn't have the required role
  //   return <Navigate to="/unauthorized" />;
  // }

  // adminNavigationConfig if path only show admin layout and if uerType is ADMIN but other path show user layout

  // if path is in adminNavigationConfig show admin layout and if userType is ADMIN else show user layout 
  // const adminRoutes = adminNavigationConfig.map((item) => item.path);

  // // Check if current path starts with any admin route
  // const isAdminRoute = adminRoutes.some((route) => location.pathname.startsWith(route));

  // return (['ADMIN', 'MANAGER'].includes(userType) && isAdminRoute) ? (
  //   <AdminLayout>{element}</AdminLayout>
  // ) : (
  //   <UserLayout>{element}</UserLayout>
  // );


  return <UserLayout>{element}</UserLayout>;

};


// return userType === 'ADMIN' ? (
//   <AdminLayout>{element}</AdminLayout>
// ) : (
//   <UserLayout>{element}</UserLayout>
// );
// };

export default PrivateRoute;
