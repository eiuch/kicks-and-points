
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] max-h-[900px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-[1.5s] ${loaded ? 'opacity-0' : 'opacity-100'}`}
        />
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl" data-aos="fade-up">
          <div 
            className={`transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-6">
              Новая коллекция 2023
            </span>
            <h1 className="text-white mb-6 leading-tight">
              Стиль начинается с выбора идеальной пары
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-lg">
              Откройте для себя премиальную коллекцию кроссовок от ведущих мировых брендов. Качество, стиль и комфорт в каждой паре.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="px-8 py-4 bg-white text-black font-medium rounded-full transition-all hover:shadow-xl hover:bg-gray-100 inline-flex items-center"
              >
                В каталог
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full transition-all hover:bg-white/20"
              >
                О нас
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div 
          className={`w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-1 h-3 bg-white rounded-full animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
