
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  currentUser: null,
  userData: null,
  loading: true,
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); // Set to false since Firebase is disabled

  const refreshUserData = async () => {
    console.log("Firebase service is disabled - refreshUserData is a no-op");
    // Since Firebase is disabled, this is a no-op
  };

  useEffect(() => {
    console.log("Firebase service is disabled - no auth state listener");
    // Since Firebase is disabled, we don't set up any auth listener
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
