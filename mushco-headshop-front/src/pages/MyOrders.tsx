import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import api from "@/services/api"; // Certifique-se de importar sua instância axios configurada
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  items?: any[];
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Ajuste a rota conforme seu backend. Geralmente algo como /orders/my-orders
        const response = await api.get('/orders/my-orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        // Se a API ainda não estiver pronta, falha silenciosamente ou mostra toast
        // toast({ title: "Erro", description: "Não foi possível carregar os pedidos." });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  if (loading) {
    return <div className="p-8 text-center">Carregando pedidos...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Meus Pedidos</h2>
      
      {orders.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="bg-muted p-4 rounded-full">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Nenhum pedido encontrado</p>
              <p className="text-sm text-muted-foreground">Você ainda não fez nenhuma compra.</p>
            </div>
            <Button asChild>
              <a href="/category/all">Começar a comprar</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Pedido #{order.id}</CardTitle>
                <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                  {order.status === "delivered" ? "Entregue" : 
                   order.status === "processing" ? "Em processamento" : 
                   order.status === "shipped" ? "Enviado" : order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-muted-foreground">
                    Data: {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="font-medium">
                    Total: R$ {Number(order.total).toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}