
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        
        {/* Brand Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-center mb-12">Популярные бренды</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png" 
                  alt="Nike" className="h-12 object-contain" />
              </div>
              <div className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png" 
                  alt="Adidas" className="h-12 object-contain" />
              </div>
              <div className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Puma_Logo.svg/2560px-Puma_Logo.svg.png" 
                  alt="Puma" className="h-12 object-contain" />
              </div>
              <div className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png" 
                  alt="New Balance" className="h-12 object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-4">Подпишитесь на рассылку</h2>
              <p className="text-gray-600 mb-8">
                Получайте уведомления о новых коллекциях и эксклюзивных предложениях
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="px-4 py-3 rounded-md border border-gray-300 flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
