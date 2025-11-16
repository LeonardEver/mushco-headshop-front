import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/api';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Hook para buscar todos os produtos
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para buscar produto por ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

// Hook para buscar produtos por categoria
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productService.getByCategory(category),
    enabled: !!category,
  });
};

// Hook para busca com filtros
export const useProductSearch = () => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    category: '',
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    page: 1,
    limit: 12,
  });

  const query = useQuery({
    queryKey: ['products', 'search', searchParams],
    queryFn: () => productService.search(searchParams),
    enabled: !!(searchParams.query || searchParams.category),
  });

  return {
    ...query,
    searchParams,
    setSearchParams,
    search: (newParams: Partial<typeof searchParams>) => {
      setSearchParams(prev => ({ ...prev, ...newParams, page: 1 }));
    },
    nextPage: () => {
      setSearchParams(prev => ({ ...prev, page: prev.page + 1 }));
    },
    prevPage: () => {
      setSearchParams(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }));
    },
  };
};

// Hook para criação de produto (admin)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Sucesso',
        description: 'Produto criado com sucesso!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Falha ao criar produto',
        variant: 'destructive',
      });
    },
  });
};

// Hook para atualização de produto (admin)
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
      toast({
        title: 'Sucesso',
        description: 'Produto atualizado com sucesso!',
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar produto',
        variant: 'destructive',
      });
    },
  });
};

// Hook para exclusão de produto (admin)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Sucesso',
        description: 'Produto excluído com sucesso!',
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao excluir produto',
        variant: 'destructive',
      });
    },
  });
};