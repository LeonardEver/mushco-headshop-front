import { MessageCircle, Mail, Phone, HelpCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AccountLayout } from '@/layouts/AccountLayout';

const Support = () => {
  const contactOptions = [
    {
      title: 'Chat ao Vivo',
      description: 'Fale conosco agora',
      icon: MessageCircle,
      color: 'text-blue-600',
      action: 'Iniciar Chat',
    },
    {
      title: 'Email',
      description: 'suporte@mushco.com',
      icon: Mail,
      color: 'text-green-600',
      action: 'Enviar Email',
    },
    {
      title: 'Telefone',
      description: '(11) 9999-9999',
      icon: Phone,
      color: 'text-purple-600',
      action: 'Ligar Agora',
    },
  ];

  const faqs = [
    {
      question: 'Como acompanhar meu pedido?',
      answer: 'Você pode acompanhar seu pedido na seção "Meus Pedidos". Lá você encontrará informações detalhadas sobre o status e rastreamento.',
    },
    {
      question: 'Qual o prazo de entrega?',
      answer: 'O prazo de entrega varia de acordo com sua região. Geralmente, entregamos em 3-7 dias úteis para produtos em estoque.',
    },
    {
      question: 'Como faço para devolver um produto?',
      answer: 'Você tem até 7 dias após o recebimento para solicitar a devolução. Acesse "Meus Pedidos" e clique em "Solicitar Devolução".',
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartões de crédito, débito, PIX e boleto bancário. Você também pode usar os créditos da sua carteira.',
    },
  ];

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mj-title mb-2">Atendimento</h1>
          <p className="text-muted-foreground mj-text">Estamos aqui para ajudar você</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactOptions.map((option) => (
            <Card key={option.title} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-4 rounded-full bg-${option.color.split('-')[1]}-100`}>
                    <option.icon className={`h-8 w-8 ${option.color}`} />
                  </div>
                  <CardTitle className="mj-text">{option.title}</CardTitle>
                  <CardDescription className="mj-text">{option.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full mj-text">{option.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              <CardTitle className="mj-text">Perguntas Frequentes</CardTitle>
            </div>
            <CardDescription className="mj-text">
              Encontre respostas rápidas para as dúvidas mais comuns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="mj-text font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="mj-text text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle className="mj-text">Documentos Úteis</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start mj-text">
              <FileText className="h-4 w-4 mr-2" />
              Política de Privacidade
            </Button>
            <Button variant="outline" className="w-full justify-start mj-text">
              <FileText className="h-4 w-4 mr-2" />
              Termos de Uso
            </Button>
            <Button variant="outline" className="w-full justify-start mj-text">
              <FileText className="h-4 w-4 mr-2" />
              Política de Trocas e Devoluções
            </Button>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default Support;
