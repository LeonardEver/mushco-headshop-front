import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Zap, Flame } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isFavorite, toggleFavorite, addToCart } = useStore();

  const isFav = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    toast.success(`${product.name} adicionado ao carrinho! 🛒`);
  };

  const displayImage = 
    product.image && product.image !== "" ? product.image : 
    (product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg");

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite(product.id);
    if (isFav) {
      toast.info('Removido dos favoritos 💔');
    } else {
      toast.success('Adicionado aos favoritos! 💚');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Link to={`/produto/${product.id}`} className="block group">
      <div className="mj-card p-0 overflow-hidden transform hover:scale-105 transition-all duration-300 relative">
        <div className="absolute top-3 left-3 z-20 flex flex-col space-y-2">
          {product.isBestSeller && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 animate-pulse shadow-lg">
              <Flame className="w-3 h-3" />
              <span className="mj-text">BEST SELLER</span>
            </span>
          )}
          {product.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
              <Zap className="w-3 h-3" />
              <span className="mj-text">NOVO</span>
            </span>
          )}
          {product.discount && (
            <span className="mj-seal-orange text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
              <span className="mj-text">-{product.discount}% OFF</span>
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 z-20 w-10 h-10 bg-black/20 hover:bg-purple-600/80 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 group-hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isFav ? 'fill-red-500 text-red-500' : 'text-white hover:text-red-400'
            }`} 
          />
        </button>

        {/* Product Image Placeholder */}
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm mj-text">Imagem</span>
            </div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={handleAddToCart}
                className="btn-mj-primary transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                COMPRAR
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3 bg-white">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-700 transition-colors line-clamp-2 mj-text">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 mj-text">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-purple-700 mj-glow-purple">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through mj-text">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.discount && (
              <p className="text-green-600 font-semibold text-sm mj-text">
                Economia de {formatPrice(product.originalPrice! - product.price)}! 💰
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold mj-text ${
              product.inStock ? 'text-green-600' : 'text-red-500'
            }`}>
              {product.inStock ? '✅ Disponível' : '❌ Esgotado'}
            </span>
            
            {product.inStock && (
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="btn-mj-primary text-xs px-4 py-2 shadow-md"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                COMPRAR
              </Button>
            )}
          </div>
        </div>

        {/* Professional shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent transform skew-x-12 animate-mj-shimmer"></div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;