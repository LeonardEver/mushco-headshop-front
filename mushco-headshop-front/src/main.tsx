import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { FirebaseAuthProvider } from './context/FirebaseAuthContext';
import { StoreProvider } from './context/StoreContext';

// Cria o cliente do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <FirebaseAuthProvider>
        <StoreProvider>
          <App />
          {/* Componentes de Notificação */}
          <Toaster />
          <Sonner />
        </StoreProvider>
      </FirebaseAuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);