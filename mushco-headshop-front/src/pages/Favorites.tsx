
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { useProducts } from '../hooks/useProducts';
import { Button } from '../components/ui/button';

const Favorites = () => {
  const { data: products = [] } = useProducts();
  const { state } = useStore();
  const navigate = useNavigate();

  const favoriteProducts = products.filter(product => 
    state.favorites.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-1 hover:text-green-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <span>/</span>
          <span className="text-gray-900">Favoritos</span>
        </div>

        <div className="flex items-center space-x-3 mb-8">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold">Meus Favoritos</h1>
          <span className="text-gray-500">({favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'itens'})</span>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <Heart className="w-24 h-24 text-gray-300 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Nenhum produto favoritado ainda</h2>
            <p className="text-gray-600 text-lg">
              Explore nossos produtos e adicione seus favoritos clicando no ❤️
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Explorar Produtos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
