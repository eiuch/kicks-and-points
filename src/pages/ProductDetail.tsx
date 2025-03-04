
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { Product } from '@/components/products/ProductCard';
import { toast } from '@/components/ui/use-toast';

// Sample products including the detail one
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 90',
    brand: 'Nike',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&auto=format&fit=crop&q=80',
    category: 'Кроссовки',
    isNew: true
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 23',
    brand: 'Adidas',
    price: 16490,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  },
  {
    id: 3,
    name: 'Puma RS-X³',
    brand: 'Puma',
    price: 9990,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
    category: 'Кроссовки',
    isSale: true,
    salePrice: 7990
  },
  {
    id: 4,
    name: 'New Balance 574',
    brand: 'New Balance',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80',
    category: 'Кроссовки'
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const availableSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  useEffect(() => {
    // Find product by id
    const foundProduct = sampleProducts.find(p => p.id.toString() === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find similar products (same brand or category)
      const similar = sampleProducts
        .filter(p => p.id !== foundProduct.id)
        .filter(p => p.brand === foundProduct.brand || p.category === foundProduct.category)
        .slice(0, 4);
      
      setSimilarProducts(similar);
    }
    
    // Reset state when product changes
    setSelectedSize(null);
    setQuantity(1);
    setImageLoaded(false);
  }, [id]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Пожалуйста, выберите размер",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Товар добавлен в корзину",
      description: `${product?.name} добавлен в корзину. Количество: ${quantity}`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Товар добавлен в избранное",
      description: `${product?.name} добавлен в список желаний`,
    });
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="container py-32">
          <div className="text-center py-20">
            <h2 className="text-2xl mb-4">Товар не найден</h2>
            <Link to="/catalog" className="text-black underline hover:opacity-70">
              Вернуться в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <Link to="/catalog" className="flex items-center text-gray-600 hover:text-black">
              <ArrowLeft className="mr-2 h-4 w-4" /> Назад в каталог
            </Link>
          </nav>

          {/* Product details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product image */}
            <div className="rounded-xl overflow-hidden relative aspect-square bg-gray-100">
              {!imageLoaded && <div className="absolute inset-0 img-loading"></div>}
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                  Новинка
                </span>
              )}
              {product.isSale && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Скидка
                </span>
              )}
            </div>

            {/* Product info */}
            <div>
              <div className="mb-6">
                <div className="text-gray-600 mb-2">{product.brand}</div>
                <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
                <div className="flex items-center mb-6">
                  {product.isSale && product.salePrice ? (
                    <>
                      <span className="text-2xl font-semibold">{product.salePrice.toLocaleString('ru-RU')} ₽</span>
                      <span className="ml-3 text-gray-500 line-through">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-semibold">{product.price.toLocaleString('ru-RU')} ₽</span>
                  )}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Размер</h3>
                  <Link to="/size-guide" className="text-sm underline text-gray-600 hover:text-black">
                    Размерная сетка
                  </Link>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`py-3 border rounded-md text-center transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-900'
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Количество</h3>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button
                    className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-4 px-6 rounded-full font-medium flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" /> Добавить в корзину
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="sm:flex-none py-4 px-6 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-900 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Product tabs */}
              <div className="border-t border-gray-200">
                <button
                  className={`w-full py-4 flex justify-between items-center text-left ${
                    activeTab === 'description' ? 'font-medium' : ''
                  }`}
                  onClick={() => setActiveTab(activeTab === 'description' ? '' : 'description')}
                >
                  <span>Описание</span>
                  {activeTab === 'description' ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {activeTab === 'description' && (
                  <div className="pb-4 text-gray-600">
                    <p>
                      Представляем {product.name} - инновационные кроссовки от {product.brand}, 
                      сочетающие стиль и комфорт. Они идеально подходят для повседневной носки 
                      и спортивных активностей благодаря амортизирующей подошве и дышащему 
                      верху из высококачественных материалов.
                    </p>
                  </div>
                )}
                
                <div className="border-t border-gray-200">
                  <button
                    className={`w-full py-4 flex justify-between items-center text-left ${
                      activeTab === 'delivery' ? 'font-medium' : ''
                    }`}
                    onClick={() => setActiveTab(activeTab === 'delivery' ? '' : 'delivery')}
                  >
                    <span>Доставка и возврат</span>
                    {activeTab === 'delivery' ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {activeTab === 'delivery' && (
                    <div className="pb-4 text-gray-600">
                      <p>
                        Доставка по Москве: 1-2 дня<br />
                        Доставка по России: 3-7 дней<br />
                        Бесплатная доставка при заказе от 5000 ₽<br />
                        Возврат в течение 14 дней
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar products */}
          {similarProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-semibold mb-8">Похожие товары</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
