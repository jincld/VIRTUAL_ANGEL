import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/me', {
          withCredentials: true
        });
        setUserType(response.data.userType);
        localStorage.setItem('userType', response.data.userType);
      } catch (error) {
        console.warn("Not authenticated or token expired.");
        setUserType(null);
        localStorage.removeItem('userType');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const logout = () => {
    setUserType(null);
    localStorage.removeItem('userType');
    // Opcional: También puedes llamar a tu backend para eliminar la cookie
    axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true });
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
