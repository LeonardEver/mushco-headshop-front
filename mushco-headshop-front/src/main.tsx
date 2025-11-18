import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext.tsx'
import { FirebaseAuthProvider } from './context/FirebaseAuthContext.tsx'

// 1. Importar o React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. Criar o Query Client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FirebaseAuthProvider>
          <StoreProvider>
            <App />
            <Toaster />
          </StoreProvider>
        </FirebaseAuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)