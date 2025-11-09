
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                MC
              </div>
              <span className="text-xl font-bold text-purple-400">
                Mush Co.
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sua loja de confiança com os melhores produtos e preços do mercado. 
              Qualidade garantida e entrega rápida em todo o Brasil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">Links Rápidos</h3>
            <div className="space-y-2">
              <Link to="/sobre" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Sobre Nós
              </Link>
              <Link to="/contato" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contato
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/trocas-devolucoes" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Trocas e Devoluções
              </Link>
            </div>
          </div>

          {/* Categorias */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">Categorias</h3>
            <div className="space-y-2">
              <Link to="/categoria/bongs" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Bongs
              </Link>
              <Link to="/categoria/pipes" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Pipes
              </Link>
              <Link to="/categoria/sedas" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Sedas
              </Link>
              <Link to="/categoria/dichavadores" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Dichavadores
              </Link>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>contato@mushco.com</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400 mt-0.5" />
                <span>São Paulo, SP<br />Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Mush Co. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
