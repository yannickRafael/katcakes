
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  auth, 
  onAuthStateChanged, 
  FirebaseUser, 
  getUserData,
  loginUser,
  registerUser,
  logoutUser,
  UserData,
  initRecaptcha,
  sendVerificationCode,
  RecaptchaVerifier,
  getErrorMessage
} from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  currentUser: FirebaseUser | null;
  userData: UserData | null;
  userId: string | null;
  login: (phoneNumber: string) => Promise<{userId: string, userData: UserData}>;
  signup: (phoneNumber: string, userData: UserData) => Promise<{userId: string}>;
  logout: () => Promise<boolean>;
  loading: boolean;
  sendPhoneVerification: (phoneNumber: string, buttonId: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user ID is stored in localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      // Fetch user data from Firestore
      getUserData(storedUserId)
        .then(data => {
          if (data) {
            setUserData(data);
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          toast({
            variant: "destructive",
            title: "Erro ao carregar perfil",
            description: error.message || "Não foi possível carregar seus dados. Tente fazer login novamente.",
          });
          // If we can't get user data, clear localStorage and state
          localStorage.removeItem('userId');
          setUserId(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [toast]);

  const sendPhoneVerification = async (phoneNumber: string, buttonId: string) => {
    try {
      // Initialize reCAPTCHA
      const recaptchaVerifier = initRecaptcha(buttonId);
      
      // Send verification code
      const confirmationResult = await sendVerificationCode(phoneNumber, recaptchaVerifier);
      
      toast({
        title: "Código enviado",
        description: "Um código de verificação foi enviado para o seu número de telefone.",
      });
      
      return confirmationResult;
    } catch (error: any) {
      console.error("Phone verification error:", error);
      
      // Check if it's a Firebase error with a code
      if (error.code && typeof error.code === 'string') {
        const errorMessage = getErrorMessage(error.code);
        toast({
          variant: "destructive",
          title: "Erro ao enviar código",
          description: errorMessage,
        });
        throw new Error(errorMessage);
      }
      
      // Network timeout errors
      if (error.message && error.message.includes('Timeout')) {
        toast({
          variant: "destructive",
          title: "Tempo limite excedido",
          description: "A operação demorou muito tempo. Verifique sua conexão de internet e tente novamente.",
        });
        throw new Error("Tempo limite excedido. Verifique sua conexão e tente novamente.");
      }
      
      // Default fallback for other errors
      toast({
        variant: "destructive",
        title: "Erro ao enviar código",
        description: error.message || "Não foi possível enviar o código de verificação.",
      });
      throw error;
    }
  };

  const login = async (phoneNumber: string) => {
    try {
      const result = await loginUser(phoneNumber);
      
      // Store user ID in localStorage
      localStorage.setItem('userId', result.userId);
      setUserId(result.userId);
      setUserData(result.userData);
      
      toast({
        title: "Login bem-sucedido",
        description: "Você foi autenticado com sucesso.",
      });
      return result;
    } catch (error: any) {
      // Clear any potentially corrupted session data
      localStorage.removeItem('userId');
      setUserId(null);
      setUserData(null);
      
      console.error("Login error:", error);
      
      // Check if it's a Firebase error with a code
      if (error.code && typeof error.code === 'string') {
        const errorMessage = getErrorMessage(error.code);
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: errorMessage,
        });
        throw new Error(errorMessage);
      }
      
      // Network timeout errors
      if (error.message && error.message.includes('Timeout')) {
        toast({
          variant: "destructive",
          title: "Tempo limite excedido",
          description: "A operação demorou muito tempo. Verifique sua conexão de internet e tente novamente.",
        });
        throw new Error("Tempo limite excedido. Verifique sua conexão e tente novamente.");
      }
      
      // Default fallback for other errors
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message || "Não foi possível autenticar. Tente novamente.",
      });
      throw error;
    }
  };

  const signup = async (phoneNumber: string, userData: UserData) => {
    try {
      const result = await registerUser(phoneNumber, userData);
      
      // Store user ID in localStorage
      localStorage.setItem('userId', result.userId);
      setUserId(result.userId);
      setUserData(userData);
      
      toast({
        title: "Conta criada com sucesso",
        description: "Sua conta foi criada e você está logado.",
      });
      return result;
    } catch (error: any) {
      // Clear any potentially corrupted session data
      localStorage.removeItem('userId');
      setUserId(null);
      setUserData(null);
      
      console.error("Signup error:", error);
      
      // Check if it's a Firebase error with a code
      if (error.code && typeof error.code === 'string') {
        const errorMessage = getErrorMessage(error.code);
        toast({
          variant: "destructive",
          title: "Erro ao criar conta",
          description: errorMessage,
        });
        throw new Error(errorMessage);
      }
      
      // Network timeout errors
      if (error.message && error.message.includes('Timeout')) {
        toast({
          variant: "destructive",
          title: "Tempo limite excedido",
          description: "A operação demorou muito tempo. Verifique sua conexão de internet e tente novamente.",
        });
        throw new Error("Tempo limite excedido. Verifique sua conexão e tente novamente.");
      }
      
      // Default fallback for other errors
      toast({
        variant: "destructive",
          title: "Erro ao criar conta",
          description: error.message || "Não foi possível criar a conta. Tente novamente.",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      
      // Clear local storage
      localStorage.removeItem('userId');
      setUserId(null);
      setUserData(null);
      
      toast({
        title: "Logout bem-sucedido",
        description: "Você saiu da sua conta.",
      });
      return true;
    } catch (error: any) {
      console.error("Logout error:", error);
      
      // Check if it's a Firebase error with a code
      if (error.code && typeof error.code === 'string') {
        const errorMessage = getErrorMessage(error.code);
        toast({
          variant: "destructive",
          title: "Erro ao sair",
          description: errorMessage,
        });
        throw new Error(errorMessage);
      }
      
      // Even if logout fails, we should clear client-side session data
      localStorage.removeItem('userId');
      setUserId(null);
      setUserData(null);
      
      // Network timeout errors
      if (error.message && error.message.includes('Timeout')) {
        toast({
          variant: "destructive",
          title: "Aviso",
          description: "Logout realizado localmente, mas houve um problema de comunicação com o servidor.",
        });
        return true; // Return true since we've logged out locally
      }
      
      // Default fallback for other errors
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message || "Problemas ao sair da conta, mas sessão foi encerrada localmente.",
      });
      return true; // Return true since we've logged out locally despite the error
    }
  };

  const value = {
    currentUser,
    userData,
    userId,
    login,
    signup,
    logout,
    loading,
    sendPhoneVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
