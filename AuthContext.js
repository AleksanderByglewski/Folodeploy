// import React , { useState, useContext, createContext } from 'react';

// export const AuthContext = createContext();


import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [routeDirection, setRouteDirection] = useState('');

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
        routeDirection,
        setRouteDirection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};