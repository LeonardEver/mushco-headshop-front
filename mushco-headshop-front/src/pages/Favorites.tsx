import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext'; // Contexto novo

const Favorites = () => {
  // Acessando os favoritos diretamente (e loading se quiser mostrar loading)
  const { favorites, toggleFavorite, addToCart } = useStore();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sua lista de desejos está vazia</h2>
        <p className="text-gray-500 mb-6">Salve seus produtos favoritos para ver mais tarde.</p>
        <Link to="/">
          <Button className="btn-mj-primary">
            Explorar Produtos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 mj-title">Meus Favoritos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            <div className="relative aspect-square">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <Link to={`/produto/${product.id}`}>
                <h3 className="font-bold text-gray-800 mb-1 hover:text-mush-purple transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-mush-purple font-bold text-lg mb-4">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </p>
              
              <Button 
                onClick={() => addToCart(product.id, 1)}
                className="w-full btn-mj-secondary gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Mover para o Carrinho
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;