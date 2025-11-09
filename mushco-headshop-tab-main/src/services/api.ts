import axios from 'axios';
import { Product, Category, Order } from '@/types';

// Base URL da sua API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar o token do Firebase se necessário
    // const token = await user?.getIdToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Serviços para Products
export const productService = {
  // Buscar todos os produtos
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  // Buscar produto por ID
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Buscar produtos por categoria
  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  // Buscar produtos (com filtros)
  search: async (params: {
    query?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> => {
    const response = await api.get('/products/search', { params });
    return response.data;
  },

  // Criar produto (admin)
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data;
  },

  // Atualizar produto (admin)
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  // Deletar produto (admin)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};

// Serviços para Categories
export const categoryService = {
  // Buscar todas as categorias
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Buscar categoria por slug
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },

  // Criar categoria (admin)
  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await api.post('/categories', category);
    return response.data;
  },

  // Atualizar categoria (admin)
  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, category);
    return response.data;
  },

  // Deletar categoria (admin)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};

// Serviços para Orders
export const orderService = {
  // Criar pedido
  create: async (orderData: {
    items: Array<{ productId: string; quantity: number; price: number }>;
    shippingAddress: any;
    paymentMethod: string;
  }): Promise<Order> => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Buscar pedidos do usuário
  getUserOrders: async (userId: string): Promise<Order[]> => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },

  // Buscar pedido por ID
  getById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Atualizar status do pedido (admin)
  updateStatus: async (id: string, status: string): Promise<Order> => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

// Serviços para Cart (se quiser sincronizar com backend)
export const cartService = {
  // Sincronizar carrinho
  sync: async (userId: string, items: any[]): Promise<void> => {
    await api.post(`/cart/${userId}/sync`, { items });
  },

  // Buscar carrinho do usuário
  get: async (userId: string): Promise<any[]> => {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  },
};

export default api;