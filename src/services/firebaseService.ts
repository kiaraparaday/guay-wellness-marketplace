
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp, DocumentData } from "firebase/firestore";
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

export { app, db, analytics };
