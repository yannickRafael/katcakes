
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDjc4P6ZHypmZ3gAJAvdiyrpC7muP7GM4",
  authDomain: "kat-cakes.firebaseapp.com",
  projectId: "kat-cakes",
  storageBucket: "kat-cakes.appspot.com", // Fixed this line (was using .firebasestorage.app)
  messagingSenderId: "947024220526",
  appId: "1:947024220526:web:4c715b9f1cc88648ee317f",
  measurementId: "G-10YSJX8CHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
try {
  // Analytics might fail in environments that don't support it (like SSR or when cookies are blocked)
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Firebase analytics initialization failed:", error);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { 
  app, 
  analytics, 
  auth, 
  db, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs
};

// Export interface and types
export type { FirebaseUser };

// Define more specific types for user data
export interface UserBirthday {
  name: string;
  date: string;
}

export interface UserData {
  displayName: string;
  phoneNumber: string;
  email?: string;
  gender?: 'masculino' | 'feminino' | 'outro' | 'prefiro_nao_informar';
  birthdays?: UserBirthday[];
  createdAt?: string;
  [key: string]: unknown; // For any additional fields that might be added
}

export interface OrderData {
  userId: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  [key: string]: unknown; // For order-specific data
}

// Helper functions for authentication and data management
export const registerUser = async (phoneNumber: string, userData: UserData) => {
  try {
    // Generate a random user ID since we don't have Firebase Auth ID with phone auth yet
    const userId = `user_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Save user data to Firestore
    await setDoc(doc(db, "users", userId), {
      ...userData,
      phoneNumber,
      createdAt: new Date().toISOString(),
    });
    
    return { userId };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (phoneNumber: string) => {
  try {
    // Query Firestore to find user with this phone number
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error("Usuário não encontrado com este número de telefone");
    }
    
    // Use the first matching user
    const userDoc = querySnapshot.docs[0];
    return { userId: userDoc.id, userData: userDoc.data() as UserData };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const saveOrder = async (userId: string, orderData: Omit<OrderData, 'userId' | 'createdAt' | 'status'>) => {
  try {
    const ordersRef = collection(db, "orders");
    const newOrder = await addDoc(ordersRef, {
      ...orderData,
      userId,
      createdAt: new Date().toISOString(),
      status: "pending"
    });
    
    return { orderId: newOrder.id };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const orders: Array<OrderData & { id: string }> = [];
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...(doc.data() as OrderData)
      });
    });
    
    return orders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
