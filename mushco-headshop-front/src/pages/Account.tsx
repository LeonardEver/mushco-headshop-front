import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Heart, Wallet, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // <--- Uso correto do hook novo

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return null; // Ou um loading spinner
  }

  const menuItems = [
    { icon: Package, label: 'Meus Pedidos', path: '/minha-conta/pedidos' },
    { icon: User, label: 'Meus Dados', path: '/minha-conta/dados' },
    { icon: MapPin, label: 'Endereços', path: '/minha-conta/endereco' },
    { icon: Heart, label: 'Favoritos', path: '/minha-conta/favoritos' },
    { icon: Wallet, label: 'Carteira', path: '/minha-conta/carteira' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 mj-title">Minha Conta</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar (Mobile e Desktop) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-mush-purple overflow-hidden">
               {user.photoURL ? (
                 <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
               ) : (
                 (user.displayName || user.email || 'U').charAt(0).toUpperCase()
               )}
            </div>
            <h2 className="font-bold text-gray-800">{user.displayName || 'Usuário Mush'}</h2>
            <p className="text-sm text-gray-500 mb-4">{user.email}</p>
            <Button 
              variant="outline" 
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
          
          {/* Menu Desktop (se não usar o AccountSidebar separado) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hidden lg:block">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center space-x-3 p-4 hover:bg-purple-50 transition-colors text-gray-600 hover:text-mush-purple border-b border-gray-50 last:border-0"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal (Dashboard) */}
        <div className="lg:col-span-3">
           <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Bem-vindo, {user.displayName?.split(' ')[0]}!</h2>
              <p className="text-gray-600 mb-6">
                Este é o seu painel de controle. Aqui você pode visualizar seus pedidos recentes, gerenciar seus endereços de entrega e editar suas informações pessoais.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {menuItems.slice(0, 4).map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => navigate(item.path)}
                      className="p-6 border border-gray-100 rounded-xl hover:shadow-md hover:border-mush-purple/30 cursor-pointer transition-all flex items-center gap-4 group"
                    >
                       <div className="p-3 bg-purple-50 rounded-lg text-mush-purple group-hover:bg-mush-purple group-hover:text-white transition-colors">
                          <item.icon className="w-6 h-6" />
                       </div>
                       <div>
                          <h3 className="font-bold text-gray-800">{item.label}</h3>
                          <span className="text-xs text-gray-400">Acessar</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Account;