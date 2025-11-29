import { createContext, useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, // Adicionado
  signInWithEmailAndPassword,     // Adicionado
  updateProfile,                  // Adicionado para salvar o nome
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { toast } from 'sonner';

// Definir a interface corretamente
interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>; // Retorna void, tratamos erro dentro ou fora
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const FirebaseAuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Opcional: Aqui você poderia chamar uma rota do backend 
      // para garantir que o usuário existe no PostgreSQL
      // ex: if (currentUser) api.post('/auth/sync', { ... })
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login com Google realizado com sucesso!");
    } catch (error: any) {
      console.error('Erro Google:', error);
      toast.error("Erro ao logar com Google.");
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      console.error('Erro Login:', error);
      let msg = "Erro ao fazer login.";
      if (error.code === 'auth/invalid-credential') msg = "E-mail ou senha incorretos.";
      toast.error(msg);
      throw error;
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualizar o nome do usuário no perfil do Firebase
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });
        // Forçar atualização do estado local
        setUser({ ...auth.currentUser, displayName: name });
      }
      
      toast.success("Conta criada com sucesso!");
    } catch (error: any) {
      console.error('Erro Cadastro:', error);
      let msg = "Erro ao criar conta.";
      if (error.code === 'auth/email-already-in-use') msg = "Este e-mail já está em uso.";
      if (error.code === 'auth/weak-password') msg = "A senha é muito fraca.";
      toast.error(msg);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.info("Você saiu da conta.");
    } catch (error) {
      console.error('Erro Logout:', error);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    isAuthenticated: !!user
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {!loading && children}
    </FirebaseAuthContext.Provider>
  );
};