import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AccountSidebar } from "@/components/AccountSidebar";
import { Outlet } from "react-router-dom";

export const AccountLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AccountSidebar />
        <main className="flex-1 p-6 w-full overflow-x-hidden">
          <div className="container mx-auto max-w-6xl">
            <SidebarTrigger className="md:hidden mb-4" />
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};