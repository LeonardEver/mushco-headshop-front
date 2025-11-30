import { Package, Settings, MapPin, Headphones, Wallet, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Visão Geral', url: '/minha-conta', icon: User },
  { title: 'Meus Pedidos', url: '/minha-conta/pedidos', icon: Package },
  { title: 'Meus Dados', url: '/minha-conta/dados', icon: Settings },
  { title: 'Endereços', url: '/minha-conta/endereco', icon: MapPin },
  { title: 'Atendimento', url: '/minha-conta/atendimento', icon: Headphones },
  { title: 'Carteira', url: '/minha-conta/carteira', icon: Wallet },
  { title: 'Favoritos', url: '/favoritos', icon: Heart },
];

export function AccountSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold mj-text px-4 py-4">
            {!isCollapsed && 'Minha Conta'}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url}
                      className={`flex items-center px-2 py-4 rounded-lg transition-all duration-300 ${
                        isActive(item.url)
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'hover:bg-muted/50 text-foreground'
                      }`}
                    >
                      <item.icon className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5`} />
                      {!isCollapsed && <span className="mj-text">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
