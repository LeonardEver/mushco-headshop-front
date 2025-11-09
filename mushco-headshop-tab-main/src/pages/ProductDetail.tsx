
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { data: products = [] } = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isFavorite = state.favorites.includes(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product.id });
      toast.info('Removido dos favoritos');
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: product.id });
      toast.success('Adicionado aos favoritos!');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

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
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {/* Badges */}
              <div className="flex space-x-2 mb-4">
                {product.isBestSeller && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    🔥 Mais Vendido
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    ✨ Novo
                  </span>
                )}
                {product.discount && (
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} avaliações)</span>
              </div>

              {/* Price */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <p className="text-green-600 font-medium">
                    Você economiza {formatPrice(product.originalPrice! - product.price)}!
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`text-lg font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                  {product.inStock ? '✅ Em estoque' : '❌ Indisponível'}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-lg font-medium">Quantidade:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full btn-primary text-lg py-4"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                
                <Button 
                  onClick={handleToggleFavorite}
                  variant="outline"
                  className="w-full py-4"
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Frete Grátis</p>
                  <p className="text-sm text-gray-600">Para pedidos acima de R$ 200</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Compra Protegida</p>
                  <p className="text-sm text-gray-600">Seus dados estão seguros</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Descrição do Produto</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          
          <h3 className="text-xl font-semibold mb-4">Características:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
