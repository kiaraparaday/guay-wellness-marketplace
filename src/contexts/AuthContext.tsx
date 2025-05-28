
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, getUserData, UserData } from "../services/firebaseService";
import { onAuthStateChanged } from "firebase/auth";

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
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    if (currentUser) {
      try {
        console.log("Refreshing user data for UID:", currentUser.uid);
        const userDoc = await getUserData(currentUser.uid);
        if (userDoc) {
          console.log("User data refreshed:", userDoc.nombre);
          setUserData(userDoc);
        } else {
          console.log("No user data found in Firestore");
          setUserData(null);
        }
      } catch (error) {
        console.error("Error refreshing user data:", error);
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    console.log("Setting up Firebase auth state listener...");
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Firebase auth state changed:", user ? `User logged in: ${user.email}` : "User logged out");
      setCurrentUser(user);
      
      if (user) {
        try {
          console.log("Fetching user data for UID:", user.uid);
          const userDoc = await getUserData(user.uid);
          if (userDoc) {
            console.log("User data loaded:", userDoc.nombre);
            setUserData(userDoc);
          } else {
            console.log("No user data found in Firestore for this user");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
