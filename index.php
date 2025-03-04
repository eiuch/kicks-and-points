
<?php
// Database configuration
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'sneaker_shop');

// Initialize the session
session_start();

// Include utility functions
require_once "functions.php";

// Determine which page to load
$page = isset($_GET['page']) ? $_GET['page'] : 'home';

// Include header
include_once "header.php";

// Load the appropriate page
switch ($page) {
    case 'home':
        include_once "pages/home.php";
        break;
    case 'catalog':
        include_once "pages/catalog.php";
        break;
    case 'product':
        include_once "pages/product.php";
        break;
    case 'about':
        include_once "pages/about.php";
        break;
    default:
        include_once "pages/not_found.php";
        break;
}

// Include footer
include_once "footer.php";
?>
