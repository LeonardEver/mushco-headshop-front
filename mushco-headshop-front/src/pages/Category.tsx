import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List, SearchX } from 'lucide-react';
import ProductCard from '@/components/ProductCard'; // Ajustei import para @
import { Button } from '@/components/ui/button';
import { Product, Category as CategoryType } from "@/types";
import api from "@/services/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Estados que estavam faltando
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<CategoryType | null>(null); // Armazena o objeto completo da categoria
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      try {
        if (!slug) return;

        // 1. Busca todas as categorias para encontrar o ID baseado no Slug (nome)
        const categoriesResponse = await api.get('/categories');
        const categories: CategoryType[] = categoriesResponse.data.data || categoriesResponse.data;

        // Normalização para comparar "seda" com "Seda" ou "sedas"
        const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const targetSlug = normalize(slug);

        const foundCategory = categories.find(c => 
          normalize(c.name).includes(targetSlug) || normalize(c.id) === targetSlug
        );

        if (foundCategory) {
          setCategory(foundCategory); // Seta a categoria completa (com imagem, descrição etc)
          
          // 2. Busca produtos pelo ID da categoria encontrada
          const productsResponse = await api.get(`/products?categoryId=${foundCategory.id}`);
          setProducts(productsResponse.data.data || []);
        } else {
          // Lógica especial para rota de "Ofertas"
      
        }

      } catch (error) {
        console.error("Erro ao carregar categoria:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [slug]);

  // Lógica de Ordenação (Restaurada)
  const sortedProducts = useMemo(() => {
    // Cria uma cópia para não mutar o estado original
    const items = [...products];

    switch (sortBy) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);
      case 'newest':
        // Assumindo que você tem createdAt ou similar, senão usa ID
        return items; 
      default:
        return items;
    }
  }, [products, sortBy]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8 pt-24">
           <div className="space-y-4">
             <Skeleton className="h-8 w-48" />
             <Skeleton className="h-64 w-full rounded-xl" />
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-[350px]" />)}
             </div>
           </div>
        </main>
      </div>
    );
  }

  // Estado de erro/vazio se não achou categoria
  if (!category && !loading) {
    return (
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 container mx-auto px-4 py-8 pt-24 flex flex-col items-center justify-center">
            <SearchX className="w-16 h-16 text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold text-gray-700">Categoria não encontrada</h1>
            <Button onClick={() => navigate('/')} className="mt-4">Voltar para Início</Button>
          </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <span>/</span>
          <button onClick={() => navigate(-1)} className="hover:text-primary transition-colors">
            Voltar
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium capitalize">{category?.name}</span>
        </div>

        {/* Category Header Rico */}
        {category && (
            <div className="mb-8 bg-secondary/10 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 capitalize text-primary">
                    {category.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    {category.description || `Explore nossa seleção premium de ${category.name}.`}
                </p>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-800 shadow-sm">
                        {sortedProducts.length} produtos
                    </span>
                    {/* Se tiver mais tags na categoria, pode exibir aqui */}
                </div>
                </div>
                {category.image && (
                    <div className="aspect-video lg:aspect-square overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.currentTarget.style.display = 'none' }} // Esconde se imagem quebrar
                        />
                    </div>
                )}
            </div>
            </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-4">Tente verificar outras categorias ou volte mais tarde.</p>
            <Button onClick={() => navigate('/')}>
              Voltar ao início
            </Button>
          </div>
        )}

        {/* Filters and Sort Bar */}
        {sortedProducts.length > 0 && (
            <div className="sticky top-20 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
                </Button>
                <div className="flex items-center bg-secondary/10 rounded-md p-1">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    title="Visualização em Grade"
                >
                    <Grid className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    title="Visualização em Lista"
                >
                    <List className="w-4 h-4" />
                </button>
                </div>
            </div>
            
            <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-600 whitespace-nowrap">Ordenar:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-white">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="price-asc">Menor preço</SelectItem>
                    <SelectItem value="price-desc">Maior preço</SelectItem>
                    <SelectItem value="rating">Melhor avaliação</SelectItem>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                </SelectContent>
                </Select>
            </div>
            </div>
        )}

        {/* Products Grid / List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 max-w-3xl mx-auto' // Lista centralizada
        }`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      
    </div>
  );
};

export default Category;