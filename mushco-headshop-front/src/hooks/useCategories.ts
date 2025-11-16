import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/api';
import { Category } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Categorias temporárias até backend estar conectado
const tempCategories: Category[] = [
  { id: '1', name: 'Bongs', slug: 'bongs', image: '', description: 'Bongs de Vidro & Silicone' },
  { id: '2', name: 'Pipes', slug: 'pipes', image: '', description: 'Pipes de Vidro, Metal & Silicone' },
  { id: '3', name: 'Sedas & Piteiras', slug: 'sedas-piteiras', image: '', description: 'As melhores sedas e piteiras para seu fumo' },
  { id: '4', name: 'Kits de Cultivo', slug: 'kits-cultivo', image: '', description: 'Cultive seus sua própria Medicina' },
  { id: '5', name: 'Acessórios', slug: 'acessórios', image: '', description: 'Todos os artigos necessários para sua Sessão' },
  { id: '6', name: 'Extratos Concentrados', slug: 'extratos', image: '', description: 'Extratos concentrados' },
];

// Hook para buscar todas as categorias
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        return await categoryService.getAll();
      } catch (error) {
        // Retorna categorias temporárias se API não estiver disponível
        console.warn('API não disponível, usando categorias temporárias');
        return tempCategories;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para buscar categoria por slug
export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getBySlug(slug),
    enabled: !!slug,
  });
};

// Hook para criação de categoria (admin)
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Sucesso',
        description: 'Categoria criada com sucesso!',
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao criar categoria',
        variant: 'destructive',
      });
    },
  });
};

// Hook para atualização de categoria (admin)
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) =>
      categoryService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', data.slug] });
      toast({
        title: 'Sucesso',
        description: 'Categoria atualizada com sucesso!',
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar categoria',
        variant: 'destructive',
      });
    },
  });
};

// Hook para exclusão de categoria (admin)
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: categoryService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Sucesso',
        description: 'Categoria excluída com sucesso!',
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao excluir categoria',
        variant: 'destructive',
      });
    },
  });
};