import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

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

import { AccountLayout } from '@/layouts/AccountLayout';
import Account from './pages/Account';
import MyOrders from './pages/MyOrders';
import MyData from './pages/MyData';
import MyAddress from './pages/MyAddress';
import Favorites from './pages/Favorites';
import Wallet from './pages/Wallet';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/carrinho" element={<Cart />} />
        
        <Route path="/categoria/:slug" element={<Category />} />
        <Route path="/ofertas" element={<Category />} />
        
        <Route path="/produto/:id" element={<ProductDetail />} />
        
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        <Route path="/minha-conta" element={<AccountLayout><Outlet /></AccountLayout>}>
          <Route index element={<Account />} />
          <Route path="pedidos" element={<MyOrders />} />
          <Route path="dados" element={<MyData />} />
          <Route path="endereco" element={<MyAddress />} />
          <Route path="favoritos" element={<Favorites />} />
          <Route path="carteira" element={<Wallet />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/support" element={<Support />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;