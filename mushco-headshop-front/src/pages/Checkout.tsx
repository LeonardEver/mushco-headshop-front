
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const Checkout = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: '',
    email: '',
    phone: '',
    cpf: '',
    
    // Endereço
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    
    // Pagamento
    paymentMethod: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  if (state.cart.length === 0) {
    navigate('/carrinho');
    return null;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 200 ? 0 : 15.90;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular processamento do pedido
    toast.success('Pedido realizado com sucesso!');
    dispatch({ type: 'CLEAR_CART' });
    navigate('/pedido-confirmado');
  };

  const steps = [
    { number: 1, title: 'Dados Pessoais' },
    { number: 2, title: 'Endereço' },
    { number: 3, title: 'Pagamento' },
    { number: 4, title: 'Confirmação' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/carrinho')} className="flex items-center space-x-1 hover:text-green-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao carrinho</span>
          </button>
          <span>/</span>
          <span className="text-gray-900">Finalizar Compra</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Steps Indicator */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step >= stepItem.number 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {stepItem.number}
                  </div>
                  <span className={`ml-2 text-sm ${step >= stepItem.number ? 'text-gray-900' : 'text-gray-500'}`}>
                    {stepItem.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`mx-4 h-px w-8 ${step > stepItem.number ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Dados Pessoais */}
              {step === 1 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Dados Pessoais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="btn-primary mt-6"
                  >
                    Continuar
                  </Button>
                </div>
              )}

              {/* Step 2: Endereço */}
              {step === 2 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Endereço de Entrega</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">CEP *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={formData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={formData.neighborhood}
                        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          {/* Adicionar mais estados conforme necessário */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setStep(3)}
                      className="btn-primary"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Pagamento */}
              {step === 3 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Forma de Pagamento</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="credit-card"
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-green-600"
                        />
                        <CreditCard className="w-5 h-5" />
                        <span className="font-medium">Cartão de Crédito</span>
                      </label>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="pix"
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-green-600"
                        />
                        <div className="w-5 h-5 bg-green-500 rounded"></div>
                        <span className="font-medium">PIX</span>
                        <span className="text-sm text-green-600">(5% de desconto)</span>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit-card' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão *</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade *</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/AA"
                            value={formData.cardExpiry}
                            onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV *</Label>
                          <Input
                            id="cardCvv"
                            placeholder="123"
                            value={formData.cardCvv}
                            onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4 mt-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setStep(4)}
                      className="btn-primary"
                    >
                      Revisar Pedido
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmação */}
              {step === 4 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Revisar Pedido</h2>
                  
                  <div className="space-y-6">
                    {/* Resumo dos Dados */}
                    <div className="border-b pb-4">
                      <h3 className="font-semibold mb-2">Dados de Entrega</h3>
                      <p className="text-sm text-gray-600">
                        {formData.name}<br />
                        {formData.address}, {formData.number}<br />
                        {formData.neighborhood}, {formData.city} - {formData.state}<br />
                        CEP: {formData.zipCode}
                      </p>
                    </div>

                    <div className="border-b pb-4">
                      <h3 className="font-semibold mb-2">Forma de Pagamento</h3>
                      <p className="text-sm text-gray-600">
                        {formData.paymentMethod === 'credit-card' ? 'Cartão de Crédito' : 'PIX'}
                        {formData.paymentMethod === 'pix' && (
                          <span className="text-green-600 ml-2">(5% de desconto)</span>
                        )}
                      </p>
                    </div>

                    {/* Itens do Pedido */}
                    <div>
                      <h3 className="font-semibold mb-4">Itens do Pedido</h3>
                      <div className="space-y-3">
                        {state.cart.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium text-sm">{item.product.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-medium">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep(3)}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit"
                      className="btn-primary flex-1"
                    >
                      Finalizar Pedido
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span>{item.quantity}x {item.product.name}</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
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

                {formData.paymentMethod === 'pix' && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto PIX (5%)</span>
                    <span>-{formatPrice(total * 0.05)}</span>
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">
                      {formatPrice(formData.paymentMethod === 'pix' ? total * 0.95 : total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span>Entrega em todo o Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
