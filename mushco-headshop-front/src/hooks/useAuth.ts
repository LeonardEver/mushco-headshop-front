import { useContext } from 'react';
import { FirebaseAuthContext } from '../context/FirebaseAuthContext';

export const useAuth = () => {
  const context = useContext(FirebaseAuthContext);

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um FirebaseAuthProvider');
  }

  return context;
};