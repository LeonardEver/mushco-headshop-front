import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// CORREÇÃO: Adicionado 'Shield' nos imports abaixo
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useStore();
  const navigate = useNavigate();

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartQuantity(id, newQuantity);
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 200 ? 0 : 15.90;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Seu carrinho está vazio</h1>
            <p className="text-gray-600 text-lg">Que tal adicionar alguns produtos incríveis?</p>
            <Link to="/">
              <Button size="lg" className="btn-mj-primary">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-1 hover:text-mush-purple">
            <ArrowLeft className="w-4 h-4" />
            <span>Continuar comprando</span>
          </button>
          <span>/</span>
          <span className="text-gray-900">Carrinho</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold mb-6 mj-title">Seu Carrinho ({cart.length} itens)</h1>
            
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={`/produto/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.product.images ? item.product.images[0] : item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 space-y-2">
                    <Link 
                      to={`/produto/${item.product.id}`}
                      className="text-lg font-semibold hover:text-mush-purple transition-colors block"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-mush-purple font-bold text-xl">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white rounded-l-lg transition-colors text-gray-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 min-w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white rounded-r-lg transition-colors text-gray-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                  <span className="text-gray-500 text-sm mr-2">Total do item:</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-bold mb-6 mj-text">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-gray-600'}>
                    {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                  </span>
                </div>

                {subtotal < 200 && (
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-center">
                    <p className="text-sm text-mush-purple">
                      Faltam <strong>{formatPrice(200 - subtotal)}</strong> para frete grátis!
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-mush-purple mj-glow-purple">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-mj-primary text-lg h-12 mt-6 font-bold shadow-lg"
                >
                  Finalizar Compra
                </Button>

                <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                  {/* Agora 'Shield' está importado corretamente */}
                  <Shield className="w-3 h-3" /> Compra 100% segura
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;