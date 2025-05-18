// components/PasswordProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PasswordProtectedRoute = ({ element, storageKey }) => {
  const [hasAccess, setHasAccess] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem(storageKey);
    setHasAccess(!!token);
  }, [storageKey]);

  if (hasAccess === null) return null; // opcional: mostrar un loader

  return hasAccess ? element : <Navigate to="/forgotpassword" replace />;
};

export default PasswordProtectedRoute;
