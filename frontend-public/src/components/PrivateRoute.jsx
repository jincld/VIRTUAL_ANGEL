import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthToken.jsx';

const PrivateRoute = ({ allowedRoles }) => {
  const { userType } = useAuth();

  if (!userType) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
