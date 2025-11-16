import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AccountSidebar } from '@/components/AccountSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AccountLayoutProps {
  children: ReactNode;
}

export function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <Header />
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AccountSidebar />
          <main className="flex-1 p-6">
            <div className="mb-4">
              <SidebarTrigger className="hover:bg-muted p-2 rounded-lg" />
            </div>
            <div className="container mx-auto max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
      <Footer />
    </>
  );
}
