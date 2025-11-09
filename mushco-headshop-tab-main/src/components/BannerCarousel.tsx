
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, Star, Flame } from 'lucide-react';
import { Button } from './ui/button';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Slides serão carregados da API
  const [slides, setSlides] = useState([]);

  // TODO: Implementar carregamento de slides da API
  useEffect(() => {
    // Aqui será feita a chamada para a API para carregar os slides
    // Por enquanto, usando slides vazios até conectar com a API
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative h-80 md:h-96 lg:h-[28rem] overflow-hidden rounded-2xl mj-card shadow-2xl"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {slides.length > 0 ? slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className={`relative w-full h-full bg-gradient-to-br ${slide.gradient}`}>
            {/* Professional texture overlay */}
            <div className="absolute inset-0 bg-black/10"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-mj-float" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-32 right-16 w-24 h-24 bg-white/5 rounded-full animate-mj-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white/5 rounded-full animate-mj-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 flex items-center justify-center h-full px-8">
              <div className="text-center text-white space-y-6 max-w-4xl">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Flame className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <Star className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <Zap className="w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mj-glow-white tracking-wider mj-title">
                  {slide.title}
                </h1>
                
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold opacity-90 mj-text">
                  {slide.subtitle}
                </h2>
                
                <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-medium mj-body-text">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <Link to={slide.link}>
                    <Button className="btn-mj-secondary bg-white text-green-600 text-lg md:text-xl px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link to="/promocoes">
                    <Button className="btn-mj-primary text-lg px-6 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl">
                      🌿 VER OFERTAS
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Professional shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-full animate-mj-shimmer"></div>
          </div>
        </div>
      )) : (
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800">
          <div className="relative z-10 flex items-center justify-center h-full px-8">
            <div className="text-center text-white space-y-6 max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mj-glow-white tracking-wider mj-title">
                CARREGANDO...
              </h1>
              <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-medium mj-body-text">
                Preparando as melhores ofertas para você
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons - só mostrar se houver slides */}
      {slides.length > 0 && (
        <>
          <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-green-600/70 text-white rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-green-600/70 text-white rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8 shadow-lg' 
                : 'bg-white/40 hover:bg-white/60 w-3'
            }`}
          />
        ))}
      </div>
        </>
      )}

      {/* Progress bar - só mostrar se houver slides */}
      {slides.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-4000 ease-linear"
            style={{ 
              width: isPlaying ? '100%' : '0%',
              transition: isPlaying ? 'width 4s linear' : 'none'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
