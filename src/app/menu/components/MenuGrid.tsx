'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import FoodModal from './FoodModal';
import { supabase, Category } from '@/lib/supabase';

const menuData = [
  // BURGERS
  {
    id: 101,
    name: 'Wagyu Smash Burger',
    description: 'Double wagyu patty, aged cheddar, truffle aioli, caramelized onions, brioche bun',
    price: 2450,
    rating: 4.9,
    reviews: 342,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10302578c-1772227279977.png',
    alt: 'Juicy double wagyu smash burger with melted cheese',
    badge: 'Best Seller',
    category: 'burgers',
    isVeg: false,
    prepTime: '18 min',
    calories: '780 kcal',
    variations: [
      { id: 'single', name: 'Single', priceAdd: 0 },
      { id: 'double', name: 'Double', priceAdd: 400 },
      { id: 'triple', name: 'Triple', priceAdd: 750 },
    ],
    addons: [
      { id: 'extra-cheese', name: 'Extra Cheese', price: 150 },
      { id: 'bacon', name: 'Crispy Bacon', price: 200 },
      { id: 'avocado', name: 'Avocado', price: 180 },
      { id: 'jalapenos', name: 'Jalapeños', price: 80 },
    ],
    spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
  },
  {
    id: 102,
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty, American cheese, pickles, mustard, ketchup, sesame bun',
    price: 1350,
    rating: 4.7,
    reviews: 512,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bd019991-1772350968151.png',
    alt: 'Classic cheeseburger with fresh lettuce and tomato',
    category: 'burgers',
    isVeg: false,
    prepTime: '15 min',
    calories: '640 kcal',
    variations: [
      { id: 'reg', name: 'Regular', priceAdd: 0 },
      { id: 'large', name: 'Large', priceAdd: 250 },
    ],
    addons: [
      { id: 'extra-patty', name: 'Extra Patty', price: 300 },
      { id: 'mushrooms', name: 'Sautéed Mushrooms', price: 120 },
    ],
    spiceLevels: ['Mild', 'Medium', 'Hot'],
  },
  {
    id: 103,
    name: 'Crispy Chicken Burger',
    description: 'Southern fried chicken breast, coleslaw, pickled cucumbers, sriracha mayo',
    price: 1650,
    rating: 4.8,
    reviews: 289,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a5076b27-1772350969922.png',
    alt: 'Crispy fried chicken burger with coleslaw',
    badge: 'Popular',
    category: 'burgers',
    isVeg: false,
    prepTime: '20 min',
    calories: '720 kcal',
    variations: [
      { id: 'reg', name: 'Regular', priceAdd: 0 },
      { id: 'spicy', name: 'Nashville Hot', priceAdd: 100 },
    ],
    addons: [
      { id: 'extra-sauce', name: 'Extra Sauce', price: 60 },
      { id: 'cheese', name: 'Cheese Slice', price: 100 },
    ],
    spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
  },
  // PIZZA
  {
    id: 201,
    name: 'Truffle Margherita',
    description: 'San Marzano tomatoes, buffalo mozzarella, black truffle oil, fresh basil, EVOO',
    price: 1890,
    rating: 4.8,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1599731316529-77e2c6b2734a',
    alt: 'Gourmet margherita pizza with truffle and fresh basil',
    badge: 'New',
    category: 'pizza',
    isVeg: true,
    prepTime: '22 min',
    calories: '620 kcal',
    variations: [
      { id: 'small', name: '8" Small', priceAdd: 0 },
      { id: 'medium', name: '12" Medium', priceAdd: 400 },
      { id: 'large', name: '16" Large', priceAdd: 800 },
    ],
    addons: [
      { id: 'extra-cheese', name: 'Extra Mozzarella', price: 200 },
      { id: 'olives', name: 'Kalamata Olives', price: 150 },
      { id: 'chili', name: 'Chili Flakes', price: 50 },
    ],
    spiceLevels: ['No Spice', 'Mild', 'Medium'],
  },
  {
    id: 202,
    name: 'BBQ Chicken Pizza',
    description: 'Smoky BBQ base, grilled chicken, red onion, corn, mozzarella, cilantro',
    price: 2100,
    rating: 4.7,
    reviews: 334,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1dcd5a06e-1772350971511.png',
    alt: 'BBQ chicken pizza with colorful toppings',
    category: 'pizza',
    isVeg: false,
    prepTime: '25 min',
    calories: '780 kcal',
    variations: [
      { id: 'small', name: '8" Small', priceAdd: 0 },
      { id: 'medium', name: '12" Medium', priceAdd: 400 },
      { id: 'large', name: '16" Large', priceAdd: 800 },
    ],
    addons: [
      { id: 'extra-chicken', name: 'Extra Chicken', price: 300 },
      { id: 'jalapenos', name: 'Jalapeños', price: 80 },
      { id: 'extra-cheese', name: 'Extra Cheese', price: 200 },
    ],
    spiceLevels: ['Mild', 'Medium', 'Hot'],
  },
  {
    id: 203,
    name: 'Pepperoni Supreme',
    description:
      'Double pepperoni, Italian sausage, bell peppers, mushrooms, tomato sauce, mozzarella',
    price: 2250,
    rating: 4.9,
    reviews: 445,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_101f4e9e3-1772378186470.png',
    alt: 'Loaded pepperoni supreme pizza fresh from oven',
    badge: 'Best Seller',
    category: 'pizza',
    isVeg: false,
    prepTime: '24 min',
    calories: '850 kcal',
    variations: [
      { id: 'small', name: '8" Small', priceAdd: 0 },
      { id: 'medium', name: '12" Medium', priceAdd: 400 },
      { id: 'large', name: '16" Large', priceAdd: 800 },
    ],
    addons: [
      { id: 'extra-pepperoni', name: 'Extra Pepperoni', price: 250 },
      { id: 'stuffed-crust', name: 'Stuffed Crust', price: 350 },
    ],
    spiceLevels: ['Mild', 'Medium', 'Hot'],
  },
  // PASTA
  {
    id: 301,
    name: 'Lobster Linguine',
    description: 'Fresh Atlantic lobster, cherry tomatoes, white wine, cream, garlic, fresh herbs',
    price: 4100,
    rating: 4.7,
    reviews: 97,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1218d001b-1772378180759.png',
    alt: 'Luxurious lobster linguine pasta in creamy white wine sauce',
    badge: 'Premium',
    category: 'pasta',
    isVeg: false,
    prepTime: '30 min',
    calories: '840 kcal',
    variations: [
      { id: 'reg', name: 'Regular', priceAdd: 0 },
      { id: 'large', name: 'Large', priceAdd: 600 },
    ],
    addons: [
      { id: 'extra-lobster', name: 'Extra Lobster', price: 800 },
      { id: 'truffle', name: 'Truffle Shavings', price: 500 },
    ],
    spiceLevels: ['No Spice', 'Mild', 'Medium'],
  },
  {
    id: 302,
    name: 'Carbonara Classico',
    description: 'Guanciale, egg yolks, Pecorino Romano, black pepper, al dente spaghetti',
    price: 1750,
    rating: 4.8,
    reviews: 201,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_146ec8666-1772378183438.png',
    alt: 'Classic spaghetti carbonara with crispy guanciale',
    category: 'pasta',
    isVeg: false,
    prepTime: '20 min',
    calories: '760 kcal',
    variations: [
      { id: 'reg', name: 'Regular', priceAdd: 0 },
      { id: 'large', name: 'Large', priceAdd: 350 },
    ],
    addons: [
      { id: 'extra-bacon', name: 'Extra Guanciale', price: 250 },
      { id: 'chili', name: 'Chili Oil', price: 80 },
    ],
    spiceLevels: ['No Spice', 'Mild'],
  },
  // SUSHI
  {
    id: 401,
    name: 'Dragon Roll Platter',
    description: 'Spicy tuna, avocado, cucumber, tobiko, ponzu glaze — 12 pieces',
    price: 3200,
    rating: 4.9,
    reviews: 189,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a5e47e1d-1772378185610.png',
    alt: 'Elegant dragon sushi roll platter with colorful toppings',
    badge: "Chef's Pick",
    category: 'sushi',
    isVeg: false,
    prepTime: '25 min',
    calories: '520 kcal',
    variations: [
      { id: '12pc', name: '12 Pieces', priceAdd: 0 },
      { id: '24pc', name: '24 Pieces', priceAdd: 2800 },
    ],
    addons: [
      { id: 'wasabi', name: 'Extra Wasabi', price: 50 },
      { id: 'ginger', name: 'Pickled Ginger', price: 50 },
      { id: 'miso', name: 'Miso Soup', price: 300 },
    ],
    spiceLevels: ['No Spice', 'Mild', 'Spicy'],
  },
  {
    id: 402,
    name: 'Salmon Sashimi',
    description:
      'Premium Norwegian salmon, thinly sliced, served with ponzu, wasabi, pickled ginger',
    price: 2800,
    rating: 4.8,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1637074930269-089fde202b57',
    alt: 'Fresh premium salmon sashimi slices on slate plate',
    category: 'sushi',
    isVeg: false,
    prepTime: '15 min',
    calories: '380 kcal',
    variations: [
      { id: '8pc', name: '8 Pieces', priceAdd: 0 },
      { id: '16pc', name: '16 Pieces', priceAdd: 2500 },
    ],
    addons: [
      { id: 'extra-wasabi', name: 'Extra Wasabi', price: 50 },
      { id: 'truffle-ponzu', name: 'Truffle Ponzu', price: 200 },
    ],
    spiceLevels: ['No Spice'],
  },
  // GRILLS
  {
    id: 501,
    name: 'Ribeye Steak 300g',
    description: '28-day dry-aged ribeye, herb butter, roasted garlic, truffle mashed potato',
    price: 5500,
    rating: 4.9,
    reviews: 156,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d6565efd-1772378184053.png',
    alt: 'Perfectly cooked ribeye steak with herb butter and sides',
    badge: 'Premium',
    category: 'grills',
    isVeg: false,
    prepTime: '35 min',
    calories: '1100 kcal',
    variations: [
      { id: 'rare', name: 'Rare', priceAdd: 0 },
      { id: 'medium-rare', name: 'Medium Rare', priceAdd: 0 },
      { id: 'medium', name: 'Medium', priceAdd: 0 },
      { id: 'well', name: 'Well Done', priceAdd: 0 },
    ],
    addons: [
      { id: 'foie-gras', name: 'Foie Gras', price: 800 },
      { id: 'truffle-sauce', name: 'Truffle Sauce', price: 400 },
      { id: 'extra-sides', name: 'Extra Sides', price: 350 },
    ],
    spiceLevels: ['No Spice', 'Mild Pepper'],
  },
  {
    id: 502,
    name: 'Mixed Grill Platter',
    description: 'Chicken tikka, seekh kebab, lamb chops, shami kebab, naan, raita, mint chutney',
    price: 3800,
    rating: 4.8,
    reviews: 278,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f83bf79a-1765635448910.png',
    alt: 'Sizzling mixed grill platter with various meats and sides',
    badge: 'Best Seller',
    category: 'grills',
    isVeg: false,
    prepTime: '40 min',
    calories: '1250 kcal',
    variations: [
      { id: 'half', name: 'Half (2 pax)', priceAdd: 0 },
      { id: 'full', name: 'Full (4 pax)', priceAdd: 2500 },
    ],
    addons: [
      { id: 'extra-naan', name: 'Extra Naan x2', price: 150 },
      { id: 'extra-raita', name: 'Extra Raita', price: 100 },
    ],
    spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
  },
  // SALADS
  {
    id: 601,
    name: 'Caesar Salad',
    description: 'Romaine hearts, house-made Caesar dressing, Parmigiano-Reggiano, garlic croutons',
    price: 950,
    rating: 4.6,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1598148147935-05b3518efe32',
    alt: 'Fresh Caesar salad with croutons and parmesan',
    category: 'salads',
    isVeg: true,
    prepTime: '10 min',
    calories: '420 kcal',
    variations: [
      { id: 'reg', name: 'Regular', priceAdd: 0 },
      { id: 'large', name: 'Large', priceAdd: 250 },
    ],
    addons: [
      { id: 'chicken', name: 'Grilled Chicken', price: 350 },
      { id: 'shrimp', name: 'Grilled Shrimp', price: 450 },
      { id: 'anchovies', name: 'Anchovies', price: 150 },
    ],
    spiceLevels: ['No Spice'],
  },
  // DESSERTS
  {
    id: 701,
    name: 'Lava Chocolate Cake',
    description: 'Valrhona dark chocolate, molten center, vanilla bean ice cream, raspberry coulis',
    price: 890,
    rating: 4.9,
    reviews: 423,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f4d14547-1771884523691.png',
    alt: 'Decadent chocolate lava cake with ice cream and raspberry',
    badge: "Chef's Pick",
    category: 'desserts',
    isVeg: true,
    prepTime: '15 min',
    calories: '680 kcal',
    variations: [
      { id: 'single', name: 'Single', priceAdd: 0 },
      { id: 'double', name: 'Double', priceAdd: 700 },
    ],
    addons: [
      { id: 'extra-ice-cream', name: 'Extra Ice Cream', price: 200 },
      { id: 'caramel', name: 'Caramel Drizzle', price: 100 },
      { id: 'berries', name: 'Mixed Berries', price: 180 },
    ],
    spiceLevels: [],
  },
  {
    id: 702,
    name: 'Mango Cheesecake',
    description: 'New York-style cheesecake, Alphonso mango compote, graham cracker crust',
    price: 750,
    rating: 4.7,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1596549347916-de3dca7b9ce6',
    alt: 'Creamy mango cheesecake slice with fruit topping',
    category: 'desserts',
    isVeg: true,
    prepTime: '5 min',
    calories: '520 kcal',
    variations: [
      { id: 'slice', name: 'Single Slice', priceAdd: 0 },
      { id: 'half', name: 'Half Cake', priceAdd: 1800 },
      { id: 'whole', name: 'Whole Cake', priceAdd: 3200 },
    ],
    addons: [
      { id: 'cream', name: 'Whipped Cream', price: 80 },
      { id: 'sauce', name: 'Extra Mango Sauce', price: 120 },
    ],
    spiceLevels: [],
  },
  // DRINKS
  {
    id: 801,
    name: 'Signature Lemonade',
    description: 'Fresh-squeezed lemons, mint, elderflower, sparkling water, crushed ice',
    price: 450,
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1676844834412-26adad4dd100',
    alt: 'Refreshing mint lemonade in tall glass with ice',
    category: 'drinks',
    isVeg: true,
    prepTime: '5 min',
    calories: '180 kcal',
    variations: [
      { id: 'reg', name: 'Regular 350ml', priceAdd: 0 },
      { id: 'large', name: 'Large 500ml', priceAdd: 150 },
    ],
    addons: [
      { id: 'extra-mint', name: 'Extra Mint', price: 30 },
      { id: 'ginger', name: 'Ginger Shot', price: 80 },
    ],
    spiceLevels: [],
  },
  {
    id: 802,
    name: 'Cold Brew Coffee',
    description: '24-hour cold brew, oat milk, vanilla syrup, served over artisan ice',
    price: 550,
    rating: 4.7,
    reviews: 245,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13578d99b-1772378183506.png',
    alt: 'Cold brew coffee with oat milk in glass jar',
    category: 'drinks',
    isVeg: true,
    prepTime: '3 min',
    calories: '120 kcal',
    variations: [
      { id: 'reg', name: 'Regular', priceAdd: 0 },
      { id: 'large', name: 'Large', priceAdd: 120 },
    ],
    addons: [
      { id: 'extra-shot', name: 'Extra Shot', price: 100 },
      { id: 'caramel', name: 'Caramel Syrup', price: 80 },
    ],
    spiceLevels: [],
  },
];

interface CartItem {
  id: string;
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variation?: string;
  addons: string[];
  spiceLevel?: string;
}

interface MenuGridProps {
  isDark: boolean;
  onAddToCart: (item: CartItem) => void;
  initialCategory?: string;
}

export default function MenuGrid({ isDark, onAddToCart, initialCategory = 'all' }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedItem, setSelectedItem] = useState<(typeof menuData)[0] | null>(null);
  const [search, setSearch] = useState('');
  const [menuItems, setMenuItems] = useState<(typeof menuData)[0][]>(menuData);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const categoryIdToName = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((cat) => {
      map[cat.id.toString()] = cat.name.toLowerCase();
    });
    return map;
  }, [categories]);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const transformed = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || '',
          price: item.price,
          rating: 4.5,
          reviews: Math.floor(Math.random() * 100) + 50,
          image: item.image_url || '/assets/images/no_image.png',
          alt: item.name,
          category: item.category_id ? item.category_id.toString() : 'all',
          isVeg: false,
          prepTime: '20 min',
          calories: '500 kcal',
          variations:
            item.variations?.map((v: string, i: number) => ({
              id: `v${i}`,
              name: v,
              priceAdd: 0,
            })) || [],
          addons:
            item.addons?.map((a: string, i: number) => ({ id: `a${i}`, name: a, price: 100 })) ||
            [],
          spiceLevels: item.spice_levels || [],
        }));
        setMenuItems(transformed);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      let matchCat = activeCategory === 'all';
      if (!matchCat) {
        const categoryIdName = categoryIdToName[activeCategory];
        matchCat =
          item.category === activeCategory ||
          (categoryIdName !== undefined && item.category === categoryIdName);
      }
      const matchSearch =
        search === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search, menuItems, categoryIdToName]);

  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';

  return (
    <>
      {/* Sticky Category Bar */}
      <div
        className="sticky top-16 lg:top-20 z-30 border-b"
        style={{
          background: isDark ? 'rgba(10,10,15,0.95)' : 'rgba(250,248,243,0.95)',
          borderColor,
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar - Full Width Above Categories */}
          <div className="py-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-300"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${borderColor}`,
                  color: textPrimary,
                }}
                aria-label="Search menu items"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: textMuted }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Pills - Full Width with Scroll Buttons */}
          <div id="menu-section" className="relative flex items-center gap-2">
            <button
              onClick={() => scrollCategories('left')}
              className={`flex-shrink-0 p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                  : 'bg-black/5 text-gray-600 hover:bg-black/10'
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div
              ref={categoryScrollRef}
              className="flex gap-2 overflow-x-auto scroll-hide flex-1 pb-3"
            >
              <button
                key="all"
                onClick={() => setActiveCategory('all')}
                className={`category-pill flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-md font-bold transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'text-white shadow-lg'
                    : isDark
                      ? 'text-white/50 hover:text-white hover:bg-white/8'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                }`}
                style={
                  activeCategory === 'all'
                    ? {
                        background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                        boxShadow: '0 4px 16px rgba(245,158,11,0.35)',
                      }
                    : {}
                }
              >
                <span>🍽️</span>
                <span>All</span>
              </button>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id.toString();
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id.toString())}
                    className={`category-pill flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-md font-bold transition-all duration-300 ${
                      isActive
                        ? 'text-white shadow-lg'
                        : isDark
                          ? 'text-white/50 hover:text-white hover:bg-white/8'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                    }`}
                    style={
                      isActive
                        ? {
                            background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                            boxShadow: '0 4px 16px rgba(245,158,11,0.35)',
                          }
                        : {}
                    }
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => scrollCategories('right')}
              className={`flex-shrink-0 p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                  : 'bg-black/5 text-gray-600 hover:bg-black/10'
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-6xl">🔍</div>
            <p className="font-bold text-lg" style={{ color: textPrimary }}>
              No dishes found
            </p>
            <p className="text-sm" style={{ color: textMuted }}>
              Try a different search or category
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="px-6 py-3 rounded-xl font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`food-card rounded-3xl overflow-hidden cursor-pointer ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                onClick={() => setSelectedItem(item)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <AppImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover food-card-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {item.badge && (
                      <span className="badge-popular text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                    {item.isVeg && (
                      <span className="badge-veg text-white px-2 py-1 rounded-lg text-xs font-bold">
                        V
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-xl px-2.5 py-1 flex items-center gap-1">
                    <svg className="w-3 h-3 star-filled" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-xs font-bold">{item.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    className="font-display font-bold text-md leading-tight mb-1"
                    style={{ color: textPrimary }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-xs leading-relaxed line-clamp-2 mb-3"
                    style={{ color: textMuted }}
                  >
                    {item.description}
                  </p>
                  <div
                    className="flex items-center gap-3 mb-3 text-xs"
                    style={{ color: textMuted }}
                  >
                    <span>⏱ {item.prepTime}</span>
                    <span>🔥 {item.calories}</span>
                    <span>({item.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="price-tag font-black text-base text-amber-500">
                      ₨{item.price.toLocaleString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 bg-amber-500/15 text-amber-500 hover:bg-amber-500 hover:text-white"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <FoodModal
          item={selectedItem}
          isDark={isDark}
          onClose={() => setSelectedItem(null)}
          onAddToCart={(cartItem) => {
            onAddToCart(cartItem);
            setSelectedItem(null);
          }}
        />
      )}
    </>
  );
}
