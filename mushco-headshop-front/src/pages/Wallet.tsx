import { Wallet as WalletIcon, CreditCard, Plus, ArrowUpRight, ArrowDownLeft, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AccountLayout } from '@/layouts/AccountLayout';

const Wallet = () => {
  const balance = 150.00;

  const transactions = [
    {
      id: 1,
      type: 'credit',
      description: 'Cashback compra #12345',
      date: '15/11/2025',
      amount: 25.00,
      icon: Gift,
    },
    {
      id: 2,
      type: 'debit',
      description: 'Usado em compra #12344',
      date: '10/11/2025',
      amount: -50.00,
      icon: ArrowUpRight,
    },
    {
      id: 3,
      type: 'credit',
      description: 'Recarga manual',
      date: '05/11/2025',
      amount: 100.00,
      icon: Plus,
    },
    {
      id: 4,
      type: 'credit',
      description: 'Cashback compra #12342',
      date: '01/11/2025',
      amount: 15.00,
      icon: Gift,
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      number: '**** 1234',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Mastercard',
      number: '**** 5678',
      expiry: '06/26',
      isDefault: false,
    },
  ];

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mj-title mb-2">Carteira</h1>
          <p className="text-muted-foreground mj-text">Gerencie seus créditos e formas de pagamento</p>
        </div>

        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mj-text">Saldo Disponível</p>
                  <h2 className="text-4xl font-bold mj-title">R$ {balance.toFixed(2)}</h2>
                </div>
                <WalletIcon className="h-12 w-12 opacity-80" />
              </div>
              <Button 
                variant="secondary" 
                className="w-full mj-text font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Créditos
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="mj-text">Histórico de Transações</CardTitle>
              <CardDescription className="mj-text">Seus créditos e débitos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <transaction.icon className={`h-4 w-4 ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium mj-text">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground mj-text">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-semibold mj-text ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="mj-text">Formas de Pagamento</CardTitle>
                  <CardDescription className="mj-text">Cartões salvos</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="mj-text">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <Card key={method.id} className="bg-gradient-to-br from-slate-800 to-slate-700 text-white">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <CreditCard className="h-8 w-8" />
                        {method.isDefault && (
                          <Badge variant="secondary" className="mj-text">Padrão</Badge>
                        )}
                      </div>
                      <div>
                        <p className="text-sm opacity-80 mj-text">{method.type}</p>
                        <p className="text-xl font-mono font-bold">{method.number}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs opacity-80 mj-text">Validade: {method.expiry}</p>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" className="text-white hover:text-white/80 mj-text">
                            Editar
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-300 hover:text-red-200 mj-text">
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Wallet;
