
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  auth, 
  onAuthStateChanged, 
  FirebaseUser, 
  getUserData,
  loginUser,
  registerUser,
  logoutUser,
  UserData
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
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

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
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message,
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
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message,
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
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    userData,
    userId,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
