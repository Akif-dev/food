'use client';

import { useRef, useState, useEffect } from 'react';

import Link from 'next/link';

import { supabase, Category } from '@/lib/supabase';

interface CategoryScrollProps {
  isDark: boolean;
}

export default function CategoryScroll({ isDark }: CategoryScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    } finally {
      setLoading(false);
    }
  };

  const gradients = [
    'from-amber-400 to-orange-500',

    'from-red-400 to-red-600',

    'from-yellow-400 to-orange-500',

    'from-green-400 to-emerald-600',

    'from-pink-400 to-rose-600',

    'from-orange-400 to-red-600',

    'from-lime-400 to-green-600',

    'from-purple-400 to-pink-600',

    'from-blue-400 to-cyan-600',
  ];

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="py-20" style={{ background: isDark ? '#0A0A0F' : '#FAF8F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-amber-500 text-xl animate-pulse font-bold">
            Loading categories...
          </div>
        </div>
      </section>
    );
  }

  const allCategories = [
    { id: 0, name: 'All Items', description: '', icon: '🍽️', created_at: '', updated_at: '' },

    ...categories,
  ];

  return (
    <section className="py-20" style={{ background: isDark ? '#0A0A0F' : '#FAF8F3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />

              <span
                className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-gray-500'}`}
              >
                Explore Our
              </span>
            </div>

            <h2
              className={`text-4xl lg:text-5xl font-display font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Food{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent italic">
                Categories
              </span>
            </h2>
          </div>

          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
          >
            View Full Menu
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

        <div className="relative">
          {/* Scroll Arrows */}

          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-x-7 ${isDark ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' : 'bg-white text-gray-700 border-2 border-amber-500'}`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:translate-x-7 ${isDark ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' : 'bg-white text-gray-700 border-2 border-amber-500'}`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Scroll Container */}

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-hide pb-4 px-2">
            {categories.map((cat: any, i: number) => {
              const gradient = gradients[i % gradients.length];

              return (
                <Link
                  key={cat.id}
                  href={`/menu?category=${cat.name.toLowerCase()}`}
                  className="group relative flex-shrink-0"
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div
                    className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                      isDark
                        ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                        : 'bg-white border border-gray-100'
                    }`}
                    style={{
                      width: '160px',

                      height: '180px',

                      boxShadow:
                        hoveredCategory === cat.id
                          ? '0 20px 60px rgba(245, 158, 11, 0.3)'
                          : isDark
                            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                            : '0 4px 20px rgba(0, 0, 0, 0.08)',

                      transform:
                        hoveredCategory === cat.id
                          ? 'translateY(-8px) scale(1.02)'
                          : 'translateY(0) scale(1)',
                    }}
                  >
                    {/* Gradient background overlay */}

                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`}
                    />

                    {/* Content */}

                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
                      {/* Emoji container with gradient background */}

                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-all duration-500 mb-4 ${
                          hoveredCategory === cat.id
                            ? 'bg-white/20 backdrop-blur-sm scale-110 rotate-6'
                            : isDark
                              ? 'bg-white/10'
                              : 'bg-gray-50'
                        }`}
                        style={{
                          background:
                            hoveredCategory === cat.id
                              ? `linear-gradient(135deg, ${gradient})`
                              : undefined,
                        }}
                      >
                        {cat.emoji}
                      </div>

                      {/* Category name */}

                      <div className="text-center">
                        <div
                          className={`font-black text-lg transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                          style={{
                            color: hoveredCategory === cat.id ? 'white' : undefined,
                          }}
                        >
                          {cat.name}
                        </div>

                        {cat.description && (
                          <div
                            className={`text-xs font-semibold mt-1 transition-colors duration-300 ${
                              isDark ? 'text-white/50' : 'text-gray-500'
                            }`}
                            style={{
                              color:
                                hoveredCategory === cat.id ? 'rgba(255,255,255,0.8)' : undefined,
                            }}
                          >
                            {cat.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shine effect on hover */}

                    {hoveredCategory === cat.id && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Fade edges */}

          <div
            className="absolute left-0 top-0 bottom-4 w-20 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to right, ${isDark ? '#0A0A0F' : '#FAF8F3'}, transparent)`,
            }}
          />

          <div
            className="absolute right-0 top-0 bottom-4 w-20 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to left, ${isDark ? '#0A0A0F' : '#FAF8F3'}, transparent)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
