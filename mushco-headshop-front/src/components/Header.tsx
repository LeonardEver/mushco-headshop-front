
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Menu, X, Leaf, Package, MapPin, Wallet, Settings, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCategories } from '../hooks/useCategories';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const { data: categories = [] } = useCategories();
  const { state, dispatch } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = state.favorites.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 text-center text-sm font-bold mj-text shadow-sm">
        <p className="flex items-center justify-center space-x-2">
          <Leaf className="w-4 h-4" />
          <span>🌿 Frete grátis para pedidos acima de R$ 200! No estilo, com qualidade 🌿</span>
          <Leaf className="w-4 h-4" />
        </p>
      </div>

      {/* Main Header */}
      <div className="mj-header shadow-lg">
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 flex items-center justify-center relative transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/lovable-uploads/02678cb3-6a06-46c2-8067-0bffbbc7ded5.png" 
                  alt="Mush Co. Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="mj-title text-xl text-white font-black">
                  Mush Co.
                </span>
                <p className="text-xs text-green-200 mj-text">No estilo, com qualidade 🌿</p>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 bg-white border-white/30 text-gray-800 placeholder-gray-500 focus:bg-white focus:border-green-400 transition-all duration-300 mj-text"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10 p-0 btn-mj-primary"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* User Menu */}
              {state.isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all duration-300">
                      <img 
                        src={state.user?.avatar} 
                        alt={state.user?.name}
                        className="w-8 h-8 rounded-full border-2 border-white/30"
                      />
                      <span className="text-sm text-white font-semibold mj-text">{state.user?.name}</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-popover">
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/minha-conta" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Minha Conta</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/minha-conta/pedidos" className="flex items-center w-full">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Meus Pedidos</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/minha-conta/dados" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Meus Dados</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/minha-conta/endereco" className="flex items-center w-full">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>Endereço</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/minha-conta/carteira" className="flex items-center w-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Carteira</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogin} 
                  className="flex items-center space-x-2 bg-white text-green-600 hover:bg-white/90 font-semibold mj-text px-4 py-2 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Entrar</span>
                </Button>
              )}

              {/* Favorites */}
              <Link to="/favoritos" className="relative p-3 hover:bg-white/20 rounded-lg transition-all duration-300 group">
                <Heart className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/carrinho" className="relative p-3 hover:bg-white/20 rounded-lg transition-all duration-300 group">
                <ShoppingCart className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-3">
              {/* Mobile Auth/User Actions - Show different buttons based on auth state */}
              {state.isAuthenticated ? (
                <>
                  {/* Favorites */}
                  <Link to="/favoritos" className="relative p-3 hover:bg-white/20 rounded-lg transition-all duration-300 group">
                    <Heart className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                    {favoritesCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>

                  {/* Cart */}
                  <Link to="/carrinho" className="relative p-3 hover:bg-white/20 rounded-lg transition-all duration-300 group">
                    <ShoppingCart className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </>
              ) : (
                /* Show Login Button when not authenticated */
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogin} 
                  className="flex items-center space-x-2 bg-white text-green-600 hover:bg-white/90 font-semibold mj-text px-3 py-2 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Entrar</span>
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-4 md:hidden">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 bg-white border-white/30 text-gray-800 placeholder-gray-500 mj-text"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10 p-0 btn-mj-primary"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Mobile User Info - Only show when authenticated */}
          {state.isAuthenticated && (
            <div className="mt-4 md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={state.user?.avatar} 
                        alt={state.user?.name}
                        className="w-8 h-8 rounded-full border-2 border-white/30"
                      />
                      <span className="text-sm text-white font-semibold mj-text">{state.user?.name}</span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/minha-conta" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Minha Conta</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/minha-conta/pedidos" className="flex items-center w-full">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Meus Pedidos</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/minha-conta/dados" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Meus Dados</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/minha-conta/endereco" className="flex items-center w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Endereço</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/minha-conta/carteira" className="flex items-center w-full">
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Carteira</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className={`border-t border-green-800/30 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 py-3">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/categoria/${category.slug}`}
                  className="py-3 md:py-2 text-white hover:text-green-300 transition-colors font-semibold mj-text relative group"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <Link
                to="/promocoes"
                className="py-3 md:py-2 text-green-300 hover:text-green-200 transition-colors font-bold mj-text relative group animate-pulse"
                onClick={() => setIsMenuOpen(false)}
              >
                🔥 Ofertas Especiais
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
