'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart, CartItem } from '@/contexts/CartContext';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { isDark, toggleTheme } = useTheme();
  const { cart, addToCart: addToCartGlobal, updateQty, removeItem, cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = useCallback(
    (item: CartItem) => {
      addToCartGlobal(item);
      showToast(`${item.name} added to cart!`);
      setCartOpen(true);
    },
    [addToCartGlobal]
  );

  return (
    <div
      style={{ background: isDark ? '#0A0A0F' : '#FAF8F3', minHeight: '100vh' }}
      className="theme-transition"
    >
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      <main className="pt-16 lg:pt-20">
        {/* Page Header */}
        <div
          className="relative py-16 overflow-hidden"
          style={{ background: isDark ? '#111118' : '#F3F0E8' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.07) 0%, transparent 60%)',
            }}
          />
          <div className="lightning-container opacity-30">
            <div className="lightning-bolt" />
            <div className="lightning-bolt" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-1 rounded-full bg-amber-500" />
              <span
                className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-gray-400'}`}
              >
                Our Menu
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1
                  className={`text-4xl lg:text-5xl font-display font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Explore <span className="gradient-text-amber italic">Every Dish</span>
                </h1>
                <p
                  className={`mt-3 text-base max-w-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}
                >
                  200+ handcrafted dishes — filter by category, customize your order, and add to
                  cart in seconds.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold ${isDark ? 'bg-white/6 text-white/70' : 'bg-black/5 text-gray-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Kitchen Open
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold ${isDark ? 'bg-white/6 text-white/70' : 'bg-black/5 text-gray-600'}`}
                >
                  ⚡ 25min Delivery
                </div>
              </div>
            </div>
          </div>
        </div>

        <MenuGrid isDark={isDark} onAddToCart={addToCart} initialCategory={initialCategory} />
      </main>

      <Footer isDark={isDark} />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        isDark={isDark}
      />

      {/* Floating Cart Button (mobile) */}
      {cartCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white font-bold shadow-2xl transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #F97316)',
            boxShadow: '0 8px 30px rgba(245,158,11,0.4)',
          }}
          aria-label="View cart"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>{cartCount} items</span>
          <span className="font-display font-black">
            ₨{cart.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}
          </span>
        </button>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 toast pointer-events-none">
          <div className="glass-card-dark px-6 py-3 rounded-2xl text-white font-semibold text-sm flex items-center gap-3 border border-amber-500/30 shadow-neon-amber">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: '#0A0A0F' }}
        >
          <div className="text-amber-500 text-2xl animate-pulse font-display font-black">
            Loading Menu...
          </div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
