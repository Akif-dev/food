'use client';

import { useState } from 'react';

import AppImage from '@/components/ui/AppImage';

const testimonials = [
  {
    id: 1,

    name: 'Ayesha Raza',

    role: 'Food Blogger',

    avatar: 'https://images.unsplash.com/photo-1684576656380-934ef5136194',

    alt: 'Ayesha Raza smiling portrait',

    text: 'RestoOrder completely changed how I think about food delivery. The Wagyu Smash Burger arrived looking exactly like the photo — I literally gasped. This is restaurant quality at home.',

    rating: 5,

    order: 'Wagyu Smash Burger',

    date: '2 days ago',
  },

  {
    id: 2,

    name: 'Bilal Mahmood',

    role: 'Software Engineer',

    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a84db55c-1763293803948.png',

    alt: 'Bilal Mahmood professional headshot',

    text: 'I order here at least 3 times a week. The Dragon Roll Platter is insane — 12 pieces of pure perfection. 25-minute delivery, still cold and fresh. Absolutely unmatched.',

    rating: 5,

    order: 'Dragon Roll Platter',

    date: '1 week ago',
  },

  {
    id: 3,

    name: 'Sana Khan',

    role: 'Chef & Entrepreneur',

    avatar: 'https://images.unsplash.com/photo-1507532459814-b32f63cf4497',

    alt: 'Sana Khan warm smile portrait',

    text: "As a professional chef, I am extremely picky. RestoOrder's Truffle Margherita uses actual San Marzano tomatoes and buffalo mozzarella. I can taste the difference. Extraordinary.",

    rating: 5,

    order: 'Truffle Margherita',

    date: '3 days ago',
  },
];

interface TestimonialsProps {
  isDark: boolean;
}

export default function Testimonials({ isDark }: TestimonialsProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24" style={{ background: isDark ? '#111118' : '#F3F0E8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-1 rounded-full bg-amber-500" />

            <span
              className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-gray-400'}`}
            >
              Reviews
            </span>

            <div className="w-8 h-1 rounded-full bg-amber-500" />
          </div>

          <h2
            className={`text-3xl lg:text-4xl font-display font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            What Our <span className="gradient-text-amber italic">Guests Say</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setActive(i)}
              className={`rounded-3xl p-7 cursor-pointer transition-all duration-400 ${
                active === i
                  ? isDark
                    ? 'glass-card-dark border-amber-500/30 shadow-neon-amber scale-105'
                    : 'bg-white border-amber-200 shadow-xl scale-105'
                  : isDark
                    ? 'glass-card-dark hover:border-white/15'
                    : 'glass-card-light hover:shadow-md'
              }`}
              style={active === i ? { borderColor: 'rgba(245,158,11,0.3)' } : {}}
            >
              {/* Stars */}

              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 star-filled"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}

              <p
                className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`}
              >
                "{t.text}"
              </p>

              {/* Order tag */}

              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                  📦 {t.order}
                </span>
              </div>

              {/* Author */}

              <div
                className="flex items-center gap-3 pt-5 border-t"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
              >
                <div className="relative w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0">
                  <AppImage src={t.avatar} alt={t.alt} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.name}
                  </div>

                  <div className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                    {t.role} · {t.date}
                  </div>
                </div>

                {active === i && (
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
