
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-semibold mb-4">Кроссы и точка</h3>
            </Link>
            <p className="text-gray-600 mb-6 max-w-xs">
              Магазин премиальной спортивной обуви для ценителей стиля и комфорта
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-6">Магазин</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/catalog" className="text-gray-600 hover:text-black transition-colors">
                  Все кроссовки
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=nike" className="text-gray-600 hover:text-black transition-colors">
                  Nike
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=adidas" className="text-gray-600 hover:text-black transition-colors">
                  Adidas
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=puma" className="text-gray-600 hover:text-black transition-colors">
                  Puma
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6">Компания</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-black transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-600 hover:text-black transition-colors">
                  Магазины
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-black transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-black transition-colors">
                  Карьера
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6">Клиентам</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-black transition-colors">
                  Помощь
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-black transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-black transition-colors">
                  Возврат
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-600 hover:text-black transition-colors">
                  Размерная сетка
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Кроссы и точка. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">
                Конфиденциальность
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-black transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
