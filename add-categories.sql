-- Delete all existing categories first
DELETE FROM categories;

-- Add new categories to the database

INSERT INTO categories (name, description, icon, created_at, updated_at) VALUES
('Arabic Wraps', 'Delicious Arabic wraps with kebabs and special sauces', '🌯', NOW(), NOW()),
('BBQ', 'Grilled BBQ items including kebabs and drumsticks', '🔥', NOW(), NOW()),
('Platters', 'Full meal platters with rice and grilled meats', '🥘', NOW(), NOW()),
('Starters', 'Appetizers and snacks', '🍟', NOW(), NOW()),
('Sandwiches', 'Fresh sandwiches with chicken and beef', '🥪', NOW(), NOW()),
('Chinese', 'Chinese cuisine with rice and noodles', '🍜', NOW(), NOW()),
('Zinger & Gourmet', 'Zinger burgers and gourmet series', '🍔', NOW(), NOW()),
('Hot N Roll', 'Hot rolls and wraps', '🌯', NOW(), NOW()),
('Burgers & Broast', 'Burgers and broasted chicken', '🍗', NOW(), NOW()),
('Combos', 'Combo meals with drinks', '🥤', NOW(), NOW()),
('Sidelines', 'Sides and beverages', '🥤', NOW(), NOW());
