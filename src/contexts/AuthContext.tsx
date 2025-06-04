
import React, { createContext, useContext, useEffect, useState } from "react";

// Mock User interface since Firebase is disabled
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// Mock UserData interface
interface UserData {
  nombre: string;
  email: string;
  empresa?: string;
  rol: string;
  fechaRegistro: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userData: null,
  loading: true,
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
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
