import { Package, Settings, MapPin, Headphones, Wallet, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountLayout } from '@/layouts/AccountLayout';
import { useStore } from '@/context/StoreContext';

const Account = () => {
  const { state } = useStore();

  const menuCards = [
    {
      title: 'Meus Pedidos',
      description: 'Acompanhe seus pedidos e histórico de compras',
      icon: Package,
      url: '/minha-conta/pedidos',
      color: 'text-blue-600',
    },
    {
      title: 'Meus Dados',
      description: 'Gerencie suas informações pessoais',
      icon: Settings,
      url: '/minha-conta/dados',
      color: 'text-green-600',
    },
    {
      title: 'Endereços',
      description: 'Gerencie seus endereços de entrega',
      icon: MapPin,
      url: '/minha-conta/endereco',
      color: 'text-red-600',
    },
    {
      title: 'Atendimento',
      description: 'Central de ajuda e suporte',
      icon: Headphones,
      url: '/minha-conta/atendimento',
      color: 'text-purple-600',
    },
    {
      title: 'Carteira',
      description: 'Seus créditos e formas de pagamento',
      icon: Wallet,
      url: '/minha-conta/carteira',
      color: 'text-yellow-600',
    },
    {
      title: 'Favoritos',
      description: 'Produtos salvos para depois',
      icon: Heart,
      url: '/favoritos',
      color: 'text-pink-600',
    },
  ];

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img 
            src={state.user?.avatar} 
            alt={state.user?.name}
            className="w-20 h-20 rounded-full border-4 border-primary/20"
          />
          <div>
            <h1 className="text-3xl font-bold mj-title">Olá, {state.user?.name}!</h1>
            <p className="text-muted-foreground mj-text">Bem-vindo à sua conta</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuCards.map((card) => (
            <Link key={card.title} to={card.url}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <card.icon className={`h-8 w-8 ${card.color}`} />
                    <CardTitle className="mj-text">{card.title}</CardTitle>
                  </div>
                  <CardDescription className="mj-text">{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
};

export default Account;
