
import { useState } from 'react';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (id: string) => void;
}

interface ProductFiltersProps {
  className?: string;
  onApplyFilters: (filters: FilterState) => void;
}

interface FilterState {
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

const FilterSection = ({ title, options, selectedOptions, onChange }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 pb-6">
      <button 
        className="flex w-full items-center justify-between py-3 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-medium">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {isOpen && (
        <div className="mt-2 space-y-3">
          {options.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name={option.id}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                checked={selectedOptions.includes(option.id)}
                onChange={() => onChange(option.id)}
              />
              <label htmlFor={option.id} className="ml-3 text-sm text-gray-600 cursor-pointer">
                {option.label}
                {option.count !== undefined && (
                  <span className="ml-1 text-gray-400">({option.count})</span>
                )}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductFilters = ({ className, onApplyFilters }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    sizes: [],
    colors: [],
    priceRange: [0, 30000]
  });

  const brandOptions: FilterOption[] = [
    { id: 'nike', label: 'Nike', count: 42 },
    { id: 'adidas', label: 'Adidas', count: 36 },
    { id: 'puma', label: 'Puma', count: 28 },
    { id: 'new-balance', label: 'New Balance', count: 14 },
    { id: 'reebok', label: 'Reebok', count: 18 }
  ];

  const sizeOptions: FilterOption[] = [
    { id: '36', label: '36' },
    { id: '37', label: '37' },
    { id: '38', label: '38' },
    { id: '39', label: '39' },
    { id: '40', label: '40' },
    { id: '41', label: '41' },
    { id: '42', label: '42' },
    { id: '43', label: '43' },
    { id: '44', label: '44' },
    { id: '45', label: '45' }
  ];

  const colorOptions: FilterOption[] = [
    { id: 'black', label: 'Черный' },
    { id: 'white', label: 'Белый' },
    { id: 'red', label: 'Красный' },
    { id: 'blue', label: 'Синий' },
    { id: 'green', label: 'Зеленый' }
  ];

  const toggleOption = (id: string, category: keyof FilterState) => {
    setFilters(prev => {
      const array = prev[category] as string[];
      const newArray = array.includes(id)
        ? array.filter(item => item !== id)
        : [...array, id];
      
      return {
        ...prev,
        [category]: newArray
      };
    });
  };

  const handlePriceChange = (index: number, value: number) => {
    setFilters(prev => {
      const newRange = [...prev.priceRange] as [number, number];
      newRange[index] = value;
      
      // Ensure min <= max
      if (index === 0 && value > newRange[1]) {
        newRange[1] = value;
      } else if (index === 1 && value < newRange[0]) {
        newRange[0] = value;
      }
      
      return {
        ...prev,
        priceRange: newRange
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      brands: [],
      sizes: [],
      colors: [],
      priceRange: [0, 30000]
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Фильтры
        </button>
      </div>

      {/* Mobile filter dialog */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex transform transition-transform ease-in-out duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
          <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Фильтры</h2>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 mt-4">
            {/* Filter sections */}
            <FilterSection
              title="Бренд"
              options={brandOptions}
              selectedOptions={filters.brands}
              onChange={(id) => toggleOption(id, 'brands')}
            />
            
            <FilterSection
              title="Размер"
              options={sizeOptions}
              selectedOptions={filters.sizes}
              onChange={(id) => toggleOption(id, 'sizes')}
            />
            
            <FilterSection
              title="Цвет"
              options={colorOptions}
              selectedOptions={filters.colors}
              onChange={(id) => toggleOption(id, 'colors')}
            />

            {/* Price range filter */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between py-3">
                <h3 className="text-base font-medium">Цена</h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="100000"
                    className="w-full rounded-md border-gray-300 p-2 text-sm"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                    placeholder="От"
                  />
                  <span>до</span>
                  <input
                    type="number"
                    min="0"
                    max="100000"
                    className="w-full rounded-md border-gray-300 p-2 text-sm"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                    placeholder="До"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={resetFilters}
              >
                Сбросить
              </button>
              <button
                type="button"
                className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                onClick={applyFilters}
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <FilterSection
          title="Бренд"
          options={brandOptions}
          selectedOptions={filters.brands}
          onChange={(id) => toggleOption(id, 'brands')}
        />
        
        <FilterSection
          title="Размер"
          options={sizeOptions}
          selectedOptions={filters.sizes}
          onChange={(id) => toggleOption(id, 'sizes')}
        />
        
        <FilterSection
          title="Цвет"
          options={colorOptions}
          selectedOptions={filters.colors}
          onChange={(id) => toggleOption(id, 'colors')}
        />

        {/* Price range filter */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between py-3">
            <h3 className="text-base font-medium">Цена</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="100000"
                className="w-full rounded-md border-gray-300 p-2 text-sm"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                placeholder="От"
              />
              <span>до</span>
              <input
                type="number"
                min="0"
                max="100000"
                className="w-full rounded-md border-gray-300 p-2 text-sm"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                placeholder="До"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={resetFilters}
          >
            Сбросить
          </button>
          <button
            type="button"
            className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            onClick={applyFilters}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
