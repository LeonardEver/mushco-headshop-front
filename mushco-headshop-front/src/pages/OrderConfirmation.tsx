
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';

const OrderConfirmation = () => {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Pedido Confirmado!</h1>
            <p className="text-xl text-gray-600">
              Obrigado pela sua compra! Seu pedido foi processado com sucesso.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                Número do pedido: <span className="font-bold">#{orderNumber}</span>
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl p-8 shadow-sm text-left">
            <h2 className="text-2xl font-bold mb-6 text-center">Próximos Passos</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Processamento</h3>
                  <p className="text-gray-600 text-sm">
                    Seu pedido está sendo preparado em nosso estoque. Você receberá um e-mail de confirmação em breve.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Envio</h3>
                  <p className="text-gray-600 text-sm">
                    Enviaremos o código de rastreamento por e-mail assim que seu pedido for despachado.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Entrega</h3>
                  <p className="text-gray-600 text-sm">
                    Receba seus produtos no conforto da sua casa em até 5 dias úteis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Dúvidas sobre seu pedido?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Entre em contato conosco pelo WhatsApp ou e-mail. Estamos aqui para ajudar!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm">
                📱 WhatsApp
              </Button>
              <Button variant="outline" size="sm">
                ✉️ E-mail
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="btn-primary">
                Continuar Comprando
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Acompanhar Pedido
            </Button>
          </div>

          {/* Promotional Banner - Fixed contrast */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">Obrigado pela preferência!</h3>
            <p className="mb-4 text-purple-100">
              Que tal compartilhar sua experiência com seus amigos? 
              Eles também merecem produtos de qualidade!
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-medium">
              Compartilhar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
