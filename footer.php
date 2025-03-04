
<footer class="bg-gray-50 pt-16 pb-8">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
            <!-- Logo and description -->
            <div class="md:col-span-1">
                <a href="index.php" class="inline-block">
                    <h3 class="text-xl font-semibold mb-4">Кроссы и точка</h3>
                </a>
                <p class="text-gray-600 mb-6 max-w-xs">
                    Магазин премиальной спортивной обуви для ценителей стиля и комфорта
                </p>
                <div class="flex space-x-4">
                    <a href="#" class="text-gray-600 hover:text-black transition-colors">
                        <i data-lucide="instagram" class="w-5 h-5"></i>
                    </a>
                    <a href="#" class="text-gray-600 hover:text-black transition-colors">
                        <i data-lucide="facebook" class="w-5 h-5"></i>
                    </a>
                    <a href="#" class="text-gray-600 hover:text-black transition-colors">
                        <i data-lucide="twitter" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>

            <!-- Quick links -->
            <div>
                <h4 class="font-semibold mb-6">Магазин</h4>
                <ul class="space-y-4">
                    <li>
                        <a href="index.php?page=catalog" class="text-gray-600 hover:text-black transition-colors">
                            Все кроссовки
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=catalog&brand=nike" class="text-gray-600 hover:text-black transition-colors">
                            Nike
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=catalog&brand=adidas" class="text-gray-600 hover:text-black transition-colors">
                            Adidas
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=catalog&brand=puma" class="text-gray-600 hover:text-black transition-colors">
                            Puma
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Company -->
            <div>
                <h4 class="font-semibold mb-6">Компания</h4>
                <ul class="space-y-4">
                    <li>
                        <a href="index.php?page=about" class="text-gray-600 hover:text-black transition-colors">
                            О нас
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=stores" class="text-gray-600 hover:text-black transition-colors">
                            Магазины
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=contact" class="text-gray-600 hover:text-black transition-colors">
                            Контакты
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=careers" class="text-gray-600 hover:text-black transition-colors">
                            Карьера
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Support -->
            <div>
                <h4 class="font-semibold mb-6">Клиентам</h4>
                <ul class="space-y-4">
                    <li>
                        <a href="index.php?page=help" class="text-gray-600 hover:text-black transition-colors">
                            Помощь
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=shipping" class="text-gray-600 hover:text-black transition-colors">
                            Доставка
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=returns" class="text-gray-600 hover:text-black transition-colors">
                            Возврат
                        </a>
                    </li>
                    <li>
                        <a href="index.php?page=size-guide" class="text-gray-600 hover:text-black transition-colors">
                            Размерная сетка
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="border-t border-gray-200 mt-12 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <p class="text-sm text-gray-500">
                    &copy; <?php echo date('Y'); ?> Кроссы и точка. Все права защищены.
                </p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="index.php?page=privacy" class="text-sm text-gray-500 hover:text-black transition-colors">
                        Конфиденциальность
                    </a>
                    <a href="index.php?page=terms" class="text-sm text-gray-500 hover:text-black transition-colors">
                        Условия использования
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>

<script>
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile menu functionality
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu && mobileMenuCloseBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.remove('translate-x-full');
            });
            
            mobileMenuCloseBtn.addEventListener('click', function() {
                mobileMenu.classList.add('translate-x-full');
            });
        }
        
        // Header scroll functionality
        const header = document.getElementById('header');
        if (header && <?php echo ($page === 'home') ? 'true' : 'false'; ?>) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.remove('bg-transparent');
                    header.classList.add('bg-white', 'shadow-sm', 'py-4');
                } else {
                    header.classList.add('bg-transparent', 'py-6');
                    header.classList.remove('bg-white', 'shadow-sm', 'py-4');
                }
            });
        }
    });
</script>
</body>
</html>
