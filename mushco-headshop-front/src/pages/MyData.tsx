import { useState } from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AccountLayout } from '@/layouts/AccountLayout';
// import { useStore } from '@/context/StoreContext'; // <-- NÃO VAMOS MAIS USAR
import { useAuth } from '@/hooks/useAuth'; // <-- VAMOS USAR O USUÁRIO REAL

const MyData = () => {
  // const { state } = useStore(); // <-- REMOVIDO
  const { user } = useAuth(); // <-- USANDO O USUÁRIO AUTENTICADO DO FIREBASE
  const [isEditing, setIsEditing] = useState(false);

  // NOTA: O 'user' do Firebase pode não ter todos os dados do seu DB (ex: telefone)
  // No futuro, você pode querer criar uma rota /api/users/me que busca
  // os dados do Postgres e mescla com os dados do Firebase.
  // Por agora, vamos usar os dados do Firebase.

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mj-title mb-2">Meus Dados</h1>
          <p className="text-muted-foreground mj-text">Gerencie suas informações pessoais</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="mj-text">Informações Pessoais</CardTitle>
                <CardDescription className="mj-text">Seus dados cadastrais</CardDescription>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                className="mj-text"
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2 mj-text">
                  <User className="h-4 w-4" />
                  <span>Nome Completo</span>
                </Label>
                <Input
                  id="name"
                  // O 'user' do Firebase tem 'displayName'
                  defaultValue={user?.displayName || ''} 
                  disabled={!isEditing}
                  className="mj-text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2 mj-text">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ''}
                  disabled={!isEditing}
                  className="mj-text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2 mj-text">
                  <Phone className="h-4 w-4" />
                  <span>Telefone</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  // O 'user' do Firebase tem 'phoneNumber'
                  defaultValue={user?.phoneNumber || ''} 
                  placeholder="(11) 99999-9999"
                  disabled={!isEditing}
                  className="mj-text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate" className="flex items-center space-x-2 mj-text">
                  <Calendar className="h-4 w-4" />
                  <span>Data de Nascimento</span>
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  disabled={!isEditing}
                  className="mj-text"
                  // Data de nascimento não existe no Firebase,
                  // você precisaria salvar isso no seu Postgres.
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="mj-text">
                  Cancelar
                </Button>
                <Button onClick={() => setIsEditing(false)} className="mj-text">
                  {/* TODO: Implementar a chamada de API para salvar dados */}
                  Salvar Alterações
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* O 'user' do Firebase não tem senha local se logou com Google */}
        {/* Você pode querer esconder isso ou usar o "password reset" do Firebase */}
        <Card>
          <CardHeader>
            <CardTitle className="mj-text">Segurança</CardTitle>
            <CardDescription className="mj-text">Gerencie sua senha e autenticação</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="mj-text">
              Alterar Senha
            </Button>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default MyData;