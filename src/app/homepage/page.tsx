'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from './components/HeroSlider';
import CategoryScroll from './components/CategoryScroll';
import FeaturedItems from './components/FeaturedItems';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart, CartItem } from '@/contexts/CartContext';

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const { cart, addToCart: addToCartGlobal, cartCount } = useCart();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = useCallback(
    (item: any) => {
      const cartItem: CartItem = {
        id: `${item.id}-${Date.now()}`,
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        variation: undefined,
        addons: [],
        spiceLevel: undefined,
      };
      addToCartGlobal(cartItem);
      showToast(`${item.name} added to cart!`);
    },
    [addToCartGlobal]
  );

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <Header
        cartCount={cartCount}
        onCartClick={() => (window.location.href = '/checkout')}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      <main>
        <HeroSlider isDark={isDark} />
        <CategoryScroll isDark={isDark} />
        <FeaturedItems isDark={isDark} onAddToCart={addToCart} />
        <WhyChooseUs isDark={isDark} />
        <Testimonials isDark={isDark} />

        {/* Marquee Banner */}
        <div
          className="py-5 overflow-hidden border-y"
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #F97316)',
            borderColor: 'rgba(245,158,11,0.3)',
          }}
        >
          <div className="marquee-inner">
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="flex items-center gap-8 pr-8">
                {[
                  '🍔 Wagyu Burgers',
                  '🍕 Artisan Pizza',
                  '🍣 Fresh Sushi',
                  '🥩 Premium Grills',
                  '🍰 Handcrafted Desserts',
                  '⚡ 25-Min Delivery',
                  '🌿 Farm Fresh',
                  '💎 Premium Quality',
                ].map((item, i) => (
                  <span
                    key={`${ri}-${i}`}
                    className="text-white font-black text-sm uppercase tracking-widest whitespace-nowrap flex items-center gap-4"
                  >
                    {item}
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <section
          className="py-24 relative overflow-hidden"
          style={{ background: isDark ? '#0A0A0F' : '#FAF8F3' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center px-4">
            <div className="text-6xl mb-6">🍽️</div>
            <h2
              className={`text-4xl lg:text-5xl font-display font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Ready to <span className="gradient-text-amber italic">Order?</span>
            </h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              Browse our full menu of 200+ dishes and place your order in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/menu"
                className="px-10 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                  boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
                }}
              >
                Browse Full Menu →
              </a>
              <a
                href={`https://wa.me/923001234567?text=Hi! I'd like to place an order from RestoOrder`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn px-10 py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer isDark={isDark} />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 toast">
          <div className="glass-card-dark px-6 py-3 rounded-2xl text-white font-semibold text-sm flex items-center gap-3 border border-amber-500/30 shadow-neon-amber">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
