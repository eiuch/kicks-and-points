
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        {/* Hero section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className={`absolute inset-0 bg-black transition-opacity duration-[1.5s] ${loaded ? 'opacity-0' : 'opacity-100'}`}
            />
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=2070&auto=format&fit=crop)' }}
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
                  О нас
                </span>
                <h1 className="text-white mb-6 leading-tight">
                  Магазин "Кроссы и точка"
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-lg">
                  Мы создаем пространство, где каждый найдет идеальную пару кроссовок, отражающую индивидуальный стиль.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-6 block">
                Наша миссия
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Делаем спортивную моду доступной для всех
              </h2>
              <p className="text-lg text-gray-600">
                Мы стремимся предоставить нашим клиентам идеальное сочетание качества, стиля и комфорта, 
                предлагая тщательно отобранную коллекцию кроссовок от ведущих мировых брендов.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div 
                className="text-center p-6 rounded-lg transition-all hover:shadow-md"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Экспертный выбор</h3>
                <p className="text-gray-600">
                  Наши специалисты тщательно отбирают каждую модель, учитывая качество, комфорт и актуальные тренды.
                </p>
              </div>

              <div 
                className="text-center p-6 rounded-lg transition-all hover:shadow-md"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Подлинное качество</h3>
                <p className="text-gray-600">
                  Мы гарантируем оригинальность каждой пары кроссовок, сотрудничая напрямую с официальными производителями.
                </p>
              </div>

              <div 
                className="text-center p-6 rounded-lg transition-all hover:shadow-md"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Индивидуальный подход</h3>
                <p className="text-gray-600">
                  Наши консультанты помогут выбрать идеальную пару, учитывая все ваши потребности и предпочтения.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-6 block">
                Наша команда
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Влюбленные в свое дело
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                За каждой парой кроссовок стоит команда профессионалов, объединенных страстью к спортивной моде и стремлением к совершенству.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 overflow-hidden rounded-lg aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80" 
                    alt="Александр Иванов" 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Александр Иванов</h3>
                <p className="text-gray-600 mb-3">Основатель и CEO</p>
              </div>

              <div className="text-center">
                <div className="mb-4 overflow-hidden rounded-lg aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80" 
                    alt="Екатерина Смирнова" 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Екатерина Смирнова</h3>
                <p className="text-gray-600 mb-3">Директор по закупкам</p>
              </div>

              <div className="text-center">
                <div className="mb-4 overflow-hidden rounded-lg aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80" 
                    alt="Дмитрий Петров" 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Дмитрий Петров</h3>
                <p className="text-gray-600 mb-3">Главный стилист</p>
              </div>
            </div>
          </div>
        </section>

        {/* Store locations */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-6 block">
                Наши магазины
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Где нас найти
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Посетите наши розничные магазины, чтобы в комфортной обстановке выбрать идеальную пару кроссовок.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="rounded-lg overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&auto=format&fit=crop&q=80" 
                    alt="Магазин на Тверской" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold mb-2">ТЦ "Галерея" - Москва</h3>
                  <p className="text-gray-600 mb-4">
                    ул. Тверская, 15<br />
                    10:00 - 22:00 ежедневно
                  </p>
                  <a href="tel:+74951234567" className="text-black font-medium hover:underline">
                    +7 (495) 123-45-67
                  </a>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573292958756-46e1e6c681d8?w=800&auto=format&fit=crop&q=80" 
                    alt="Магазин на Невском" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold mb-2">ТРЦ "Атриум" - Санкт-Петербург</h3>
                  <p className="text-gray-600 mb-4">
                    Невский проспект, 80<br />
                    10:00 - 22:00 ежедневно
                  </p>
                  <a href="tel:+78121234567" className="text-black font-medium hover:underline">
                    +7 (812) 123-45-67
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
