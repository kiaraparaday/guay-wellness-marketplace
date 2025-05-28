import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp, DocumentData, setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { solutionsArray } from "@/data/solutions";

// Firebase configuration - Updated with new credentials
const firebaseConfig = {
  apiKey: "AIzaSyBD_QWJyzvNG79QbdUPPZDEEnN_D8pcSmM",
  authDomain: "marketplace-guay-9e47e.firebaseapp.com",
  projectId: "marketplace-guay-9e47e",
  storageBucket: "marketplace-guay-9e47e.firebasestorage.app",
  messagingSenderId: "537300533649",
  appId: "1:537300533649:web:ba231c8e6909331b2b9a30",
  measurementId: "G-Y0XK4B6ZH5"
};

// Initialize Firebase - Check if app already exists
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Google Auth Provider with proper configuration
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Add required scopes for Google Sign-In
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Interfaces
export interface AppointmentData {
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface UserData {
  nombre: string;
  email: string;
  password?: string; // Only used during registration, not stored in Firestore
  empresa?: string;
  rol: string;
  fechaRegistro: Date;
  uid?: string; // Added by the registerUser function
}

// Authentication functions
export const registerUser = async (userData: UserData): Promise<void> => {
  if (!userData.password) {
    throw new Error("Password is required for registration");
  }
  
  try {
    console.log("Registering user with email:", userData.email);
    
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    
    const user = userCredential.user;
    console.log("User created successfully with UID:", user.uid);
    
    // Remove password from the userData object before saving to Firestore
    const { password, ...userDataForFirestore } = userData;
    
    // Add the UID to the user data
    userDataForFirestore.uid = user.uid;
    
    // Save additional user data to Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      ...userDataForFirestore,
      fechaRegistro: Timestamp.fromDate(userData.fechaRegistro || new Date())
    });
    
    console.log("User data saved to Firestore successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    console.log("Attempting to login with email:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful for user:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Enhanced Google Sign-In function with better error handling
export const signInWithGoogle = async (): Promise<User> => {
  try {
    console.log("Attempting Google Sign-In...");
    console.log("Auth domain:", auth.app.options.authDomain);
    console.log("Current domain:", window.location.hostname);
    
    // Clear any existing auth state
    console.log("Google provider configured with scopes:", googleProvider.getScopes());
    
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In popup successful");
    
    const user = result.user;
    console.log("Google user authenticated:", user.uid, user.email);
    
    // Get additional user info from Google
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("Google credential obtained:", !!credential);
    
    // Check if user exists in Firestore, if not create a basic profile
    console.log("Checking if user exists in Firestore...");
    const userDoc = await getUserData(user.uid);
    
    if (!userDoc) {
      console.log("User not found in Firestore, creating new profile...");
      const userData: Omit<UserData, 'password'> = {
        nombre: user.displayName || user.email?.split('@')[0] || 'Usuario',
        email: user.email!,
        rol: 'colaborador', // Default role
        fechaRegistro: new Date(),
        uid: user.uid
      };
      
      await setDoc(doc(db, "usuarios", user.uid), {
        ...userData,
        fechaRegistro: Timestamp.fromDate(userData.fechaRegistro)
      });
      
      console.log("New user profile created in Firestore");
    } else {
      console.log("Existing user found in Firestore:", userDoc.nombre);
    }
    
    return user;
  } catch (error: any) {
    console.error("Detailed Google Sign-In error:", {
      code: error?.code,
      message: error?.message,
      email: error?.customData?.email,
      credential: error?.credential
    });
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Function to get current authentication state
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Function to get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, "usuarios", uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Save appointment to Firestore
export const saveAppointment = async (appointmentData: Omit<AppointmentData, 'createdAt' | 'status'>) => {
  try {
    const appointmentRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      status: 'pending',
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: appointmentRef.id };
  } catch (error) {
    console.error("Error saving appointment: ", error);
    return { success: false, error };
  }
};

// Get appointments by email
export const getAppointmentsByEmail = async (email: string) => {
  try {
    const q = query(collection(db, "appointments"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    const appointments: AppointmentData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      appointments.push({
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate()
      } as AppointmentData);
    });
    
    return { success: true, appointments };
  } catch (error) {
    console.error("Error getting appointments: ", error);
    return { success: false, error };
  }
};

// Get all appointments from Firestore
export const getAllAppointments = async () => {
  try {
    const appointmentsSnapshot = await getDocs(collection(db, "appointments"));
    
    const appointments: AppointmentData[] = [];
    appointmentsSnapshot.forEach((doc) => {
      const data = doc.data();
      appointments.push({
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate()
      } as AppointmentData);
    });
    
    return { success: true, appointments };
  } catch (error) {
    console.error("Error getting all appointments: ", error);
    return { success: false, error, appointments: [] };
  }
};

// Sync solutions with Firestore
export const syncSolutionsWithFirebase = async () => {
  try {
    console.log("Checking solutions in Firebase...");
    const solutionsSnapshot = await getDocs(collection(db, "solutions"));
    
    // If no solutions in Firebase, upload them from local data
    if (solutionsSnapshot.empty) {
      console.log("No solutions found in Firebase, uploading local data...");
      
      for (const solution of solutionsArray) {
        console.log("Uploading solution:", solution.title);
        await addDoc(collection(db, "solutions"), solution);
      }
      console.log("Solutions synced successfully to Firebase");
    } else {
      console.log("Solutions already exist in Firebase, count:", solutionsSnapshot.size);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error syncing solutions with Firebase:", error);
    return { success: false, error };
  }
};

// Get all solutions from Firestore with better error handling
export const getAllSolutionsFromFirebase = async () => {
  try {
    console.log("Attempting to fetch solutions from Firebase...");
    console.log("Firebase config project ID:", firebaseConfig.projectId);
    
    // Test connection first
    const testQuery = query(collection(db, "solutions"));
    console.log("Firestore query created successfully");
    
    const solutionsSnapshot = await getDocs(testQuery);
    console.log("Query executed, snapshot size:", solutionsSnapshot.size);
    
    const solutions: DocumentData[] = [];
    solutionsSnapshot.forEach((doc) => {
      const solutionData = { id: doc.id, ...doc.data() };
      console.log("Solution loaded from Firebase:", doc.id);
      solutions.push(solutionData);
    });
    
    console.log("Total solutions fetched from Firebase:", solutions.length);
    
    // If no solutions found, try to sync from local data
    if (solutions.length === 0) {
      console.log("No solutions found, attempting to sync local data...");
      const syncResult = await syncSolutionsWithFirebase();
      if (syncResult.success) {
        // Retry fetching after sync
        const retrySnapshot = await getDocs(testQuery);
        retrySnapshot.forEach((doc) => {
          const solutionData = { id: doc.id, ...doc.data() };
          solutions.push(solutionData);
        });
        console.log("After sync, total solutions:", solutions.length);
      }
    }
    
    return { success: true, solutions };
  } catch (error: any) {
    console.error("Detailed Firebase error:", {
      code: error?.code,
      message: error?.message,
      stack: error?.stack
    });
    
    // Provide more specific error messages
    let userFriendlyMessage = "Error desconocido al conectar con Firebase";
    
    if (error?.code === 'permission-denied') {
      userFriendlyMessage = "Permisos insuficientes para acceder a Firebase. Verifica las reglas de Firestore.";
    } else if (error?.code === 'unavailable') {
      userFriendlyMessage = "Firebase no está disponible. Verifica tu conexión a internet.";
    } else if (error?.code === 'unauthenticated') {
      userFriendlyMessage = "Usuario no autenticado. Es necesario iniciar sesión.";
    }
    
    return { 
      success: false, 
      error: userFriendlyMessage,
      solutions: solutionsArray // Fallback to local data
    };
  }
};

// Get a specific solution from Firestore by ID
export const getSolutionFromFirebase = async (solutionId: string) => {
  try {
    const solutionRef = doc(db, "solutions", solutionId);
    const solutionSnap = await getDoc(solutionRef);
    
    if (solutionSnap.exists()) {
      return { success: true, solution: { id: solutionSnap.id, ...solutionSnap.data() } };
    } else {
      return { success: false, error: "Solution not found", solution: null };
    }
  } catch (error) {
    console.error("Error getting solution from Firebase:", error);
    return { success: false, error, solution: null };
  }
};

// Sync all marketplace data with Firebase
export const syncAllMarketplaceData = async () => {
  try {
    // Sync solutions
    await syncSolutionsWithFirebase();
    
    // Here you can add more sync functions as needed
    // For example: syncTestimonialsWithFirebase(), syncDimensionsWithFirebase(), etc.
    
    return { success: true, message: "Todos los datos del marketplace han sido sincronizados con Firebase" };
  } catch (error) {
    console.error("Error al sincronizar datos del marketplace con Firebase:", error);
    return { success: false, error };
  }
};

export { app, db, analytics, auth };
