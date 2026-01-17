
import React from 'react';
import { Package, Clock, RefreshCw, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Trocas e Devoluções</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Política de Trocas</h2>
                <p className="text-gray-700 mb-6">
                  Na Mush Co., sua satisfação é nossa prioridade. Por isso, oferecemos 
                  uma política flexível de trocas e devoluções.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Prazo de 7 dias</h3>
                    <p className="text-gray-600">
                      Você tem até 7 dias corridos após o recebimento para solicitar 
                      troca ou devolução, conforme o Código de Defesa do Consumidor.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Produto em perfeitas condições</h3>
                    <p className="text-gray-600">
                      O produto deve estar na embalagem original, sem sinais de uso, 
                      com todos os acessórios e documentos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Processo simples</h3>
                    <p className="text-gray-600">
                      Entre em contato conosco pelo WhatsApp ou e-mail informando 
                      o número do pedido e o motivo da troca/devolução.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Como Solicitar</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <p>Entre em contato pelo WhatsApp (11) 99999-9999</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <p>Informe o número do pedido e motivo da solicitação</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <p>Receba as instruções para envio do produto</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <p>Envie o produto para nosso centro de distribuição</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p>Receba o reembolso ou produto de troca</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Reembolso</h3>
                <p className="text-sm text-gray-600">
                  O reembolso é processado em até 5 dias úteis após recebermos 
                  o produto e pode levar até 2 faturas para aparecer no cartão.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-semibold text-red-800 mb-2">Importante</h3>
            <ul className="text-red-700 space-y-1 text-sm">
              <li>• Produtos com sinais de uso não poderão ser trocados</li>
              <li>• O frete de devolução é por conta do cliente, exceto em casos de defeito</li>
              <li>• Produtos personalizados não podem ser trocados</li>
              <li>• Mantenha sempre o número de rastreamento até a conclusão do processo</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Returns;
