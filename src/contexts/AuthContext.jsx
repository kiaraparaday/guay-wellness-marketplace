
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  currentUser: null,
  userData: null,
  loading: false,
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshUserData = async () => {
    console.log("Auth service - refreshUserData called");
  };

  const value = {
    currentUser,
    userData,
    loading,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
