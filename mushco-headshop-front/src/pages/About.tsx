
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Sobre a Mush Co.</h1>
          
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              A Mush Co. nasceu da paixão por oferecer produtos de alta qualidade para quem valoriza 
              experiências autênticas e sofisticadas. Somos especialistas em acessórios premium que 
              combinam funcionalidade, design e durabilidade.
            </p>
            
            <p>
              Nossa missão é proporcionar aos nossos clientes uma experiência de compra única, 
              com produtos cuidadosamente selecionados e um atendimento diferenciado que vai além 
              das expectativas.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Nossos Valores</h2>
            
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-3"></span>
                <span><strong>Qualidade:</strong> Selecionamos apenas produtos que atendem aos mais altos padrões</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-3"></span>
                <span><strong>Confiança:</strong> Construímos relacionamentos duradouros baseados na transparência</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-3"></span>
                <span><strong>Inovação:</strong> Estamos sempre em busca dos produtos mais modernos do mercado</span>
              </li>
            </ul>
            
            <p>
              Seja você um conhecedor experiente ou alguém que está começando a explorar esse universo, 
              na Mush Co. você encontrará tudo o que precisa com a garantia de qualidade que você merece.
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default About;