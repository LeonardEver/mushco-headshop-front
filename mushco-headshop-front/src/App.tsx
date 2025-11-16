
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import OrderConfirmation from "./pages/OrderConfirmation";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Returns from "./pages/Returns";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import MyOrders from "./pages/MyOrders";
import MyData from "./pages/MyData";
import MyAddress from "./pages/MyAddress";
import Support from "./pages/Support";
import Wallet from "./pages/Wallet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StoreProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/categoria/:slug" element={<Category />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/pedido-confirmado" element={<OrderConfirmation />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/trocas-devolucoes" element={<Returns />} />
            <Route path="/mais-vendidos" element={<Category />} />
            <Route path="/lancamentos" element={<Category />} />
            <Route path="/promocoes" element={<Category />} />
            <Route path="/minha-conta" element={<Account />} />
            <Route path="/minha-conta/pedidos" element={<MyOrders />} />
            <Route path="/minha-conta/dados" element={<MyData />} />
            <Route path="/minha-conta/endereco" element={<MyAddress />} />
            <Route path="/minha-conta/atendimento" element={<Support />} />
            <Route path="/minha-conta/carteira" element={<Wallet />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
