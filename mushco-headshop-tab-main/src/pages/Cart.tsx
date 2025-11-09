
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Cart = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      toast.info('Item removido do carrinho');
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.info('Item removido do carrinho');
  };

  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 200 ? 0 : 15.90;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto" />
            <h1 className="text-3xl font-bold">Seu carrinho está vazio</h1>
            <p className="text-gray-600 text-lg">Que tal adicionar alguns produtos incríveis?</p>
            <Link to="/">
              <Button size="lg" className="btn-primary">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-1 hover:text-green-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Continuar comprando</span>
          </button>
          <span>/</span>
          <span className="text-gray-900">Carrinho</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold mb-6">Seu Carrinho ({state.cart.length} {state.cart.length === 1 ? 'item' : 'itens'})</h1>
            
            {state.cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <Link to={`/produto/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <Link 
                      to={`/produto/${item.product.id}`}
                      className="text-lg font-semibold hover:text-green-600 transition-colors block"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-green-600 font-bold text-xl">
                      {formatPrice(item.product.price)}
                    </p>
                    {item.product.originalPrice && (
                      <p className="text-gray-500 line-through text-sm">
                        {formatPrice(item.product.originalPrice)}
                      </p>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 min-w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                  <span className="text-lg font-semibold">
                    Subtotal: {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                  </span>
                </div>

                {subtotal < 200 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      Adicione mais {formatPrice(200 - subtotal)} para ganhar frete grátis!
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary text-lg py-4 mt-6"
                >
                  Finalizar Compra
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Compra 100% segura e protegida
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
