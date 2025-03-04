
<?php
// Database connection function
function connectDB() {
    $connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    
    // Check connection
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    
    // Set charset to ensure proper handling of Cyrillic characters
    $connection->set_charset("utf8mb4");
    
    return $connection;
}

// Function to get all products
function getAllProducts($filters = []) {
    $conn = connectDB();
    
    $sql = "SELECT * FROM products WHERE 1=1";
    
    // Apply filters if any
    if (!empty($filters['brand'])) {
        $brands = implode("','", array_map([$conn, 'real_escape_string'], $filters['brand']));
        $sql .= " AND brand IN ('$brands')";
    }
    
    if (!empty($filters['min_price'])) {
        $minPrice = $conn->real_escape_string($filters['min_price']);
        $sql .= " AND (sale_price > 0 AND sale_price >= $minPrice OR sale_price = 0 AND price >= $minPrice)";
    }
    
    if (!empty($filters['max_price'])) {
        $maxPrice = $conn->real_escape_string($filters['max_price']);
        $sql .= " AND (sale_price > 0 AND sale_price <= $maxPrice OR sale_price = 0 AND price <= $maxPrice)";
    }
    
    // Add sorting
    if (!empty($filters['sort'])) {
        switch ($filters['sort']) {
            case 'price-asc':
                $sql .= " ORDER BY CASE WHEN sale_price > 0 THEN sale_price ELSE price END ASC";
                break;
            case 'price-desc':
                $sql .= " ORDER BY CASE WHEN sale_price > 0 THEN sale_price ELSE price END DESC";
                break;
            default:
                $sql .= " ORDER BY id ASC";
        }
    } else {
        $sql .= " ORDER BY id ASC";
    }
    
    $result = $conn->query($sql);
    $products = [];
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }
    
    $conn->close();
    return $products;
}

// Function to get product by ID
function getProductById($id) {
    $conn = connectDB();
    
    $id = $conn->real_escape_string($id);
    $sql = "SELECT * FROM products WHERE id = $id";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
    } else {
        $product = null;
    }
    
    $conn->close();
    return $product;
}

// Function to get similar products
function getSimilarProducts($productId, $brand, $category, $limit = 4) {
    $conn = connectDB();
    
    $productId = $conn->real_escape_string($productId);
    $brand = $conn->real_escape_string($brand);
    $category = $conn->real_escape_string($category);
    
    $sql = "SELECT * FROM products 
            WHERE id != $productId 
            AND (brand = '$brand' OR category = '$category') 
            LIMIT $limit";
    
    $result = $conn->query($sql);
    $products = [];
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }
    
    $conn->close();
    return $products;
}

// Function to format price in Russian locale
function formatPrice($price) {
    return number_format($price, 0, ',', ' ') . ' ₽';
}
?>
