'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

const featured = [
  {
    id: 1,
    name: 'Wagyu Smash Burger',
    description: 'Double wagyu patty, aged cheddar, truffle aioli, caramelized onions',
    price: 2450,
    originalPrice: 2900,
    rating: 4.9,
    reviews: 342,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_148da1b4d-1772378184268.png',
    alt: 'Juicy double wagyu smash burger with melted cheese and fresh toppings',
    badge: 'Best Seller',
    badgeType: 'popular',
    category: 'Burgers',
    isVeg: false,
    prepTime: '18 min',
    calories: '780 kcal',
    size: 'large',
  },
  {
    id: 2,
    name: 'Truffle Margherita',
    description: 'San Marzano tomatoes, buffalo mozzarella, black truffle, fresh basil',
    price: 1890,
    rating: 4.8,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1599731316529-77e2c6b2734a',
    alt: 'Gourmet margherita pizza with truffle and fresh basil on wood-fired crust',
    badge: 'New',
    badgeType: 'new',
    category: 'Pizza',
    isVeg: true,
    prepTime: '22 min',
    calories: '620 kcal',
    size: 'medium',
  },
  {
    id: 3,
    name: 'Dragon Roll Platter',
    description: 'Spicy tuna, avocado, cucumber, tobiko, ponzu glaze — 12 pieces',
    price: 3200,
    rating: 4.9,
    reviews: 189,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1dad3bbd4-1772378185292.png',
    alt: 'Elegant dragon sushi roll platter with colorful toppings and sauces',
    badge: "Chef's Pick",
    badgeType: 'popular',
    category: 'Sushi',
    isVeg: false,
    prepTime: '25 min',
    calories: '520 kcal',
    size: 'large',
  },
  {
    id: 4,
    name: 'Lobster Linguine',
    description: 'Fresh Atlantic lobster, cherry tomatoes, white wine, cream, herbs',
    price: 4100,
    rating: 4.7,
    reviews: 97,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1218d001b-1772378180759.png',
    alt: 'Luxurious lobster linguine pasta in creamy white wine sauce',
    badge: 'Premium',
    badgeType: 'new',
    category: 'Pasta',
    isVeg: false,
    prepTime: '30 min',
    calories: '840 kcal',
    size: 'medium',
  },
];

interface FeaturedItemsProps {
  isDark: boolean;
  onAddToCart: (item: (typeof featured)[0]) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'star-filled' : 'star-empty'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function FeaturedItems({ isDark, onAddToCart }: FeaturedItemsProps) {
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAdd = (item: (typeof featured)[0]) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-20" style={{ background: isDark ? '#111118' : '#F3F0E8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-1 rounded-full bg-amber-500" />
              <span
                className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-gray-400'}`}
              >
                Handpicked
              </span>
            </div>
            <h2
              className={`text-3xl lg:text-4xl font-display font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Featured <span className="gradient-text-amber italic">Dishes</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-amber-500 hover:gap-3 transition-all duration-300"
          >
            Full Menu
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {featured.map((item, i) => (
            <div
              key={item.id}
              className={`food-card rounded-3xl overflow-hidden group ${
                isDark ? 'glass-card-dark' : 'glass-card-light'
              } ${item.size === 'large' ? 'md:row-span-1' : ''}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <AppImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover food-card-img"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`badge-${item.badgeType} text-white px-2.5 py-1 rounded-lg text-xs font-bold`}
                  >
                    {item.badge}
                  </span>
                  {item.isVeg && (
                    <span className="badge-veg text-white px-2 py-1 rounded-lg text-xs font-bold">
                      VEG
                    </span>
                  )}
                </div>

                {/* Quick Add */}
                <button
                  onClick={() => handleAdd(item)}
                  className={`absolute bottom-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-300 ${
                    addedId === item.id
                      ? 'bg-emerald-500 scale-110'
                      : 'bg-amber-500 hover:bg-amber-400 hover:scale-110'
                  } shadow-lg`}
                  aria-label={`Add ${item.name} to cart`}
                >
                  {addedId === item.id ? '✓' : '+'}
                </button>

                {/* Category */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-white/80 text-xs font-semibold">{item.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    className={`font-display font-bold text-base leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {item.name}
                  </h3>
                </div>
                <p
                  className={`text-xs leading-relaxed mb-3 line-clamp-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}
                >
                  {item.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <StarRating rating={item.rating} />
                    <span
                      className={`text-xs font-semibold ml-1 ${isDark ? 'text-white/60' : 'text-gray-500'}`}
                    >
                      {item.rating} ({item.reviews})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`flex items-center gap-1 text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item.prepTime}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}
                  >
                    🔥 {item.calories}
                  </span>
                </div>

                {/* Price Row */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="price-tag text-lg font-black text-amber-500">
                      ₨{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span
                        className={`text-xs line-through ml-2 ${isDark ? 'text-white/30' : 'text-gray-400'}`}
                      >
                        ₨{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAdd(item)}
                    className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 ${
                      addedId === item.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500/15 text-amber-500 hover:bg-amber-500 hover:text-white'
                    }`}
                  >
                    {addedId === item.id ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
