
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";

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

export { app, db, analytics };
