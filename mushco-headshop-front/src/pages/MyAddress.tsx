import { MapPin, Plus, Home, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AccountLayout } from '@/layouts/AccountLayout';

const MyAddress = () => {
  const addresses = [
    {
      id: 1,
      type: 'Casa',
      icon: Home,
      isDefault: true,
      street: 'Rua das Flores, 123',
      complement: 'Apto 45',
      neighborhood: 'Jardim Primavera',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
    {
      id: 2,
      type: 'Trabalho',
      icon: Building2,
      isDefault: false,
      street: 'Av. Paulista, 1000',
      complement: 'Sala 200',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
    },
  ];

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mj-title mb-2">Meus Endereços</h1>
            <p className="text-muted-foreground mj-text">Gerencie seus endereços de entrega</p>
          </div>
          <Button className="mj-text">
            <Plus className="h-4 w-4 mr-2" />
            Novo Endereço
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <address.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="mj-text">{address.type}</CardTitle>
                  </div>
                  {address.isDefault && (
                    <Badge variant="secondary" className="mj-text">Padrão</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground mj-text">
                    <p>{address.street}</p>
                    {address.complement && <p>{address.complement}</p>}
                    <p>{address.neighborhood}</p>
                    <p>{address.city} - {address.state}</p>
                    <p>CEP: {address.zipCode}</p>
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1 mj-text">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 mj-text text-red-600 hover:text-red-700">
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {addresses.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mj-text mb-2">Nenhum endereço cadastrado</h3>
              <p className="text-muted-foreground mj-text mb-6">Adicione um endereço para facilitar suas compras</p>
              <Button className="mj-text">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Endereço
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AccountLayout>
  );
};

export default MyAddress;
