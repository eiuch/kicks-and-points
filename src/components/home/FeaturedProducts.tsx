
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard, { Product } from '../products/ProductCard';

// Sample data for featured products
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 90',
    brand: 'Nike',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки',
    isNew: true
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 23',
    brand: 'Adidas',
    price: 16490,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  },
  {
    id: 3,
    name: 'Puma RS-X³',
    brand: 'Puma',
    price: 9990,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки',
    isSale: true,
    salePrice: 7990
  },
  {
    id: 4,
    name: 'New Balance 574',
    brand: 'New Balance',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  }
];

const FeaturedProducts = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="py-24 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="mb-4 text-balance">Популярные модели</h2>
            <p className="text-gray-600 max-w-2xl">
              Наши бестселлеры, которые выбирают ценители качества и стиля
            </p>
          </div>
          <Link
            to="/catalog"
            className="mt-4 md:mt-0 inline-flex items-center text-black hover:opacity-70 transition-opacity font-medium"
          >
            Смотреть все <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-1000 ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
