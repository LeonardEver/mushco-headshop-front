import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const Checkout = () => {
  // CORREÇÃO: Usando cart, getCartTotal e clearCart do contexto novo
  const { cart, getCartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', cpf: '',
    zipCode: '', address: '', number: '', complement: '', neighborhood: '', city: '', state: '',
    paymentMethod: '', cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
  });

  // Se não tem cart ou vazio
  if (!cart || cart.length === 0) {
    navigate('/carrinho');
    return null;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 200 ? 0 : 15.90;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você integraria com o Backend (API) para criar o pedido real
    
    toast.success('Pedido realizado com sucesso!');
    clearCart(); // Usa a função nova do contexto
    navigate('/order-confirmation'); // Verifique se essa rota existe no App.tsx
  };

  const steps = [
    { number: 1, title: 'Dados' },
    { number: 2, title: 'Endereço' },
    { number: 3, title: 'Pagamento' },
    { number: 4, title: 'Revisão' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/carrinho')} className="flex items-center space-x-1 hover:text-mush-purple">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao carrinho</span>
          </button>
          <span>/</span>
          <span className="text-gray-900">Finalizar Compra</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Steps Indicator */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                    ${step >= stepItem.number ? 'bg-mush-purple text-white' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {stepItem.number}
                  </div>
                  <span className={`ml-2 text-sm hidden sm:block ${step >= stepItem.number ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {stepItem.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`mx-2 sm:mx-4 h-1 w-8 sm:w-16 rounded-full ${step > stepItem.number ? 'bg-mush-purple' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-in">
                  <h2 className="text-xl font-bold mb-6 text-gray-800">Dados Pessoais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input id="cpf" value={formData.cpf} onChange={(e) => handleInputChange('cpf', e.target.value)} required />
                    </div>
                  </div>
                  <Button type="button" onClick={() => setStep(2)} className="btn-mj-primary mt-6 w-full md:w-auto">Continuar</Button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-in">
                  <h2 className="text-xl font-bold mb-6 text-gray-800">Endereço de Entrega</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                       <Label htmlFor="zipCode">CEP *</Label>
                       <div className="flex gap-2">
                         <Input id="zipCode" className="max-w-[150px]" value={formData.zipCode} onChange={(e) => handleInputChange('zipCode', e.target.value)} required />
                         <Button type="button" variant="outline" size="sm">Buscar</Button>
                       </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Rua / Avenida *</Label>
                      <Input id="address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input id="number" value={formData.number} onChange={(e) => handleInputChange('number', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input id="complement" value={formData.complement} onChange={(e) => handleInputChange('complement', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input id="neighborhood" value={formData.neighborhood} onChange={(e) => handleInputChange('neighborhood', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input id="city" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">SP</SelectItem>
                          <SelectItem value="RJ">RJ</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          <SelectItem value="RS">RS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>Voltar</Button>
                    <Button type="button" onClick={() => setStep(3)} className="btn-mj-primary">Continuar</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-in">
                  <h2 className="text-xl font-bold mb-6 text-gray-800">Pagamento</h2>
                  <div className="space-y-4 mb-6">
                    <div onClick={() => handleInputChange('paymentMethod', 'credit-card')} 
                         className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.paymentMethod === 'credit-card' ? 'border-mush-purple bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}>
                      <div className="flex items-center gap-3">
                        <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'credit-card' ? 'text-mush-purple' : 'text-gray-400'}`} />
                        <span className="font-semibold">Cartão de Crédito</span>
                      </div>
                    </div>
                    
                    <div onClick={() => handleInputChange('paymentMethod', 'pix')}
                         className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.paymentMethod === 'pix' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-xl text-green-600">PIX</div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Pagamento via PIX</span>
                            <span className="text-xs text-green-600 font-bold">5% de desconto</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit-card' && (
                    <div className="space-y-4 animate-fade-in bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <Label>Número do Cartão</Label>
                        <Input placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={(e) => handleInputChange('cardNumber', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Nome Impresso</Label>
                        <Input placeholder="COMO NO CARTAO" value={formData.cardName} onChange={(e) => handleInputChange('cardName', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>Validade</Label>
                           <Input placeholder="MM/AA" value={formData.cardExpiry} onChange={(e) => handleInputChange('cardExpiry', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                           <Label>CVV</Label>
                           <Input placeholder="123" value={formData.cardCvv} onChange={(e) => handleInputChange('cardCvv', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>Voltar</Button>
                    <Button type="button" onClick={() => setStep(4)} className="btn-mj-primary">Revisar Pedido</Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-in">
                  <h2 className="text-xl font-bold mb-6 text-gray-800">Revisão Final</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-mush-purple">Entrega para:</h3>
                      <p className="text-sm text-gray-600">{formData.name}</p>
                      <p className="text-sm text-gray-600">{formData.address}, {formData.number} - {formData.neighborhood}</p>
                      <p className="text-sm text-gray-600">{formData.city} - {formData.state}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-mush-purple">Itens:</h3>
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm py-1 border-b border-gray-200 last:border-0">
                           <span>{item.quantity}x {item.product.name}</span>
                           <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button type="button" variant="outline" onClick={() => setStep(3)}>Voltar</Button>
                    <Button type="submit" className="btn-mj-primary flex-1 ml-4 text-lg font-bold">
                       Confirmar Pedido
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 border border-gray-100">
              <h2 className="text-xl font-bold mb-6 mj-text">Total a Pagar</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span className="text-green-600 font-medium">{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                </div>
                {formData.paymentMethod === 'pix' && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Desconto PIX</span>
                    <span>-{formatPrice(total * 0.05)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-2xl font-bold text-gray-900">
                   <span>Total</span>
                   <span className="text-mush-purple mj-glow-purple">
                     {formatPrice(formData.paymentMethod === 'pix' ? total * 0.95 : total)}
                   </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <Shield className="w-4 h-4" /> Ambiente Seguro
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;