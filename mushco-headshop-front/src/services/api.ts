import axios, { AxiosHeaders } from 'axios';
import { Product, Category, Order } from '@/types';
import { auth } from '@/lib/firebase';

// Base URL da API
const VITE_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
});

// Interceptor de Requisição (Anexa o Token)
api.interceptors.request.use(
  async (config) => { 
    const user = auth.currentUser;
    
    // Garantir que headers existam
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (user) {
      try {
        // Obtém o Token ID (JWT) do Firebase
        // Forçar refresh=false é o padrão, mas garante performance
        const token = await user.getIdToken();
        
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Erro ao obter token de autenticação:", error);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta (Trata Erros Globais)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Log mais claro para depuração
      console.error(`API Error ${error.response.status} em ${error.config.url}:`, error.response.data);

      // Opcional: Se receber 401, pode significar token inválido ou usuário não encontrado no DB
      if (error.response.status === 401) {
        console.warn("Autenticação falhou. Verifique se o Backend está validando o token do Firebase corretamente.");
      }
    } else {
      console.error('API Connection Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Serviços para Products
export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data.data; 
  },
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.data; 
  },
  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data.data; 
  },
  search: async (params: { query?: string; page?: number; limit?: number }) => {
    const response = await api.get('/products/search', { params });
    return response.data.data; 
  },
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data.data; 
  },
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data.data; 
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};

// Serviços para Categories
export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data.data; 
  },
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await api.get(`/categories/${slug}`);
    return response.data.data; 
  },
  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await api.post('/categories', category);
    return response.data.data; 
  },
  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, category);
    return response.data.data; 
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
 
// Serviços para Orders
export const orderService = {
  create: async (orderData: any): Promise<Order> => {
    const response = await api.post('/orders', orderData);
    return response.data.data; 
  },
  getUserOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders'); 
    return response.data.data; 
  },
  getById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data.data; 
  },
  updateStatus: async (id: string, status: string): Promise<Order> => {
    const response = await api.put(`/orders/admin/${id}/status`, { status });
    return response.data.data; 
  },
};

// Serviços para Cart
export const cartService = {
  addItem: async (productId: string, quantity: number): Promise<any> => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data.data;
  },
  get: async (): Promise<any> => { 
    const response = await api.get('/cart');
    return response.data.data; 
  },
  removeItem: async (itemId: string): Promise<void> => {
    await api.delete(`/cart/${itemId}`);
  },
  updateItem: async (itemId: string, quantity: number): Promise<any> => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data.data;
  },
  clear: async () => {
    await api.delete('/cart/clear');
  },    
};

// Serviços para Favoritos
export const favoriteService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/favorites');
    return response.data.data;
  },
  add: async (productId: string): Promise<any> => {
    const response = await api.post('/favorites', { productId });
    return response.data.data;
  },
  remove: async (productId: string): Promise<void> => {
    await api.delete(`/favorites/${productId}`);
  },
};

export default api;