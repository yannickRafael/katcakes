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
  storageBucket: "kat-cakes.appspot.com",
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

// Initialize RecaptchaVerifier
let recaptchaVerifier: RecaptchaVerifier | null = null;

// Helper functions for authentication and data management
export const initRecaptcha = (buttonId: string) => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
  }
  
  try {
    recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
      'size': 'invisible',
      'callback': () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('reCAPTCHA verified');
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.log('reCAPTCHA expired');
        recaptchaVerifier = null;
        throw new Error("Verificação de segurança expirou. Por favor, tente novamente.");
      }
    });
    
    return recaptchaVerifier;
  } catch (error: any) {
    console.error("reCAPTCHA initialization error:", error);
    throw new Error("Não foi possível inicializar a verificação de segurança. Por favor, recarregue a página e tente novamente.");
  }
};

// Map Firebase error codes to user-friendly messages in Portuguese
export const getErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    // Phone authentication errors
    'auth/invalid-phone-number': 'O número de telefone fornecido não é válido.',
    'auth/missing-phone-number': 'É necessário fornecer um número de telefone.',
    'auth/quota-exceeded': 'A cota de SMS foi excedida. Tente novamente mais tarde.',
    'auth/user-disabled': 'Esta conta de usuário foi desativada.',
    'auth/operation-not-allowed': 'Operação não permitida. Verifique a configuração do Firebase.',
    
    // SMS verification errors
    'auth/code-expired': 'O código de verificação expirou. Solicite um novo código.',
    'auth/invalid-verification-code': 'O código de verificação inserido não é válido.',
    'auth/missing-verification-code': 'É necessário fornecer o código de verificação.',
    'auth/invalid-verification-id': 'O ID de verificação é inválido.',
    'auth/missing-verification-id': 'É necessário fornecer o ID de verificação.',
    
    // Provider errors
    'auth/provider-already-linked': 'Esta conta já está vinculada a outro provedor.',
    'auth/credential-already-in-use': 'Esta credencial já está associada a uma conta de usuário diferente.',
    
    // Timeout and network errors
    'auth/timeout': 'A operação expirou. Verifique sua conexão de internet e tente novamente.',
    'auth/network-request-failed': 'Falha na conexão de rede. Verifique sua internet e tente novamente.',
    
    // Captcha errors
    'auth/captcha-check-failed': 'Falha na verificação de segurança. Tente novamente.',
    'auth/recaptcha-not-enabled': 'reCAPTCHA não está ativado para este projeto.',
    
    // General errors
    'auth/internal-error': 'Ocorreu um erro interno. Tente novamente mais tarde.',
    'auth/too-many-requests': 'Muitas tentativas em um curto período. Tente novamente mais tarde.',
    
    // Default fallback
    'default': 'Ocorreu um erro durante a autenticação. Por favor, tente novamente.'
  };
  
  return errorMessages[errorCode] || errorMessages['default'];
};

export const registerUser = async (phoneNumber: string, userData: UserData) => {
  try {
    // Ensure phoneNumber is in E.164 format
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    // Check if a user with this phone number already exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phoneNumber", "==", formattedPhone));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error("Um usuário com este número de telefone já existe");
    }
    
    // Generate a random user ID since we don't have Firebase Auth ID with phone auth yet
    const userId = `user_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Save user data to Firestore with timeout handling
    const savePromise = setDoc(doc(db, "users", userId), {
      ...userData,
      phoneNumber: formattedPhone,
      createdAt: new Date().toISOString(),
    });
    
    // Set a timeout for the Firestore operation
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout: A operação demorou muito tempo. Verifique sua conexão.")), 15000)
    );
    
    await Promise.race([savePromise, timeoutPromise]);
    
    return { userId };
  } catch (error: any) {
    console.error("Registration error:", error);
    
    // Handle Firebase auth error codes
    if (error.code && typeof error.code === 'string') {
      throw new Error(getErrorMessage(error.code));
    }
    
    // Handle network errors
    if (error.message && error.message.includes('Timeout')) {
      throw new Error("Tempo limite excedido. Por favor, verifique sua conexão e tente novamente.");
    }
    
    throw new Error(error.message || "Erro ao criar conta. Por favor, tente novamente.");
  }
};

export const loginUser = async (phoneNumber: string) => {
  try {
    // Ensure phoneNumber is in the right format for querying
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    // Query Firestore to find user with this phone number
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phoneNumber", "==", formattedPhone));
    
    // Set a timeout for the Firestore query
    const queryPromise = getDocs(q);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout: A operação demorou muito tempo. Verifique sua conexão.")), 15000)
    );
    
    const querySnapshot = await Promise.race([queryPromise, timeoutPromise]) as any;
    
    if (querySnapshot.empty) {
      throw new Error("Usuário não encontrado com este número de telefone");
    }
    
    // Use the first matching user
    const userDoc = querySnapshot.docs[0];
    return { userId: userDoc.id, userData: userDoc.data() as UserData };
  } catch (error: any) {
    console.error("Login error:", error);
    
    // Handle Firebase auth error codes
    if (error.code && typeof error.code === 'string') {
      throw new Error(getErrorMessage(error.code));
    }
    
    // Handle network errors
    if (error.message && error.message.includes('Timeout')) {
      throw new Error("Tempo limite excedido. Por favor, verifique sua conexão e tente novamente.");
    }
    
    throw new Error(error.message || "Falha na autenticação. Por favor, tente novamente.");
  }
};

export const sendVerificationCode = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
  try {
    // Ensure phoneNumber is in E.164 format
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    // Set a timeout for the verification code send operation
    const sendCodePromise = signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout: O envio do código demorou muito tempo. Verifique sua conexão.")), 25000)
    );
    
    // Send verification code
    const confirmationResult = await Promise.race([sendCodePromise, timeoutPromise]) as any;
    return confirmationResult;
  } catch (error: any) {
    console.error("Error sending verification code:", error);
    
    // Handle Firebase auth error codes
    if (error.code && typeof error.code === 'string') {
      throw new Error(getErrorMessage(error.code));
    }
    
    // Handle network errors
    if (error.message && error.message.includes('Timeout')) {
      throw new Error("Tempo limite excedido ao enviar o código. Verifique sua conexão e tente novamente.");
    }
    
    // Handle other errors
    if (error.message && error.message.toLowerCase().includes('recaptcha')) {
      throw new Error("Erro na verificação de segurança. Por favor, recarregue a página e tente novamente.");
    }
    
    throw new Error(error.message || "Falha ao enviar código de verificação. Por favor, tente novamente.");
  }
};

// Helper to format phone number to E.164 standard
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Strip any non-numeric characters
  let cleaned = phoneNumber.replace(/\D/g, '');
  
  // Handle Mozambican phone numbers (add country code if missing)
  if (cleaned.length === 9 && cleaned.startsWith('8')) {
    return `+258${cleaned}`;
  }
  
  // If it already has the country code
  if (cleaned.startsWith('258')) {
    return `+${cleaned}`;
  }
  
  // If it has plus but no country code
  if (cleaned.length === 9 && !cleaned.startsWith('258')) {
    return `+258${cleaned}`;
  }
  
  // Default case, just add + if necessary
  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
};

export const logoutUser = async () => {
  try {
    const logoutPromise = signOut(auth);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout: O logout demorou muito tempo. Verifique sua conexão.")), 10000)
    );
    
    await Promise.race([logoutPromise, timeoutPromise]);
    return true;
  } catch (error: any) {
    console.error("Logout error:", error);
    
    // Handle Firebase auth error codes
    if (error.code && typeof error.code === 'string') {
      throw new Error(getErrorMessage(error.code));
    }
    
    // Handle network errors
    if (error.message && error.message.includes('Timeout')) {
      throw new Error("Tempo limite excedido. O logout pode não ter sido concluído corretamente.");
    }
    
    throw new Error(error.message || "Erro ao fazer logout. Por favor, tente novamente.");
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const docRef = doc(db, "users", userId);
    
    const getDocPromise = getDoc(docRef);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout: A obtenção dos dados do usuário demorou muito tempo.")), 10000)
    );
    
    const docSnap = await Promise.race([getDocPromise, timeoutPromise]) as any;
    
    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Get user data error:", error);
    
    // Handle network errors
    if (error.message && error.message.includes('Timeout')) {
      throw new Error("Tempo limite excedido ao obter os dados do usuário. Verifique sua conexão.");
    }
    
    throw new Error(error.message || "Erro ao obter dados do usuário. Por favor, tente novamente.");
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
