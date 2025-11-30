// 1. BrowserRouter foi REMOVIDO dos imports
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Importar todas as suas páginas
import Index from './pages/Index';
import About from './pages/About';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Returns from './pages/Returns';
import Support from './pages/Support';
import NotFound from './pages/NotFound';

// Importar Layouts e Páginas da Conta
import { AccountLayout } from '@/layouts/AccountLayout';
import Account from './pages/Account';
import MyOrders from './pages/MyOrders';
import MyData from './pages/MyData';
import MyAddress from './pages/MyAddress';
import Favorites from './pages/Favorites';
import Wallet from './pages/Wallet';


function App() {
  return (
    // 2. <BrowserRouter> foi substituído por um Fragmento <>
    <>
      <Header />
      <Routes>
        {/* Rotas Principais */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/categoria/:slug" element={<Category />} />
        <Route path="/produto/:id" element={<ProductDetail />} />
        
        {/* Rotas de Checkout */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* Rotas da Conta (dentro do Layout da Conta) */}
        <Route path="/minha-conta" element={<AccountLayout><Outlet /></AccountLayout>}>
          <Route index element={<Account />} />
          <Route path="pedidos" element={<MyOrders />} />
          <Route path="dados" element={<MyData />} />
          <Route path="endereco" element={<MyAddress />} />
          <Route path="favoritos" element={<Favorites />} />
          <Route path="carteira" element={<Wallet />} />
        </Route>

        {/* Rotas de Rodapé */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/support" element={<Support />} />
        
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
    // 3. Fim do Fragmento
  );
}

export default App;