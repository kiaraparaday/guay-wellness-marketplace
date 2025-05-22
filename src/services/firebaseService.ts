import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp, DocumentData, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { solutionsArray } from "@/data/solutions";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvvHS5-Aor73Fc02SBG1DpBFg_N-OpClA",
  authDomain: "marketplace-guay.firebaseapp.com",
  projectId: "marketplace-guay",
  storageBucket: "marketplace-guay.firebasestorage.app",
  messagingSenderId: "759867477173",
  appId: "1:759867477173:web:45a6d4ff726febdb0342fc",
  measurementId: "G-VLHHJGXX6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

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
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    
    const user = userCredential.user;
    
    // Remove password from the userData object before saving to Firestore
    const { password, ...userDataForFirestore } = userData;
    
    // Add the UID to the user data
    userDataForFirestore.uid = user.uid;
    
    // Save additional user data to Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      ...userDataForFirestore,
      fechaRegistro: Timestamp.fromDate(userData.fechaRegistro || new Date())
    });
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
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
    const userDoc = await doc(db, "usuarios", uid).get();
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
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
    // Check if solutions collection exists and has data
    const solutionsSnapshot = await getDocs(collection(db, "solutions"));
    
    // If no solutions in Firebase, upload them from local data
    if (solutionsSnapshot.empty) {
      console.log("No hay soluciones en Firebase, sincronizando datos locales...");
      
      for (const solution of solutionsArray) {
        await addDoc(collection(db, "solutions"), solution);
      }
      console.log("Soluciones sincronizadas correctamente");
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error al sincronizar soluciones con Firebase:", error);
    return { success: false, error };
  }
};

// Get all solutions from Firestore
export const getAllSolutionsFromFirebase = async () => {
  try {
    await syncSolutionsWithFirebase(); // Ensure solutions are synced
    
    const solutionsSnapshot = await getDocs(collection(db, "solutions"));
    
    const solutions: DocumentData[] = [];
    solutionsSnapshot.forEach((doc) => {
      solutions.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, solutions };
  } catch (error) {
    console.error("Error getting solutions from Firebase:", error);
    return { success: false, error, solutions: [] };
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
