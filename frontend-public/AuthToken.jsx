import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
    setIsLoading(false);
  }, []);

  const login = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const logout = () => {
    setUserType(null);
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Exporta el hook personalizado
export const useAuth = () => useContext(AuthContext);
