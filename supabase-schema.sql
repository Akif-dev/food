-- Run this SQL in Supabase SQL Editor to create the database schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(200) NOT NULL,
  address TEXT,
  area VARCHAR(100),
  city VARCHAR(100) DEFAULT 'Karachi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add sort_order column to categories table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE categories ADD COLUMN sort_order INTEGER DEFAULT 0;
  END IF;
END $$;

-- Add sort_order column to menu_items table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'menu_items' AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE menu_items ADD COLUMN sort_order INTEGER DEFAULT 0;
  END IF;
END $$;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'address'
  ) THEN
    ALTER TABLE users ADD COLUMN address TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'area'
  ) THEN
    ALTER TABLE users ADD COLUMN area VARCHAR(100);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'city'
  ) THEN
    ALTER TABLE users ADD COLUMN city VARCHAR(100) DEFAULT 'Karachi';
  END IF;
END $$;

-- Saved addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(50) NOT NULL, -- e.g., 'Home', 'Office'
  full_address TEXT NOT NULL,
  area VARCHAR(100),
  city VARCHAR(100) DEFAULT 'Karachi',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites/Wishlist table
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, menu_item_id)
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  variations TEXT[],
  addons TEXT[],
  spice_levels TEXT[],
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(200),
  delivery_address TEXT,
  delivery_type VARCHAR(20) NOT NULL CHECK (delivery_type IN ('delivery', 'pickup')),
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  tax DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled')),
  payment_method VARCHAR(50) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add user_id column to orders table if it doesn't exist (for existing tables)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE orders ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to categories" ON categories;
DROP POLICY IF EXISTS "Allow public read access to menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow public read access to orders" ON orders;
DROP POLICY IF EXISTS "Allow admin insert to categories" ON categories;
DROP POLICY IF EXISTS "Allow admin update to categories" ON categories;
DROP POLICY IF EXISTS "Allow admin delete to categories" ON categories;
DROP POLICY IF EXISTS "Allow admin insert to menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow admin update to menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow admin delete to menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow public insert to orders" ON orders;
DROP POLICY IF EXISTS "Allow admin update to orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can update their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can read their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can delete their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can insert their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can read their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorites;

-- Create policies for public read access
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to orders" ON orders FOR SELECT USING (false);

-- Users policies
CREATE POLICY "Users can insert their own data" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (true);
CREATE POLICY "Users can read their own data" ON users FOR SELECT USING (true);

-- Addresses policies
CREATE POLICY "Users can insert their own addresses" ON addresses FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own addresses" ON addresses FOR UPDATE USING (true);
CREATE POLICY "Users can read their own addresses" ON addresses FOR SELECT USING (true);
CREATE POLICY "Users can delete their own addresses" ON addresses FOR DELETE USING (true);

-- Favorites policies
CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read their own favorites" ON favorites FOR SELECT USING (true);
CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (true);

-- Create policies for admin write access (you'll need to create an admin user and update this)
CREATE POLICY "Allow admin insert to categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update to categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete to categories" ON categories FOR DELETE USING (true);

CREATE POLICY "Allow admin insert to menu_items" ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update to menu_items" ON menu_items FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete to menu_items" ON menu_items FOR DELETE USING (true);

CREATE POLICY "Allow public insert to orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update to orders" ON orders FOR UPDATE USING (true);

-- Insert default categories in correct sequence with sort_order
INSERT INTO categories (name, description, icon, sort_order) VALUES
  ('Starters', 'Appetizers and starters', '🍟', 1),
  ('Sandwiches', 'Fresh and tasty sandwiches', '🥪', 2),
  ('Chinese', 'Authentic Chinese cuisine', '🍜', 3),
  ('Zinger & Gourmet', 'Premium zinger and gourmet items', '🍔', 4),
  ('Hot N Roll', 'Hot and fresh rolls', '🌯', 5),
  ('Burgers & Broast', 'Crispy burgers and broast', '🍗', 6),
  ('Combos', 'Value combo meals', '🥤', 7),
  ('Sidelines', 'Side dishes and extras', '🥤', 8),
  ('Arabic Wraps', 'Traditional Arabic wraps', '🌯', 9),
  ('BBQ', 'Smoked and grilled BBQ', '🔥', 10),
  ('Platters', 'Large sharing platters', '🥘', 11)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

-- Update existing categories with sort_order values
UPDATE categories SET sort_order = 1 WHERE name = 'Starters';
UPDATE categories SET sort_order = 2 WHERE name = 'Sandwiches';
UPDATE categories SET sort_order = 3 WHERE name = 'Chinese';
UPDATE categories SET sort_order = 4 WHERE name = 'Zinger & Gourmet';
UPDATE categories SET sort_order = 5 WHERE name = 'Hot N Roll';
UPDATE categories SET sort_order = 6 WHERE name = 'Burgers & Broast';
UPDATE categories SET sort_order = 7 WHERE name = 'Combos';
UPDATE categories SET sort_order = 8 WHERE name = 'Sidelines';
UPDATE categories SET sort_order = 9 WHERE name = 'Arabic Wraps';
UPDATE categories SET sort_order = 10 WHERE name = 'BBQ';
UPDATE categories SET sort_order = 11 WHERE name = 'Platters';

-- Delete old categories
DELETE FROM categories WHERE name IN ('Burgers', 'Pizza', 'Sushi', 'Grills', 'Desserts', 'Drinks');

-- Fix Original Turkish item category_id to Arabic Wraps
UPDATE menu_items SET category_id = (SELECT id FROM categories WHERE name = 'Arabic Wraps') WHERE name = 'Original Turkish' AND category_id IS NULL;

-- Set initial sort_order values for existing menu items by category
-- This assigns sort_order based on current id order within each category
WITH numbered_items AS (
  SELECT
    mi.id,
    ROW_NUMBER() OVER (PARTITION BY mi.category_id ORDER BY mi.id) as row_num
  FROM menu_items mi
  WHERE mi.category_id IS NOT NULL
)
UPDATE menu_items
SET sort_order = numbered_items.row_num
FROM numbered_items
WHERE menu_items.id = numbered_items.id;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_addresses_updated_at ON addresses;
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
DROP TRIGGER IF EXISTS update_menu_items_updated_at ON menu_items;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
