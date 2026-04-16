-- Run this in Supabase SQL Editor to import all menu items from frontend

-- First, update categories to match frontend
DELETE FROM categories;
INSERT INTO categories (name, description, icon) VALUES
  ('Burgers', 'Delicious handmade burgers', '🍔'),
  ('Pizza', 'Artisan wood-fired pizza', '🍕'),
  ('Pasta', 'Authentic Italian pasta dishes', '🍝'),
  ('Sushi', 'Fresh Japanese sushi', '🍣'),
  ('Grills', 'Premium grilled meats', '🥩'),
  ('Salads', 'Fresh healthy salads', '🥗'),
  ('Desserts', 'Sweet treats and desserts', '🍰'),
  ('Drinks', 'Refreshing beverages', '🥤');

-- Get category IDs
DO $$
DECLARE
  burgers_id INT;
  pizza_id INT;
  pasta_id INT;
  sushi_id INT;
  grills_id INT;
  salads_id INT;
  desserts_id INT;
  drinks_id INT;
BEGIN
  SELECT id INTO burgers_id FROM categories WHERE name = 'Burgers';
  SELECT id INTO pizza_id FROM categories WHERE name = 'Pizza';
  SELECT id INTO pasta_id FROM categories WHERE name = 'Pasta';
  SELECT id INTO sushi_id FROM categories WHERE name = 'Sushi';
  SELECT id INTO grills_id FROM categories WHERE name = 'Grills';
  SELECT id INTO salads_id FROM categories WHERE name = 'Salads';
  SELECT id INTO desserts_id FROM categories WHERE name = 'Desserts';
  SELECT id INTO drinks_id FROM categories WHERE name = 'Drinks';

  -- Clear existing menu items
  DELETE FROM menu_items;

  -- BURGERS
  INSERT INTO menu_items (name, description, price, category_id, image_url, variations, addons, spice_levels, available) VALUES
    ('Wagyu Smash Burger', 'Double wagyu patty, aged cheddar, truffle aioli, caramelized onions, brioche bun', 2450, burgers_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_10302578c-1772227279977.png', ARRAY['Single', 'Double', 'Triple']::TEXT[], ARRAY['Extra Cheese', 'Crispy Bacon', 'Avocado', 'Jalapeños']::TEXT[], ARRAY['Mild', 'Medium', 'Hot', 'Extra Hot']::TEXT[], true),
    ('Classic Cheeseburger', 'Angus beef patty, American cheese, pickles, mustard, ketchup, sesame bun', 1350, burgers_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1bd019991-1772350968151.png', ARRAY['Regular', 'Large']::TEXT[], ARRAY['Extra Patty', 'Sautéed Mushrooms']::TEXT[], ARRAY['Mild', 'Medium', 'Hot']::TEXT[], true),
    ('Crispy Chicken Burger', 'Southern fried chicken breast, coleslaw, pickled cucumbers, sriracha mayo', 1650, burgers_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1a5076b27-1772350969922.png', ARRAY['Regular', 'Nashville Hot']::TEXT[], ARRAY['Extra Sauce', 'Cheese Slice']::TEXT[], ARRAY['Mild', 'Medium', 'Hot', 'Extra Hot']::TEXT[], true);

  -- PIZZA
  INSERT INTO menu_items (name, description, price, category_id, image_url, variations, addons, spice_levels, available) VALUES
    ('Truffle Margherita', 'San Marzano tomatoes, buffalo mozzarella, black truffle oil, fresh basil, EVOO', 1890, pizza_id, 'https://images.unsplash.com/photo-1599731316529-77e2c6b2734a', ARRAY['8" Small', '12" Medium', '16" Large']::TEXT[], ARRAY['Extra Mozzarella', 'Kalamata Olives', 'Chili Flakes']::TEXT[], ARRAY['No Spice', 'Mild', 'Medium']::TEXT[], true),
    ('BBQ Chicken Pizza', 'Smoky BBQ base, grilled chicken, red onion, corn, mozzarella, cilantro', 2100, pizza_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1dcd5a06e-1772350971511.png', ARRAY['8" Small', '12" Medium', '16" Large']::TEXT[], ARRAY['Extra Chicken', 'Jalapeños', 'Extra Cheese']::TEXT[], ARRAY['Mild', 'Medium', 'Hot']::TEXT[], true),
    ('Pepperoni Supreme', 'Double pepperoni, Italian sausage, bell peppers, mushrooms, tomato sauce, mozzarella', 2250, pizza_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_101f4e9e3-1772378186470.png', ARRAY['8" Small', '12" Medium', '16" Large']::TEXT[], ARRAY['Extra Pepperoni', 'Stuffed Crust']::TEXT[], ARRAY['Mild', 'Medium', 'Hot']::TEXT[], true);

  -- PASTA
  INSERT INTO menu_items (name, description, price, category_id, image_url, variations, addons, spice_levels, available) VALUES
    ('Lobster Linguine', 'Fresh Atlantic lobster, cherry tomatoes, white wine, cream, garlic, fresh herbs', 4100, pasta_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1218d001b-1772378180759.png', ARRAY['Regular', 'Large']::TEXT[], ARRAY['Extra Lobster', 'Truffle Shavings']::TEXT[], ARRAY['No Spice', 'Mild', 'Medium']::TEXT[], true),
    ('Carbonara Classico', 'Guanciale, egg yolks, Pecorino Romano, black pepper, al dente spaghetti', 1750, pasta_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_146ec8666-1772378183438.png', ARRAY['Regular', 'Large']::TEXT[], ARRAY['Extra Guanciale', 'Chili Oil']::TEXT[], ARRAY['No Spice', 'Mild']::TEXT[], true);

  -- SUSHI
  INSERT INTO menu_items (name, description, price, category_id, image_url, variations, addons, spice_levels, available) VALUES
    ('Dragon Roll Platter', 'Spicy tuna, avocado, cucumber, tobiko, ponzu glaze — 12 pieces', 3200, sushi_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1a5e47e1d-1772378185610.png', ARRAY['12 Pieces', '24 Pieces']::TEXT[], ARRAY['Extra Wasabi', 'Pickled Ginger', 'Miso Soup']::TEXT[], ARRAY['No Spice', 'Mild', 'Spicy']::TEXT[], true),
    ('Salmon Sashimi', 'Premium Norwegian salmon, thinly sliced, served with ponzu, wasabi, pickled ginger', 2800, sushi_id, 'https://images.unsplash.com/photo-1637074930269-089fde202b57', ARRAY['8 Pieces', '16 Pieces']::TEXT[], ARRAY['Extra Wasabi', 'Truffle Ponzu']::TEXT[], ARRAY['No Spice']::TEXT[], true);

  -- GRILLS
  INSERT INTO menu_items (name, description, price, category_id, image_url, variations, addons, spice_levels, available) VALUES
    ('Ribeye Steak 300g', '28-day dry-aged ribeye, herb butter, roasted garlic, truffle mashed potato', 5500, grills_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1d6565efd-1772378184053.png', ARRAY['Rare', 'Medium Rare', 'Medium', 'Well Done']::TEXT[], ARRAY['Foie Gras', 'Truffle Sauce', 'Extra Sides']::TEXT[], ARRAY['No Spice', 'Mild Pepper']::TEXT[], true),
    ('Mixed Grill Platter', 'Chicken tikka, seekh kebab, lamb chops, shami kebab, naan, raita, mint chutney', 3800, grills_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1f83bf79a-1765635448910.png', ARRAY['Half (2 pax)', 'Full (4 pax)']::TEXT[], ARRAY['Extra Naan x2', 'Extra Raita']::TEXT[], ARRAY['Mild', 'Medium', 'Hot', 'Extra Hot']::TEXT[], true);

  -- SALADS
  INSERT INTO menu_items (name, description, price, category_id, image_url, variations, addons, spice_levels, available) VALUES
    ('Caesar Salad', 'Romaine hearts, house-made Caesar dressing, Parmigiano-Reggiano, garlic croutons', 950, salads_id, 'https://images.unsplash.com/photo-1598148147935-05b3518efe32', ARRAY['Regular', 'Large']::TEXT[], ARRAY['Grilled Chicken', 'Grilled Shrimp', 'Anchovies']::TEXT[], ARRAY['No Spice']::TEXT[], true);

  -- DESSERTS
  INSERT INTO menu_items (name, description, price, category_id, image_url, variations, addons, spice_levels, available) VALUES
    ('Lava Chocolate Cake', 'Valrhona dark chocolate, molten center, vanilla bean ice cream, raspberry coulis', 890, desserts_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1f4d14547-1771884523691.png', ARRAY['Single', 'Double']::TEXT[], ARRAY['Extra Ice Cream', 'Caramel Drizzle', 'Mixed Berries']::TEXT[], ARRAY[]::TEXT[], true),
    ('Mango Cheesecake', 'New York-style cheesecake, Alphonso mango compote, graham cracker crust', 750, desserts_id, 'https://images.unsplash.com/photo-1596549347916-de3dca7b9ce6', ARRAY['Single Slice', 'Half Cake', 'Whole Cake']::TEXT[], ARRAY['Whipped Cream', 'Extra Mango Sauce']::TEXT[], ARRAY[]::TEXT[], true);

  -- DRINKS
  INSERT INTO menu_items (name, description, price, category_id, image_url, variations, addons, spice_levels, available) VALUES
    ('Signature Lemonade', 'Fresh-squeezed lemons, mint, elderflower, sparkling water, crushed ice', 450, drinks_id, 'https://images.unsplash.com/photo-1676844834412-26adad4dd100', ARRAY['Regular 350ml', 'Large 500ml']::TEXT[], ARRAY['Extra Mint', 'Ginger Shot']::TEXT[], ARRAY[]::TEXT[], true),
    ('Cold Brew Coffee', '24-hour cold brew, oat milk, vanilla syrup, served over artisan ice', 550, drinks_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_13578d99b-1772378183506.png', ARRAY['Regular', 'Large']::TEXT[], ARRAY['Extra Shot', 'Caramel Syrup']::TEXT[], ARRAY[]::TEXT[], true);

END $$;
