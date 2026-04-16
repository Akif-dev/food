-- Delete all existing menu items first
DELETE FROM menu_items;

-- Add new menu items to the database
-- Get category IDs dynamically by name

WITH category_ids AS (
  SELECT id, name FROM categories WHERE name IN (
    'Arabic Wraps', 'BBQ', 'Platters', 'Starters', 'Sandwiches', 
    'Chinese', 'Zinger & Gourmet', 'Hot N Roll', 'Burgers & Broast', 
    'Combos', 'Sidelines'
  )
)
INSERT INTO menu_items (name, description, price, category_id, image_url, available, variations, addons, spice_levels, created_at, updated_at)
SELECT
  item.name,
  item.description,
  item.price,
  cat.id,
  item.image_url,
  true,
  item.variations::text[],
  item.addons::text[],
  item.spice_levels::text[],
  NOW(),
  NOW()
FROM (
  -- ARABIC WRAPS
  SELECT 'Original Turkish' as name, 'Tortilla, Beef Adana Kebab, Arabic Sauce, Iceberg, Mix pickle, Fries, Onion, Tomato and Ice n Spice Special Sauce' as description, 400 as price, 'Arabic Wraps' as category_name, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800' as image_url, ARRAY['Regular', 'Large']::text[] as variations, ARRAY[]::text[] as addons, ARRAY['No Spice', 'Mild', 'Hot']::text[] as spice_levels
  UNION ALL
  SELECT 'Persian Twist', 'Tortilla, Chicken Khubidha Kebab, Honey Mustard Sauce, Iceberg, Fries, Capsicum, Mix pickle, Ice n Spice Secret Sauce', 400, 'Arabic Wraps', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800', ARRAY['Regular', 'Large']::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Arabic Wraps', 'Tortilla, Arabic Sauce, Sheesh Taouk Chicken, Jalapeno, Fries, Iceberg, Ice n Spice Secret Sauce', 400, 'Arabic Wraps', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800', ARRAY['Regular', 'Large']::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Tijuana Wraps', 'Tortilla, Chicken Khubidha Kebab, Mixed Pickle, Mexican sauce, Iceberg, Fries, Tomato and Ice n Spice Secret Sauce', 400, 'Arabic Wraps', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800', ARRAY['Regular', 'Large']::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Moroccan Wraps', 'Tortilla, Sheesh Taouk Chicken, Ranch Sauce, Fries, Jalapeno, Iceberg, Ice n Spice Secret Sauce', 400, 'Arabic Wraps', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800', ARRAY['Regular', 'Large']::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Shawarma Wraps', 'Tortilla, Sheesh Taouk Chicken, Hummus, Tahina, Mix pickles, Fries, Olives, Arabic Sauce, Tobasco sauce', 400, 'Arabic Wraps', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800', ARRAY['Regular', 'Large']::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Zinger Wrap', 'Wrap Boasts Tortilla, Juicy Fried Chicken Chunks, Pickles, Jalapenos, Spicy Cream Sauce, and a Surprise Inside With Crispy Fries', 520, 'Arabic Wraps', 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800', ARRAY['Regular']::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot', 'Extra Hot']::text[]
  
  -- BBQ
  UNION ALL
  SELECT 'Adana Kebab', 'Spicy beef kebab with special Arabic spices', 700, 'BBQ', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Chicken Khubidah Kebab', 'Minced chicken kebab with herbs', 700, 'BBQ', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Thai Namkeen Boti', 'Thai spiced chicken boti', 700, 'BBQ', 'https://images.unsplash.com/photo-1599487488170-d11ec9e172c0?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Peri Peri Drum Stick (3 pcs)', '3 pieces of peri peri spiced drumsticks', 500, 'BBQ', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot', 'Extra Hot']::text[]
  UNION ALL
  SELECT 'Madhbi Grilled Tikka Leg', 'Traditional Yemeni grilled chicken leg tikka', 470, 'BBQ', 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Madhbi Grilled Tikka Chest', 'Traditional Yemeni grilled chicken chest tikka', 500, 'BBQ', 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Extra Rice', 'Extra serving of special rice', 300, 'BBQ', 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[]
  UNION ALL
  SELECT 'Puri Paratha', 'Traditional puri paratha', 60, 'BBQ', 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800', ARRAY['Single', 'Double']::text[], ARRAY[]::text[], ARRAY[]::text[]
  UNION ALL
  SELECT 'Garlic Sauce', 'Special garlic sauce', 100, 'BBQ', 'https://images.unsplash.com/photo-1615486511484-92e172cc416d?w=800', ARRAY['Small', 'Large']::text[], ARRAY[]::text[], ARRAY[]::text[]
  
  -- PLATTERS
  UNION ALL
  SELECT 'Classic for One', 'Kubideh Kebab, Peri peri Chicken, Ice n Spice Special Rice with authentic Arabic Sauce', 1100, 'Platters', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Classic for Two', 'Adana Kebab, Peri Peri Chicken, Sheesh Taouk, Thai Namkeen, Ice n Spice Special Rice with Authentic Arabic Sauce', 2200, 'Platters', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Royal Platter', 'Beef Adana Kebab, Khubidah Kebab, Peri Peri Chicken, Sheesh Taouk, Chicken Thai Namkeen, Madhbi Chicken, Ice n Spice Special Rice with Authentic Arabic Sauce', 3990, 'Platters', 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Kebabi Platter', '2 Khubidah Kebab, 2 Beef Adana Kebab & 2 Royal Turkish Kebab with special Rice, sauces & Grilled Vegetables', 2300, 'Platters', 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800', ARRAY['2 Person', '3 Person']::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Madhbi Grilled Chicken Full', 'Traditional Yemeni Grilled Chicken Marinated with Yemeni Spices Serve Over a Bed of Rice', 2990, 'Platters', 'https://images.unsplash.com/photo-1599487488170-d11ec9e172c0?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Madhbi Grilled Chicken Half', 'Traditional Yemeni Grilled Chicken Marinated with Yemeni Spices Serve Over a Bed of Rice', 1600, 'Platters', 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Madhbi Grilled Chicken Single', 'Traditional Yemeni Spice Tikka, Serve with Ice n Spice Special Rice and Sauce', 800, 'Platters', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Mix Grill', 'Beef Adana Kebab, Khubidah Kebab and Peri Peri Chicken with authentic Arabic Sauce', 1100, 'Platters', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Mix Grill with Rice', 'Beef Adana Kebab, Khubidah Kebab and Peri Peri Chicken with authentic Arabic Sauce and Rice', 1400, 'Platters', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Creamy and Cheesy Kebab', 'Choice of Kebab (Chicken and Beef) Topping with special cheesy and creamy sauce serve with paratha', 1000, 'Platters', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  
  -- STARTERS
  UNION ALL
  SELECT 'Chicken Nuggets (06 Pcs)', '6 pieces of crispy chicken nuggets', 480, 'Starters', 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Chicken & Chips', 'Tempura Style Chicken Strips with chips', 480, 'Starters', 'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'French Fries Garlic', 'Crispy french fries with garlic', 250, 'Starters', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'French Fries Plain', 'Classic crispy french fries', 200, 'Starters', 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice']::text[]
  UNION ALL
  SELECT 'Chicken Corn Soup', 'Creamy chicken corn soup', 170, 'Starters', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Hot & Sour Soup', 'Spicy hot and sour soup', 190, 'Starters', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Chicken Vegetable Soup', 'Healthy chicken vegetable soup', 170, 'Starters', 'https://images.unsplash.com/photo-1594750523794-e3bd9d9d7b6d?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  
  -- SANDWICHES
  UNION ALL
  SELECT 'BBQ Sandwich', 'Grilled Chicken Marinated with Special Spices, Iceberg, Tomatoes, with Signature Sauce', 650, 'Sandwiches', 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Italian Sandwich', 'Marinated Chicken with Cream and Butter, Capsicum & Onion Served with French Fries & Coleslaw', 600, 'Sandwiches', 'https://images.unsplash.com/photo-1481070555726-e2fe8357571d?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Crispy Sandwich', 'Made from Crispy Fried Chicken Chunks Served with Fries & Coleslaw', 480, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Club Sandwich', 'Traditional English Sandwich Chicken, Egg, Tomato & Cucumber served with Fries & Coleslaw', 550, 'Sandwiches', 'https://images.unsplash.com/photo-1481070555726-e2fe8357571d?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  
  -- CHINESE
  UNION ALL
  SELECT 'Chicken Chow Mein', 'Stir-fried noodles with chicken and vegetables', 700, 'Chinese', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Chicken Shashlik with Rice', 'Chicken shashlik skewers served with rice', 700, 'Chinese', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Chicken Manchurian with Rice', 'Spicy chicken manchurian with rice', 700, 'Chinese', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Chicken Chilly Veggie with Rice', 'Chicken chilly with vegetables and rice', 700, 'Chinese', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Chicken Chilly Dry with Rice', 'Dry chicken chilly with rice', 700, 'Chinese', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Schezwan Chicken Salty', 'Schezwan chicken salty style', 700, 'Chinese', 'https://images.unsplash.com/photo-1599487488170-d11ec9e172c0?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Beef Chilly Veggie with Rice', 'Beef chilly with vegetables and rice', 780, 'Chinese', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Beef Chilly Dry with Rice', 'Dry beef chilly with rice', 780, 'Chinese', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Beef Chow Mein', 'Stir-fried noodles with beef and vegetables', 780, 'Chinese', 'https://images.unsplash.com/photo-1599487488170-d11ec9e172c0?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Chicken Fried Rice', 'Fried rice with chicken and vegetables', 400, 'Chinese', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Chicken Shashlik without Rice', 'Chicken shashlik skewers', 400, 'Chinese', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Veggie Fried Rice', 'Fried rice with mixed vegetables', 330, 'Chinese', 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice']::text[]
  
  -- ZINGER & GOURMET
  UNION ALL
  SELECT 'Zinger Max', 'New style juicy Thigh fried Chicken fillet with New York style sauce', 470, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Zinger Fiery', 'Fried Thigh Chicken fillet with fiery hot spicy sauce with touch of Jalapeno and Iceberg', 470, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Hot', 'Extra Hot']::text[]
  UNION ALL
  SELECT 'Zinger Burger', 'Crispy Chest Chicken fillet, top with chilli garlic & mayo', 480, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1594212699903-ec8a63ecaaf4?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Zinger with Cheese & Coleslaw', 'Crispy Chest Fillet, Top with signature sauce and Iceberg', 530, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1562967916-608f82629710?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Accident Burger', 'Delicious combination of Beef patty and Crispy chicken fillet, cheddar cheese, and secret sauce', 700, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Mighty King', 'Crispy double thigh Chicken fillet, iceberg and top with signature sauce', 700, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Stuff Cheese Burger', 'Melted Cheddar Cheese, Stuffed into fried chicken along with secret sauce', 570, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'American Classic', 'Beef patty, iceberg, caramelized onions, fresh tomatoes, American sauce, signature burger sauce & cheddar cheese', 550, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Crispy Beef', 'Crispy Beef patty topped with caramelized onions kick of special mustard sauce on the bottom, complemented by signature sauce and iceberg on top', 490, 'Zinger & Gourmet', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  
  -- HOT N ROLL
  UNION ALL
  SELECT 'Adana Twist', 'Spicy adana roll', 300, 'Hot N Roll', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['Mild', 'Hot']::text[]
  UNION ALL
  SELECT 'Mayo Twist', 'Creamy mayo roll', 300, 'Hot N Roll', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  
  -- BURGERS & BROAST
  UNION ALL
  SELECT 'Qtr Broast Chest', 'Quarter broasted chicken chest piece', 600, 'Burgers & Broast', 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Qtr Broast Leg', 'Quarter broasted chicken leg piece', 550, 'Burgers & Broast', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Chicken Burger', 'Classic chicken burger', 380, 'Burgers & Broast', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Chicken Cheese Burger', 'Chicken burger with cheese', 430, 'Burgers & Broast', 'https://images.unsplash.com/photo-1594212699903-ec8a63ecaaf4?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Egg & Chicken Burger', 'Chicken burger with egg', 430, 'Burgers & Broast', 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Mega Chicken Burger', 'Large chicken burger', 600, 'Burgers & Broast', 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Beef Burger', 'Classic beef burger', 400, 'Burgers & Broast', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Beef Cheese Burger', 'Beef burger with cheese', 450, 'Burgers & Broast', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Egg & Beef Burger', 'Beef burger with egg', 450, 'Burgers & Broast', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Mega Beef Burger', 'Large beef burger', 650, 'Burgers & Broast', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  
  -- COMBOS
  UNION ALL
  SELECT 'Combo - 1', '2 Zinger Burger + 2 300 ml Cold Drink', 1030, 'Combos', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Combo - 2', 'Qtr Leg + Zinger Max + 2 300 ml Cold Drink', 1080, 'Combos', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Combo - 3', '2 Qtr (leg+chest) + 2 300 ml Cold Drink', 1200, 'Combos', 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Combo - 4', '9 PCS. (Leg and Thigh) + 4 Bun + Fries', 2200, 'Combos', 'https://images.unsplash.com/photo-1599487488170-d11ec9e172c0?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  UNION ALL
  SELECT 'Crispy Platter', 'Zinger Max, Zinger Fiery, Zinger Regular, Qtr Leg, Onion Rings, Garlic Fries, 1 Ltr Cold Drink', 1950, 'Combos', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY['No Spice', 'Mild']::text[]
  
  -- SIDELINES
  UNION ALL
  SELECT 'Dine-in 1 Ltr Cold Drink', '1 liter cold drink for dine-in', 300, 'Sidelines', 'https://images.unsplash.com/photo-1524380150510-4856918c6de7?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[]
  UNION ALL
  SELECT '345 ml Cold Drink/Sting', '345 ml cold drink or sting', 80, 'Sidelines', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', ARRAY['Cold Drink', 'Sting']::text[], ARRAY[]::text[], ARRAY[]::text[]
  UNION ALL
  SELECT 'Mineral Water', 'Mineral water', 60, 'Sidelines', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800', ARRAY['Small', 'Large']::text[], ARRAY[]::text[], ARRAY[]::text[]
  UNION ALL
  SELECT 'Coleslaw', 'Fresh coleslaw', 50, 'Sidelines', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[]
  UNION ALL
  SELECT 'Extra Cheese Slice', 'Extra cheese slice', 50, 'Sidelines', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[]
  UNION ALL
  SELECT 'Extra Bun', 'Extra bun', 40, 'Sidelines', 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[]
  UNION ALL
  SELECT 'Disposable Glass', 'Disposable glass', 5, 'Sidelines', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800', ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[]
) as item
JOIN category_ids cat ON item.category_name = cat.name;
