
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { id, name, brand, price, image, isNew, isSale, salePrice } = product;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        'group relative block overflow-hidden rounded-lg bg-white card-hover',
        className
      )}
    >
      {/* Image container */}
      <div className="aspect-square overflow-hidden relative bg-gray-100">
        {!imageLoaded && <div className="absolute inset-0 img-loading"></div>}
        <img
          src={image}
          alt={name}
          onLoad={handleImageLoad}
          className={cn(
            'object-cover w-full h-full transition-all duration-500 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-black text-white rounded-full">
              Новинка
            </span>
          )}
          {isSale && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-full">
              Скидка
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1 text-sm text-gray-500">{brand}</div>
        <h3 className="font-medium text-base mb-2 transition-colors group-hover:text-gray-700">
          {name}
        </h3>
        <div className="flex items-center">
          {isSale && salePrice ? (
            <>
              <span className="font-semibold">{salePrice.toLocaleString('ru-RU')} ₽</span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                {price.toLocaleString('ru-RU')} ₽
              </span>
            </>
          ) : (
            <span className="font-semibold">{price.toLocaleString('ru-RU')} ₽</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
