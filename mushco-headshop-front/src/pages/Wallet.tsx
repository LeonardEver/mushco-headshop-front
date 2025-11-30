import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Wallet() {
  // Estado real inicial (sem mocks)
  const balance = 0;
  const transactions: any[] = []; // Array vazio para remover mocks

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Minha Carteira</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-3 bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/90">
              Saldo Total
            </CardTitle>
            <WalletIcon className="h-4 w-4 text-primary-foreground/90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ {balance.toFixed(2).replace('.', ',')}</div>
            <p className="text-xs text-primary-foreground/80 mt-1">
              Disponível para uso imediato
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Histórico de Transações</h3>
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {/* Lista de transações real (se houver) */}
          </div>
        ) : (
           <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-2">Nenhuma transação registrada.</p>
              <p className="text-xs text-muted-foreground">Seus cashbacks e reembolsos aparecerão aqui.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}