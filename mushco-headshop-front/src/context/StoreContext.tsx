import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService, favoriteService } from '@/services/api';
import { Product, CartItem } from '../types';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface StoreContextType {
  // Carrinho
  cart: CartItem[] | undefined;
  isLoadingCart: boolean;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void; // <--- Adicionado para o Checkout
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
  
  const { isAuthenticated } = useAuth();

  // --- QUERIES (Busca de dados) ---
  const { data: cartData, isLoading: isLoadingCart } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.get,
    enabled: isAuthenticated,
  });

  // Garante que o cart seja sempre um array, mesmo que a API retorne algo diferente
  const cart = Array.isArray(cartData) ? cartData : (cartData?.items || []);

  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: favoriteService.getAll,
    enabled: isAuthenticated,
  });

  // --- MUTATIONS (Alteração de dados) ---
  const addMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string, quantity: number }) => 
      cartService.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success("Produto adicionado!");
    },
    onError: () => toast.error("Erro ao adicionar produto.")
  });

  const removeMutation = useMutation({
    mutationFn: cartService.removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.info("Produto removido.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string, quantity: number }) => 
      cartService.updateItem(itemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  // Adicione a função clear no seu cartService (src/services/api.ts) se não existir
  const clearCartMutation = useMutation({
    mutationFn: async () => {
        // Se sua API tiver rota de limpar: await cartService.clear();
        // Caso contrário, deletamos um por um ou limpamos localmente
        // Vamos assumir que existe:
        try {
            await cartService.clear(); 
        } catch (e) {
            console.error("Erro ao limpar carrinho via API", e);
        }
    }, 
    onSuccess: () => {
      queryClient.setQueryData(['cart'], []); // Limpa localmente imediatamente
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const addFavoriteMutation = useMutation({
    mutationFn: favoriteService.add,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: favoriteService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  // --- FUNÇÕES ---
  const addToCart = (productId: string, quantity: number) => {
    if (!isAuthenticated) {
        toast.error("Faça login para adicionar ao carrinho");
        return;
    }
    addMutation.mutate({ productId, quantity });
  };

  const removeFromCart = (itemId: string) => removeMutation.mutate(itemId);

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) removeFromCart(itemId);
    else updateMutation.mutate({ itemId, quantity });
  };

  const clearCart = () => clearCartMutation.mutate();

  const getCartTotal = () => {
    if (!cart) return 0;
    return cart.reduce((total: number, item: CartItem) => total + (item.product.price * item.quantity), 0);
  };

  const isFavorite = (productId: string) => {
    return !!favorites?.find((fav: Product) => fav.id === productId);
  };

  const toggleFavorite = (productId: string) => {
    if (!isAuthenticated) return toast.error("Faça login para favoritar");
    if (isFavorite(productId)) removeFavoriteMutation.mutate(productId);
    else addFavoriteMutation.mutate(productId);
  };

  return (
    <StoreContext.Provider value={{
      cart,
      isLoadingCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
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
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};