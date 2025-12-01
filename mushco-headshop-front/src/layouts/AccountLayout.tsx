import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AccountSidebar } from "@/components/AccountSidebar";
import { ReactNode } from "react";

// CORREÇÃO: Interface para aceitar 'children' (o <Outlet /> vindo do App.tsx)
interface AccountLayoutProps {
  children?: ReactNode;
}

export const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-mobile": "16rem",
        } as React.CSSProperties
      }
    >
      <div className="flex w-full min-h-screen bg-background">
        {/* A Sidebar é renderizada aqui, o posicionamento fino faremos no componente AccountSidebar */}
        <AccountSidebar />
        
        {/* Conteúdo Principal */}
        <main className="flex-1 w-full overflow-x-hidden pt-24 pb-10">
          <div className="container mx-auto max-w-6xl px-4">
            <SidebarTrigger className="md:hidden mb-4" />
            {/* Renderiza o conteúdo da rota filha */}
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};