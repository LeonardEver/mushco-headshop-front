
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // Array de imagens adicionais
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock?: number; // Quantidade em estoque
  isBestSeller?: boolean;
  isNew?: boolean;
  discount?: number;
  features: string[];
  specifications?: Record<string, any>; // Especificações técnicas
  tags?: string[]; // Tags para busca
  weight?: number; // Peso do produto
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  parentId?: string; // Para subcategorias
  isActive?: boolean;
  order?: number; // Ordem de exibição
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number; // Preço no momento da compra
  total: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
