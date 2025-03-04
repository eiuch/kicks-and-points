
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ArrowUpDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { Product } from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';

// Sample products for catalog
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
  },
  {
    id: 5,
    name: 'Nike Dunk Low',
    brand: 'Nike',
    price: 11990,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  },
  {
    id: 6,
    name: 'Adidas Gazelle',
    brand: 'Adidas',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  },
  {
    id: 7,
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: 10990,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки',
    isSale: true,
    salePrice: 8990
  },
  {
    id: 8,
    name: 'Puma Suede Classic',
    brand: 'Puma',
    price: 7990,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  },
  {
    id: 9,
    name: 'Adidas Stan Smith',
    brand: 'Adidas',
    price: 9490,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  },
  {
    id: 10,
    name: 'Reebok Classic Leather',
    brand: 'Reebok',
    price: 7990,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки',
    isNew: true
  },
  {
    id: 11,
    name: 'Converse Chuck Taylor',
    brand: 'Converse',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  },
  {
    id: 12,
    name: 'New Balance 990',
    brand: 'New Balance',
    price: 17990,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  }
];

interface FilterState {
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    brands: [],
    sizes: [],
    colors: [],
    priceRange: [0, 30000]
  });
  const [sortBy, setSortBy] = useState<string>('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Check URL parameters for initial filter state
    const brandParam = searchParams.get('brand');
    
    if (brandParam) {
      setActiveFilters(prev => ({
        ...prev,
        brands: [brandParam.toLowerCase()]
      }));
    }
    
    // Initialize with all products
    setFilteredProducts(sampleProducts);
  }, [searchParams]);

  // Apply filters whenever activeFilters changes
  useEffect(() => {
    let result = [...sampleProducts];
    
    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      result = result.filter(product => 
        activeFilters.brands.includes(product.brand.toLowerCase())
      );
    }
    
    // Apply price range filter
    result = result.filter(product => {
      const priceToCheck = product.salePrice || product.price;
      return (
        priceToCheck >= activeFilters.priceRange[0] && 
        priceToCheck <= activeFilters.priceRange[1]
      );
    });
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceB - priceA;
      });
    }
    
    setFilteredProducts(result);
  }, [activeFilters, sortBy]);

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Navbar />
      <main className="pb-16 pt-32">
        {/* Page header */}
        <div className="bg-gray-50 py-10">
          <div className="container">
            <h1 className="mb-4">Каталог кроссовок</h1>
            <p className="text-gray-600 max-w-3xl">
              Широкий выбор кроссовок от ведущих мировых брендов. Найдите идеальную пару для занятий спортом или повседневной носки.
            </p>
          </div>
        </div>

        <div className="container mt-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Mobile filter dialog trigger */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button
                type="button"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Фильтры
              </button>

              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <select
                  className="text-sm border-none focus:ring-0"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                </select>
              </div>
            </div>

            {/* Sidebar with filters - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <ProductFilters 
                onApplyFilters={handleApplyFilters} 
              />
            </div>

            {/* Product grid */}
            <div className="lg:col-span-9">
              {/* Sort - Desktop */}
              <div className="hidden lg:flex justify-end mb-6">
                <div className="flex items-center">
                  <span className="mr-3 text-sm text-gray-500">Сортировать:</span>
                  <select
                    className="text-sm border-none focus:ring-0"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="default">По умолчанию</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                  </select>
                </div>
              </div>
              
              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-lg mb-2">Товары не найдены</h3>
                  <p className="text-gray-500">Попробуйте изменить параметры фильтрации</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Catalog;
