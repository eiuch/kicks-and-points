
<?php
// Get product ID from URL
$productId = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Get product details
$product = getProductById($productId);

// If product not found, show error
if (!$product) {
    echo '<main class="container py-32">
            <div class="text-center py-20">
                <h2 class="text-2xl mb-4">Товар не найден</h2>
                <a href="index.php?page=catalog" class="text-black underline hover:opacity-70">
                    Вернуться в каталог
                </a>
            </div>
        </main>';
    return;
}

// Get similar products
$similarProducts = getSimilarProducts($productId, $product['brand'], $product['category']);

// Available sizes (would typically come from a database)
$availableSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
?>

<main class="pt-32 pb-16">
    <div class="container">
        <!-- Breadcrumbs -->
        <nav class="mb-8">
            <a href="index.php?page=catalog" class="flex items-center text-gray-600 hover:text-black">
                <i data-lucide="arrow-left" class="mr-2 h-4 w-4"></i> Назад в каталог
            </a>
        </nav>

        <!-- Product details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <!-- Product image -->
            <div class="rounded-xl overflow-hidden relative aspect-square bg-gray-100">
                <img
                    src="<?php echo $product['image']; ?>"
                    alt="<?php echo $product['name']; ?>"
                    class="w-full h-full object-cover"
                />
                <?php if ($product['is_new']): ?>
                <span class="absolute top-4 left-4 bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                    Новинка
                </span>
                <?php endif; ?>
                <?php if ($product['is_sale']): ?>
                <span class="absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Скидка
                </span>
                <?php endif; ?>
            </div>

            <!-- Product info -->
            <div>
                <div class="mb-6">
                    <div class="text-gray-600 mb-2"><?php echo $product['brand']; ?></div>
                    <h1 class="text-3xl font-semibold mb-4"><?php echo $product['name']; ?></h1>
                    <div class="flex items-center mb-6">
                        <?php if ($product['is_sale'] && $product['sale_price'] > 0): ?>
                        <span class="text-2xl font-semibold"><?php echo formatPrice($product['sale_price']); ?></span>
                        <span class="ml-3 text-gray-500 line-through">
                            <?php echo formatPrice($product['price']); ?>
                        </span>
                        <?php else: ?>
                        <span class="text-2xl font-semibold"><?php echo formatPrice($product['price']); ?></span>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Size selector -->
                <form action="index.php?page=cart" method="post">
                    <input type="hidden" name="product_id" value="<?php echo $product['id']; ?>">
                    <input type="hidden" name="action" value="add">
                    
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-medium">Размер</h3>
                            <a href="index.php?page=size-guide" class="text-sm underline text-gray-600 hover:text-black">
                                Размерная сетка
                            </a>
                        </div>
                        <div class="grid grid-cols-5 gap-2">
                            <?php foreach ($availableSizes as $size): ?>
                            <label class="size-label">
                                <input type="radio" name="size" value="<?php echo $size; ?>" class="sr-only" required>
                                <div class="py-3 border border-gray-300 rounded-md text-center transition-all hover:border-gray-900 cursor-pointer">
                                    <?php echo $size; ?>
                                </div>
                            </label>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <!-- Quantity selector -->
                    <div class="mb-8">
                        <h3 class="font-medium mb-2">Количество</h3>
                        <div class="flex items-center border border-gray-300 rounded-md w-32">
                            <button
                                type="button"
                                class="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                onclick="adjustQuantity(-1)"
                            >
                                -
                            </button>
                            <input type="number" name="quantity" value="1" min="1" max="10" class="flex-1 text-center border-none focus:ring-0" id="quantity-input" readonly>
                            <button
                                type="button" 
                                class="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                onclick="adjustQuantity(1)"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 mb-8">
                        <button
                            type="submit"
                            class="flex-1 bg-black text-white py-4 px-6 rounded-full font-medium flex items-center justify-center hover:bg-gray-800 transition-colors"
                        >
                            <i data-lucide="shopping-bag" class="mr-2 h-5 w-5"></i> Добавить в корзину
                        </button>
                        <button
                            type="button"
                            class="sm:flex-none py-4 px-6 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-900 transition-colors"
                            onclick="addToWishlist(<?php echo $product['id']; ?>)"
                        >
                            <i data-lucide="heart" class="h-5 w-5"></i>
                        </button>
                    </div>
                </form>

                <!-- Product tabs -->
                <div class="border-t border-gray-200">
                    <button
                        class="w-full py-4 flex justify-between items-center text-left font-medium tab-trigger"
                        data-tab="description"
                    >
                        <span>Описание</span>
                        <i data-lucide="chevron-down" class="h-5 w-5 tab-icon"></i>
                    </button>
                    <div class="pb-4 text-gray-600 hidden tab-content" id="description-content">
                        <p>
                            Представляем <?php echo $product['name']; ?> - инновационные кроссовки от <?php echo $product['brand']; ?>, 
                            сочетающие стиль и комфорт. Они идеально подходят для повседневной носки 
                            и спортивных активностей благодаря амортизирующей подошве и дышащему 
                            верху из высококачественных материалов.
                        </p>
                    </div>
                    
                    <div class="border-t border-gray-200">
                        <button
                            class="w-full py-4 flex justify-between items-center text-left tab-trigger"
                            data-tab="delivery"
                        >
                            <span>Доставка и возврат</span>
                            <i data-lucide="chevron-down" class="h-5 w-5 tab-icon"></i>
                        </button>
                        <div class="pb-4 text-gray-600 hidden tab-content" id="delivery-content">
                            <p>
                                Доставка по Москве: 1-2 дня<br />
                                Доставка по России: 3-7 дней<br />
                                Бесплатная доставка при заказе от 5000 ₽<br />
                                Возврат в течение 14 дней
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Similar products -->
        <?php if (!empty($similarProducts)): ?>
        <section class="mt-20">
            <h2 class="text-2xl font-semibold mb-8">Похожие товары</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <?php foreach ($similarProducts as $similarProduct): ?>
                <a href="index.php?page=product&id=<?php echo $similarProduct['id']; ?>" class="group relative block overflow-hidden rounded-lg bg-white card-hover">
                    <!-- Image container -->
                    <div class="aspect-square overflow-hidden relative bg-gray-100">
                        <img
                            src="<?php echo $similarProduct['image']; ?>"
                            alt="<?php echo $similarProduct['name']; ?>"
                            class="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
                        />
                        
                        <!-- Badges -->
                        <div class="absolute top-3 left-3 flex flex-col gap-2">
                            <?php if ($similarProduct['is_new']): ?>
                            <span class="inline-block px-3 py-1 text-xs font-medium bg-black text-white rounded-full">
                                Новинка
                            </span>
                            <?php endif; ?>
                            <?php if ($similarProduct['is_sale']): ?>
                            <span class="inline-block px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-full">
                                Скидка
                            </span>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-4">
                        <div class="mb-1 text-sm text-gray-500"><?php echo $similarProduct['brand']; ?></div>
                        <h3 class="font-medium text-base mb-2 transition-colors group-hover:text-gray-700">
                            <?php echo $similarProduct['name']; ?>
                        </h3>
                        <div class="flex items-center">
                            <?php if ($similarProduct['is_sale'] && $similarProduct['sale_price'] > 0): ?>
                            <span class="font-semibold"><?php echo formatPrice($similarProduct['sale_price']); ?></span>
                            <span class="ml-2 text-sm text-gray-500 line-through">
                                <?php echo formatPrice($similarProduct['price']); ?>
                            </span>
                            <?php else: ?>
                            <span class="font-semibold"><?php echo formatPrice($similarProduct['price']); ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                </a>
                <?php endforeach; ?>
            </div>
        </section>
        <?php endif; ?>
    </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId + '-content');
            
            if (tabContent.classList.contains('hidden')) {
                // Open this tab
                tabContent.classList.remove('hidden');
                this.classList.add('font-medium');
                this.querySelector('.tab-icon').setAttribute('data-lucide', 'chevron-up');
            } else {
                // Close this tab
                tabContent.classList.add('hidden');
                this.classList.remove('font-medium');
                this.querySelector('.tab-icon').setAttribute('data-lucide', 'chevron-down');
            }
            
            // Re-render icons
            lucide.createIcons();
        });
    });
    
    // Size selector functionality
    const sizeLabels = document.querySelectorAll('.size-label');
    sizeLabels.forEach(label => {
        const input = label.querySelector('input');
        const div = label.querySelector('div');
        
        input.addEventListener('change', function() {
            // Remove selected class from all
            sizeLabels.forEach(l => {
                l.querySelector('div').classList.remove('border-black', 'bg-black', 'text-white');
            });
            
            // Add selected class to this one
            if (this.checked) {
                div.classList.add('border-black', 'bg-black', 'text-white');
            }
        });
    });
    
    // Quantity adjustment
    window.adjustQuantity = function(delta) {
        const input = document.getElementById('quantity-input');
        let value = parseInt(input.value) + delta;
        
        if (value >= 1 && value <= 10) {
            input.value = value;
        }
    };
    
    // Wishlist functionality (would typically connect to a server action)
    window.addToWishlist = function(productId) {
        alert('Товар добавлен в избранное');
    };
});
</script>
