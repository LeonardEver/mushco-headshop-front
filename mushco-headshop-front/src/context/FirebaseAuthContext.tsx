import { createContext, useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

// 1. Definir a interface para o valor do contexto
interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<FirebaseUser | null>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// 2. Criar o Contexto (este será importado pelo seu hook 'useAuth.ts')
export const FirebaseAuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Criar o Provedor (este será importado pelo 'main.tsx')
export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Observador do Firebase para o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    // Limpar o observador quando o componente desmontar
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  // O valor que o provedor disponibiliza para os hooks
  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
    isAuthenticated: !!user
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};