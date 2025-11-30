import { useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth'; 
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
// src/hooks/useAuth.ts
import { useContext } from 'react';
import { FirebaseAuthContext, AuthContextType } from '../context/FirebaseAuthContext';

export const useAuth = () => {
  // CORREÇÃO: Usamos o tipo renomeado 'FirebaseUser'
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A função de callback em onAuthStateChanged deve aceitar o tipo 'FirebaseUser | null'
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user; // Retorna o objeto User do Firebase
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

  return {
    user,
    loading,
    signInWithGoogle,
    logout,
    isAuthenticated: !!user
  };
};