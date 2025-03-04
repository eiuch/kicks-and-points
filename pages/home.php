
<!-- Hero Section -->
<section class="relative h-screen min-h-[700px] max-h-[900px] flex items-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-cover bg-center"
            style="background-image: url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop')">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="container relative z-10">
        <div class="max-w-2xl">
            <div class="transition-all duration-1000 ease-out opacity-100 translate-y-0">
                <span class="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-6">
                    Новая коллекция 2023
                </span>
                <h1 class="text-white mb-6 leading-tight">
                    Стиль начинается с выбора идеальной пары
                </h1>
                <p class="text-white/80 text-lg mb-8 max-w-lg">
                    Откройте для себя премиальную коллекцию кроссовок от ведущих мировых брендов. Качество, стиль и комфорт в каждой паре.
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="index.php?page=catalog"
                        class="px-8 py-4 bg-white text-black font-medium rounded-full transition-all hover:shadow-xl hover:bg-gray-100 inline-flex items-center">
                        В каталог
                        <i data-lucide="arrow-right" class="ml-2 h-5 w-5"></i>
                    </a>
                    <a href="index.php?page=about"
                        class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full transition-all hover:bg-white/20">
                        О нас
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div class="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div class="w-1 h-3 bg-white rounded-full animate-bounce"></div>
        </div>
    </div>
</section>

<!-- Featured Products Section -->
<section class="py-24 overflow-hidden">
    <div class="container">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
                <h2 class="mb-4">Популярные модели</h2>
                <p class="text-gray-600 max-w-2xl">
                    Наши бестселлеры, которые выбирают ценители качества и стиля
                </p>
            </div>
            <a href="index.php?page=catalog"
                class="mt-4 md:mt-0 inline-flex items-center text-black hover:opacity-70 transition-opacity font-medium">
                Смотреть все <i data-lucide="arrow-right" class="ml-2 h-4 w-4"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-1000">
            <?php
            $featuredProducts = getAllProducts(['limit' => 4]);
            foreach ($featuredProducts as $product): 
            ?>
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
    </div>
</section>

<!-- Brand Section -->
<section class="py-20 bg-gray-50">
    <div class="container">
        <h2 class="text-center mb-12">Популярные бренды</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div class="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png" 
                    alt="Nike" class="h-12 object-contain" />
            </div>
            <div class="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png" 
                    alt="Adidas" class="h-12 object-contain" />
            </div>
            <div class="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Puma_Logo.svg/2560px-Puma_Logo.svg.png" 
                    alt="Puma" class="h-12 object-contain" />
            </div>
            <div class="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png" 
                    alt="New Balance" class="h-12 object-contain" />
            </div>
        </div>
    </div>
</section>

<!-- Newsletter Section -->
<section class="py-24">
    <div class="container">
        <div class="max-w-3xl mx-auto text-center">
            <h2 class="mb-4">Подпишитесь на рассылку</h2>
            <p class="text-gray-600 mb-8">
                Получайте уведомления о новых коллекциях и эксклюзивных предложениях
            </p>
            <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                    type="email"
                    placeholder="Ваш email"
                    class="px-4 py-3 rounded-md border border-gray-300 flex-grow"
                    required
                />
                <button
                    type="submit"
                    class="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                    Подписаться
                </button>
            </form>
        </div>
    </div>
</section>
