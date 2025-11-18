import React, { createContext, useContext, ReactNode, useCallback } from 'react';
// A CORREÇÃO ESTÁ AQUI (removido o 's' depois de '}')
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService, favoriteService } from '@/services/api';
import { Product, CartItem } from '../types';
import { useAuth } from '@/hooks/useAuth'; // O hook do seu FirebaseAuthContext
import { useToast } from '@/hooks/use-toast';

// 1. O que o nosso contexto vai fornecer
interface StoreContextType {
  // Carrinho
  cart: CartItem[] | undefined;
  isLoadingCart: boolean;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  getCartTotal: () => number;

  // Favoritos
  favorites: Product[] | undefined;
  isLoadingFavorites: boolean;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // 1. PEGAR O USUÁRIO REAL DO FIREBASE
  const { isAuthenticated } = useAuth();

  // 2. BUSCAR DADOS REAIS DO CARRINHO (com React Query)
  const { data: cart, isLoading: isLoadingCart } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.get,
    enabled: isAuthenticated, // Só busca o carrinho se o usuário estiver logado
  });

  // 3. BUSCAR DADOS REAIS DOS FAVORITOS (com React Query)
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: favoriteService.getAll,
    enabled: isAuthenticated, // Só busca favoritos se o usuário estiver logado
  });

  // --- MUTATIONS (Ações que mudam dados) ---

  // Mutation para ADICIONAR AO CARRINHO
  const addMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string, quantity: number }) => 
      cartService.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({ title: "Produto adicionado!" });
    },
    onError: (err: Error) => { // Especificar o tipo do erro
      toast({ title: "Erro ao adicionar produto", description: err.message, variant: 'destructive' });
    }
  });

  // Mutation para REMOVER DO CARRINHO
  const removeMutation = useMutation({
    mutationFn: cartService.removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({ title: "Produto removido" });
    },
  });

  // Mutation para ATUALIZAR QUANTIDADE
  const updateMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string, quantity: number }) => 
      cartService.updateItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Mutation para ADICIONAR FAVORITO
  const addFavoriteMutation = useMutation({
    mutationFn: favoriteService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  // Mutation para REMOVER FAVORITO
  const removeFavoriteMutation = useMutation({
    mutationFn: favoriteService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  // --- FUNÇÕES EXPOSTAS (O que nossos componentes vão chamar) ---

  const addToCart = (productId: string, quantity: number) => {
    addMutation.mutate({ productId, quantity });
  };

  const removeFromCart = (itemId: string) => {
    removeMutation.mutate(itemId);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateMutation.mutate({ itemId, quantity });
    }
  };

  const getCartTotal = () => {
    if (!cart) return 0;
    // Assegurar que cart é um array antes de usar reduce
    const cartArray = Array.isArray(cart) ? cart : cart.items || [];
    return cartArray.reduce((total: number, item: CartItem) => total + (item.product.price * item.quantity), 0);
  };

  const isFavorite = (productId: string) => {
    return !!favorites?.find(fav => fav.id === productId);
  };

  const toggleFavorite = (productId: string) => {
    if (isFavorite(productId)) {
      removeFavoriteMutation.mutate(productId);
    } else {
      addFavoriteMutation.mutate(productId);
    }
  };

  return (
    <StoreContext.Provider value={{
      cart: Array.isArray(cart) ? cart : (cart?.items || []), // Garantir que 'cart' seja um array
      isLoadingCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      getCartTotal,
      favorites,
      isLoadingFavorites,
      isFavorite,
      toggleFavorite,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};