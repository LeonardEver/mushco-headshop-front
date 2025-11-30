import { createContext, useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { toast } from 'sonner';
import api from '@/services/api'; // Importante: Importar sua API

export interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const FirebaseAuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // --- FUNÇÃO DE SINCRONIZAÇÃO (ADICIONADA) ---
  const syncUserWithBackend = async (firebaseUser: FirebaseUser) => {
    try {
      // Monta os dados para enviar ao Backend
      const userData = {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário',
        avatar: firebaseUser.photoURL || '',
      };

      console.log('🔄 Sincronizando usuário com o Backend...', userData);
      
      // Chama a rota de criação de usuários (ajuste a rota se necessário)
      // O endpoint /api/auth/register do seu backend atual espera {name, email, password}
      // O ideal é ter uma rota /api/auth/sync ou adaptar o middleware para criar automaticamente.
      // Como seu middleware firebaseProtect JÁ tenta criar, vamos apenas forçar uma chamada
      // para garantir que o token seja processado.
      
      await api.get('/auth/me').catch(() => {
        // Se /auth/me não existir, tente uma rota protegida leve para disparar o middleware
        return api.get('/cart'); 
      });

      console.log('✅ Sincronização concluída (ou usuário já existe).');
    } catch (error) {
      console.warn('⚠️ Erro não-bloqueante na sincronização:', error);
    }
  };
  // --------------------------------------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Tenta sincronizar sempre que detectar um usuário logado
        await syncUserWithBackend(currentUser);
      }
      
      setLoading(false);
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
      
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });
        
        // Atualiza estado local
        const updatedUser = { ...auth.currentUser, displayName: name };
        setUser(updatedUser as FirebaseUser);
        
        // Força a sincronização imediata após registro
        await syncUserWithBackend(updatedUser as FirebaseUser);
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