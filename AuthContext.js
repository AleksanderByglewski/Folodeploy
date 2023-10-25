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
  const [driverId, setDriverId] = useState(null);  // Add this line
  const [userId, setUserId] = useState(null);      // Add this line

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
        routeDirection,
        setRouteDirection,
        driverId,      // Add this line
        setDriverId,   // Add this line
        userId,        // Add this line
        setUserId,      // Add this line
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};