
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  auth, 
  onAuthStateChanged, 
  FirebaseUser, 
  getUserData,
  loginUser,
  registerUser,
  logoutUser
} from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  currentUser: FirebaseUser | null;
  userData: any | null;
  login: (email: string, password: string) => Promise<{user: FirebaseUser}>;
  signup: (email: string, password: string, userData: any) => Promise<{user: FirebaseUser}>;
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
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const data = await getUserData(user.uid);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
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

  const signup = async (email: string, password: string, userData: any) => {
    try {
      const result = await registerUser(email, password, userData);
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
