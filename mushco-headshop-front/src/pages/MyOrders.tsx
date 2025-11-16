import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AccountLayout } from '@/layouts/AccountLayout';

const MyOrders = () => {
  const orders = [
    {
      id: '#12345',
      date: '15/11/2025',
      total: 'R$ 249,90',
      status: 'Entregue',
      statusColor: 'bg-green-500',
      icon: CheckCircle2,
      items: 3,
    },
    {
      id: '#12344',
      date: '10/11/2025',
      total: 'R$ 189,90',
      status: 'Em Trânsito',
      statusColor: 'bg-blue-500',
      icon: Truck,
      items: 2,
    },
    {
      id: '#12343',
      date: '05/11/2025',
      total: 'R$ 299,90',
      status: 'Processando',
      statusColor: 'bg-yellow-500',
      icon: Clock,
      items: 4,
    },
  ];

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mj-title mb-2">Meus Pedidos</h1>
          <p className="text-muted-foreground mj-text">Acompanhe o status dos seus pedidos</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${order.statusColor} bg-opacity-10`}>
                      <order.icon className={`h-6 w-6 ${order.statusColor.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <CardTitle className="mj-text">Pedido {order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mj-text">{order.date}</p>
                    </div>
                  </div>
                  <Badge className={order.statusColor}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground mj-text">{order.items} {order.items === 1 ? 'item' : 'itens'}</p>
                    <p className="font-semibold text-lg mj-text">{order.total}</p>
                  </div>
                  <button className="text-primary hover:underline mj-text font-semibold">
                    Ver Detalhes
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mj-text mb-2">Nenhum pedido ainda</h3>
              <p className="text-muted-foreground mj-text">Quando você fizer um pedido, ele aparecerá aqui</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AccountLayout>
  );
};

export default MyOrders;
