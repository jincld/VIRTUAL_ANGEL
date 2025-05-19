import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../frontend-public/AuthToken';
import React, { createContext, useContext, useEffect, useState } from 'react';


const ProtectedRoute = ({ element, allowedRoles }) => {
  const { userType, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // o un spinner bonito
  }

  if (!userType) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
