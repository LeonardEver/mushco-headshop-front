import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AccountSidebar } from "@/components/AccountSidebar"

interface AccountLayoutProps {
  children: ReactNode;
}

export function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      {/* CORREÇÃO: Aumentei pt-24 para pt-32 ou pt-40 para compensar o header alto */}
      <div className="container mx-auto flex flex-col md:flex-row gap-8 py-8 pt-36 min-h-[calc(100vh-4rem)]">
        
        {/* Adicionei 'sticky' e 'top-32' para a sidebar acompanhar o scroll sem entrar no header */}
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-36 self-start h-fit">
           <AccountSidebar />
        </aside>

        {/* Mobile Sidebar Trigger (mantido) */}
        <div className="md:hidden">
             <AccountSidebar />
        </div>

        <main className="flex-1 p-6 bg-white/50 rounded-xl border border-gray-100 shadow-sm">
          <div className="md:hidden mb-4">
            <SidebarTrigger className="hover:bg-muted p-2 rounded-lg" />
          </div>
          <div className="container mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}