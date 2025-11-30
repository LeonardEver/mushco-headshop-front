import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, Loader2, Star, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import { productService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleFavorite, isFavorite } = useStore(); // Uso correto do Contexto
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id || ''),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="w-8 h-8 animate-spin text-mush-purple" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Produto não encontrado</h2>
        <Link to="/" className="text-mush-purple hover:underline mt-4 block">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  // Se images for undefined, usa array vazio
  const images = product.images || [product.image];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in pt-24">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-mush-purple mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para a loja
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Galeria */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-purple-100">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-mush-purple shadow-md' : 'border-transparent hover:border-purple-200'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-mush-purple font-semibold bg-purple-50 px-3 py-1 rounded-full capitalize">
                  {/* CORREÇÃO AQUI: product.category é string, não objeto */}
                  {product.category || 'Geral'}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2 mj-title">{product.name}</h1>
                
                {/* Rating fictício se não vier do back */}
                <div className="flex items-center space-x-1 mt-2">
                   {[1,2,3,4,5].map(star => (
                     <Star key={star} className={`w-4 h-4 ${star <= (product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                   ))}
                   <span className="text-sm text-gray-500 ml-2">({product.reviewCount || 0} avaliações)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite(product.id) ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 bg-gray-100 rounded-full text-gray-400 hover:bg-gray-200 hover:text-mush-purple transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <p className="text-3xl font-bold text-mush-purple mt-6">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="space-y-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center border-2 border-gray-200 rounded-xl">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 text-gray-600 hover:text-mush-purple hover:bg-purple-50 rounded-l-lg transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 text-gray-600 hover:text-mush-purple hover:bg-purple-50 rounded-r-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 h-14 text-lg font-bold btn-mj-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
              </Button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex gap-6 text-sm text-gray-600">
             <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Frete grátis acima de R$ 200</span>
             </div>
             <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Compra segura</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;