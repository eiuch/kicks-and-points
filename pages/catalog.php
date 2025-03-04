
<?php
// Get filter parameters from URL
$brands = isset($_GET['brand']) ? (is_array($_GET['brand']) ? $_GET['brand'] : [$_GET['brand']]) : [];
$minPrice = isset($_GET['min_price']) ? intval($_GET['min_price']) : 0;
$maxPrice = isset($_GET['max_price']) ? intval($_GET['max_price']) : 30000;
$sortBy = isset($_GET['sort']) ? $_GET['sort'] : 'default';

// Prepare filters
$filters = [
    'brand' => $brands,
    'min_price' => $minPrice,
    'max_price' => $maxPrice,
    'sort' => $sortBy
];

// Get products based on filters
$products = getAllProducts($filters);

// Get all available brands for filter
$conn = connectDB();
$brandResult = $conn->query("SELECT DISTINCT brand FROM products ORDER BY brand");
$availableBrands = [];
if ($brandResult->num_rows > 0) {
    while ($row = $brandResult->fetch_assoc()) {
        $availableBrands[] = $row['brand'];
    }
}
$conn->close();
?>

<main class="pb-16 pt-32">
    <!-- Page header -->
    <div class="bg-gray-50 py-10">
        <div class="container">
            <h1 class="mb-4">Каталог кроссовок</h1>
            <p class="text-gray-600 max-w-3xl">
                Широкий выбор кроссовок от ведущих мировых брендов. Найдите идеальную пару для занятий спортом или повседневной носки.
            </p>
        </div>
    </div>

    <div class="container mt-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
            <!-- Mobile filter dialog trigger -->
            <div class="flex items-center justify-between mb-6 lg:hidden">
                <button
                    type="button"
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    id="mobile-filter-btn"
                >
                    <i data-lucide="filter" class="mr-2 h-4 w-4"></i>
                    Фильтры
                </button>

                <div class="flex items-center">
                    <i data-lucide="arrow-up-down" class="mr-2 h-4 w-4"></i>
                    <select
                        class="text-sm border-none"
                        onchange="window.location.href = updateURLParameter(window.location.href, 'sort', this.value)"
                    >
                        <option value="default" <?php echo $sortBy === 'default' ? 'selected' : ''; ?>>По умолчанию</option>
                        <option value="price-asc" <?php echo $sortBy === 'price-asc' ? 'selected' : ''; ?>>Сначала дешевле</option>
                        <option value="price-desc" <?php echo $sortBy === 'price-desc' ? 'selected' : ''; ?>>Сначала дороже</option>
                    </select>
                </div>
            </div>

            <!-- Sidebar with filters - Desktop -->
            <div class="hidden lg:block lg:col-span-3">
                <form action="index.php" method="get" id="filter-form">
                    <input type="hidden" name="page" value="catalog">
                    
                    <!-- Brands Filter -->
                    <div class="mb-8">
                        <h3 class="text-lg font-medium mb-4">Бренды</h3>
                        <div class="space-y-2">
                            <?php foreach ($availableBrands as $brand): ?>
                            <div class="flex items-center">
                                <input 
                                    type="checkbox" 
                                    id="brand-<?php echo strtolower($brand); ?>" 
                                    name="brand[]" 
                                    value="<?php echo $brand; ?>"
                                    <?php echo in_array($brand, $brands) ? 'checked' : ''; ?>
                                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                    onchange="document.getElementById('filter-form').submit();"
                                >
                                <label for="brand-<?php echo strtolower($brand); ?>" class="ml-2 text-sm text-gray-600">
                                    <?php echo $brand; ?>
                                </label>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <!-- Price Range -->
                    <div>
                        <h3 class="text-lg font-medium mb-4">Цена</h3>
                        <div class="space-y-4">
                            <div class="flex space-x-4">
                                <div class="w-1/2">
                                    <label for="min-price" class="block text-sm text-gray-600 mb-1">От</label>
                                    <input 
                                        type="number" 
                                        id="min-price" 
                                        name="min_price" 
                                        value="<?php echo $minPrice; ?>" 
                                        min="0" 
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-sm"
                                    >
                                </div>
                                <div class="w-1/2">
                                    <label for="max-price" class="block text-sm text-gray-600 mb-1">До</label>
                                    <input 
                                        type="number" 
                                        id="max-price" 
                                        name="max_price" 
                                        value="<?php echo $maxPrice; ?>" 
                                        min="0" 
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-sm"
                                    >
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                class="w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                Применить
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Product grid -->
            <div class="lg:col-span-9">
                <!-- Sort - Desktop -->
                <div class="hidden lg:flex justify-end mb-6">
                    <div class="flex items-center">
                        <span class="mr-3 text-sm text-gray-500">Сортировать:</span>
                        <select
                            class="text-sm border-none focus:ring-0"
                            onchange="window.location.href = updateURLParameter(window.location.href, 'sort', this.value)"
                        >
                            <option value="default" <?php echo $sortBy === 'default' ? 'selected' : ''; ?>>По умолчанию</option>
                            <option value="price-asc" <?php echo $sortBy === 'price-asc' ? 'selected' : ''; ?>>Сначала дешевле</option>
                            <option value="price-desc" <?php echo $sortBy === 'price-desc' ? 'selected' : ''; ?>>Сначала дороже</option>
                        </select>
                    </div>
                </div>
                
                <!-- Products -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <?php foreach ($products as $product): ?>
                    <a href="index.php?page=product&id=<?php echo $product['id']; ?>" class="group relative block overflow-hidden rounded-lg bg-white card-hover">
                        <!-- Image container -->
                        <div class="aspect-square overflow-hidden relative bg-gray-100">
                            <img
                                src="<?php echo $product['image']; ?>"
                                alt="<?php echo $product['name']; ?>"
                                class="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
                            />
                            
                            <!-- Badges -->
                            <div class="absolute top-3 left-3 flex flex-col gap-2">
                                <?php if ($product['is_new']): ?>
                                <span class="inline-block px-3 py-1 text-xs font-medium bg-black text-white rounded-full">
                                    Новинка
                                </span>
                                <?php endif; ?>
                                <?php if ($product['is_sale']): ?>
                                <span class="inline-block px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-full">
                                    Скидка
                                </span>
                                <?php endif; ?>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-4">
                            <div class="mb-1 text-sm text-gray-500"><?php echo $product['brand']; ?></div>
                            <h3 class="font-medium text-base mb-2 transition-colors group-hover:text-gray-700">
                                <?php echo $product['name']; ?>
                            </h3>
                            <div class="flex items-center">
                                <?php if ($product['is_sale'] && $product['sale_price'] > 0): ?>
                                <span class="font-semibold"><?php echo formatPrice($product['sale_price']); ?></span>
                                <span class="ml-2 text-sm text-gray-500 line-through">
                                    <?php echo formatPrice($product['price']); ?>
                                </span>
                                <?php else: ?>
                                <span class="font-semibold"><?php echo formatPrice($product['price']); ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                    </a>
                    <?php endforeach; ?>
                </div>

                <?php if (empty($products)): ?>
                <div class="text-center py-20">
                    <h3 class="text-lg mb-2">Товары не найдены</h3>
                    <p class="text-gray-500">Попробуйте изменить параметры фильтрации</p>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</main>

<!-- Mobile filter dialog -->
<div id="mobile-filter-dialog" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
    <div class="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-6 overflow-y-auto">
        <div class="flex items-center justify-between mb-5">
            <h2 class="text-lg font-medium">Фильтры</h2>
            <button id="close-filter-btn" class="text-gray-400 hover:text-gray-500">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        
        <form action="index.php" method="get">
            <input type="hidden" name="page" value="catalog">
            <input type="hidden" name="sort" value="<?php echo $sortBy; ?>">
            
            <!-- Brands Filter -->
            <div class="mb-8">
                <h3 class="font-medium mb-3">Бренды</h3>
                <div class="space-y-2">
                    <?php foreach ($availableBrands as $brand): ?>
                    <div class="flex items-center">
                        <input 
                            type="checkbox" 
                            id="mobile-brand-<?php echo strtolower($brand); ?>" 
                            name="brand[]" 
                            value="<?php echo $brand; ?>"
                            <?php echo in_array($brand, $brands) ? 'checked' : ''; ?>
                            class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        >
                        <label for="mobile-brand-<?php echo strtolower($brand); ?>" class="ml-2 text-sm text-gray-600">
                            <?php echo $brand; ?>
                        </label>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Price Range -->
            <div class="mb-8">
                <h3 class="font-medium mb-3">Цена</h3>
                <div class="space-y-4">
                    <div class="flex space-x-4">
                        <div class="w-1/2">
                            <label for="mobile-min-price" class="block text-sm text-gray-600 mb-1">От</label>
                            <input 
                                type="number" 
                                id="mobile-min-price" 
                                name="min_price" 
                                value="<?php echo $minPrice; ?>" 
                                min="0" 
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-sm"
                            >
                        </div>
                        <div class="w-1/2">
                            <label for="mobile-max-price" class="block text-sm text-gray-600 mb-1">До</label>
                            <input 
                                type="number" 
                                id="mobile-max-price" 
                                name="max_price" 
                                value="<?php echo $maxPrice; ?>" 
                                min="0" 
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-sm"
                            >
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="space-x-4 flex">
                <button 
                    type="submit" 
                    class="flex-1 bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Применить
                </button>
                <a 
                    href="index.php?page=catalog" 
                    class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium text-center hover:bg-gray-300 transition-colors"
                >
                    Сбросить
                </a>
            </div>
        </form>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Mobile filters
    const mobileFilterBtn = document.getElementById('mobile-filter-btn');
    const mobileFilterDialog = document.getElementById('mobile-filter-dialog');
    const closeFilterBtn = document.getElementById('close-filter-btn');
    
    if (mobileFilterBtn && mobileFilterDialog && closeFilterBtn) {
        mobileFilterBtn.addEventListener('click', function() {
            mobileFilterDialog.classList.remove('hidden');
        });
        
        closeFilterBtn.addEventListener('click', function() {
            mobileFilterDialog.classList.add('hidden');
        });
    }
    
    // Helper function to update URL parameters
    window.updateURLParameter = function(url, param, value) {
        var regex = new RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))'),
            qstring = /\?.+$/;
        
        var newUrl = url;
        if (value) {
            if (url.match(regex)) {
                newUrl = url.replace(regex, '$1' + param + '=' + value);
            } else if (url.match(qstring)) {
                newUrl = url + '&' + param + '=' + value;
            } else {
                newUrl = url + '?' + param + '=' + value;
            }
        }
        
        return newUrl;
    };
});
</script>
