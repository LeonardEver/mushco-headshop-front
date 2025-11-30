
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Category = () => {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.category === slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const sortProducts = (products: typeof categoryProducts) => {
    switch (sortBy) {
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(categoryProducts);

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-1 hover:text-green-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
              <p className="text-gray-600 text-lg">{category.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {sortedProducts.length} produtos encontrados
              </p>
            </div>
            <div className="aspect-video lg:aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Ordenar por:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
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

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-4">Tente ajustar seus filtros ou explore outras categorias</p>
            <Button onClick={() => navigate('/')}>
              Voltar ao início
            </Button>
          </div>
        )}
      </main>

    </div>
  );
};

export default Category;
