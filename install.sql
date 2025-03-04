
-- Create database
CREATE DATABASE IF NOT EXISTS sneaker_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sneaker_shop;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2) DEFAULT 0,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    is_new BOOLEAN DEFAULT FALSE,
    is_sale BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, brand, price, sale_price, image, category, is_new, is_sale) VALUES
('Nike Air Max 90', 'Nike', 12990, 0, 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&auto=format&fit=crop&q=80', 'Кроссовки', TRUE, FALSE),
('Adidas Ultraboost 23', 'Adidas', 16490, 0, 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, FALSE),
('Puma RS-X³', 'Puma', 9990, 7990, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, TRUE),
('New Balance 574', 'New Balance', 8990, 0, 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, FALSE),
('Nike Dunk Low', 'Nike', 11990, 0, 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, FALSE),
('Adidas Gazelle', 'Adidas', 8990, 0, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, FALSE),
('Nike Air Force 1', 'Nike', 10990, 8990, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, TRUE),
('Puma Suede Classic', 'Puma', 7990, 0, 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, FALSE),
('Adidas Stan Smith', 'Adidas', 9490, 0, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, FALSE),
('Reebok Classic Leather', 'Reebok', 7990, 0, 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80', 'Кроссовки', TRUE, FALSE),
('Converse Chuck Taylor', 'Converse', 5990, 0, 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, FALSE),
('New Balance 990', 'New Balance', 17990, 0, 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80', 'Кроссовки', FALSE, FALSE);

-- Create users table for future authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_id VARCHAR(255),
    product_id INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
