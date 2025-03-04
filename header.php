
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Кроссы и точка | <?php echo ucfirst($page); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out <?php echo ($page === 'home') ? 'bg-transparent py-6' : 'bg-white shadow-sm py-4'; ?>" id="header">
        <div class="container mx-auto px-4 flex items-center justify-between">
            <!-- Logo -->
            <a href="index.php" class="text-2xl font-bold tracking-tight relative z-10">
                <span>Кроссы и точка</span>
            </a>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center space-x-10">
                <a href="index.php" class="font-medium text-base hover:opacity-70 transition-opacity <?php echo ($page === 'home') ? 'text-black' : 'text-gray-600'; ?>">
                    Главная
                </a>
                <a href="index.php?page=catalog" class="font-medium text-base hover:opacity-70 transition-opacity <?php echo ($page === 'catalog') ? 'text-black' : 'text-gray-600'; ?>">
                    Каталог
                </a>
                <a href="index.php?page=about" class="font-medium text-base hover:opacity-70 transition-opacity <?php echo ($page === 'about') ? 'text-black' : 'text-gray-600'; ?>">
                    О нас
                </a>
            </nav>

            <!-- Icons -->
            <div class="hidden md:flex items-center space-x-4">
                <button class="p-2 rounded-full transition-colors hover:bg-gray-100">
                    <i data-lucide="search" class="w-5 h-5"></i>
                </button>
                <button class="p-2 rounded-full transition-colors hover:bg-gray-100 relative">
                    <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                    <span class="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                        0
                    </span>
                </button>
            </div>

            <!-- Mobile menu button -->
            <button id="mobile-menu-btn" class="p-2 md:hidden rounded-full hover:bg-gray-100">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>

            <!-- Mobile menu -->
            <div id="mobile-menu" class="fixed inset-0 bg-white z-40 flex flex-col p-10 transform transition-transform duration-300 ease-in-out md:hidden translate-x-full">
                <button id="mobile-menu-close" class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
                <div class="flex flex-col space-y-8 mt-16">
                    <a href="index.php" class="text-2xl font-medium transition-opacity <?php echo ($page === 'home') ? 'text-black' : 'text-gray-600'; ?>">
                        Главная
                    </a>
                    <a href="index.php?page=catalog" class="text-2xl font-medium transition-opacity <?php echo ($page === 'catalog') ? 'text-black' : 'text-gray-600'; ?>">
                        Каталог
                    </a>
                    <a href="index.php?page=about" class="text-2xl font-medium transition-opacity <?php echo ($page === 'about') ? 'text-black' : 'text-gray-600'; ?>">
                        О нас
                    </a>
                    <div class="flex space-x-4 mt-4">
                        <button class="p-2 rounded-full hover:bg-gray-100">
                            <i data-lucide="search" class="w-6 h-6"></i>
                        </button>
                        <button class="p-2 rounded-full hover:bg-gray-100 relative">
                            <i data-lucide="shopping-bag" class="w-6 h-6"></i>
                            <span class="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
