
import React from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';

const FAQ = () => {
  const faqs = [
    {
      question: "Como faço para realizar um pedido?",
      answer: "É muito simples! Navegue pelos nossos produtos, adicione os itens desejados ao carrinho e finalize a compra. Você pode pagar com cartão de crédito, débito ou PIX."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "O prazo de entrega varia conforme sua localização. Para a região Sudeste: 2-4 dias úteis. Para outras regiões: 5-8 dias úteis. Pedidos com frete grátis podem levar 1-2 dias úteis adicionais."
    },
    {
      question: "Quando o frete é grátis?",
      answer: "O frete é grátis para pedidos acima de R$ 200,00 em todo o Brasil. Para pedidos abaixo desse valor, o frete é calculado conforme o CEP de destino."
    },
    {
      question: "Posso trocar ou devolver um produto?",
      answer: "Sim! Você tem até 7 dias após o recebimento para solicitar troca ou devolução. O produto deve estar em perfeitas condições, na embalagem original."
    },
    {
      question: "Como acompanho meu pedido?",
      answer: "Após a confirmação do pagamento, você receberá um código de rastreamento por e-mail. Com ele, você pode acompanhar a entrega nos Correios ou transportadora."
    },
    {
      question: "Vocês emitem nota fiscal?",
      answer: "Sim, emitimos nota fiscal para todos os pedidos. A nota fiscal é enviada por e-mail logo após a confirmação do pagamento."
    },
    {
      question: "Como posso entrar em contato?",
      answer: "Você pode entrar em contato através do WhatsApp (11) 99999-9999, e-mail contato@mushco.com ou pelo formulário na página de contato."
    },
    {
      question: "Os produtos têm garantia?",
      answer: "Sim! Todos os nossos produtos têm garantia contra defeitos de fabricação. O prazo varia conforme o produto e está especificado na descrição de cada item."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Perguntas Frequentes</h1>
          
          <p className="text-lg text-gray-600 text-center mb-12">
            Encontre respostas para as principais dúvidas sobre a Mush Co.
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index} className="bg-white rounded-lg shadow-sm">
                <CollapsibleTrigger className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
          
          <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Não encontrou sua resposta?</h2>
            <p className="text-gray-600 mb-6">
              Nossa equipe está pronta para ajudar! Entre em contato conosco.
            </p>
            <a 
              href="/contato" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Falar Conosco
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
