'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderSummary from './components/OrderSummary';
import CheckoutForm from './components/CheckoutForm';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const { cart, updateQty, removeItem, clearCart, cartCount, orderPlacing, setOrderPlacing } =
    useCart();
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <Header cartCount={cartCount} isDark={isDark} onThemeToggle={toggleTheme} />

      <main className="pt-16 lg:pt-20">
        {/* Page Header */}
        <div
          className="relative py-12 overflow-hidden"
          style={{ background: isDark ? '#111118' : '#F3F0E8' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.07) 0%, transparent 60%)',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-1 rounded-full bg-amber-500" />
              <span
                className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-gray-400'}`}
              >
                Checkout
              </span>
            </div>
            <h1
              className={`text-4xl lg:text-5xl font-display font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Complete Your <span className="gradient-text-amber italic">Order</span>
            </h1>
            <p className={`mt-3 text-base ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              You&apos;re almost there! Review your order and complete checkout.
            </p>

            {/* Steps Indicator */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { label: 'Cart', icon: '🛒', active: true },
                { label: 'Details', icon: '📋', active: true },
                { label: 'Confirm', icon: '✅', active: false },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      background: step.active
                        ? 'rgba(245,158,11,0.15)'
                        : isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.05)',
                      color: step.active ? '#F59E0B' : textMuted,
                      border: `1px solid ${step.active ? 'rgba(245,158,11,0.3)' : borderColor}`,
                    }}
                  >
                    <span>{step.icon}</span>
                    <span>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <svg
                      className="w-4 h-4"
                      style={{ color: textMuted }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {cart.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-7xl mb-6">🛒</div>
              <h2 className="text-3xl font-display font-black mb-4" style={{ color: textPrimary }}>
                Your cart is empty
              </h2>
              <p className="text-base mb-8" style={{ color: textMuted }}>
                Add some delicious items from our menu to get started!
              </p>
              <a
                href="/menu"
                className="inline-block px-10 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                  boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
                }}
              >
                Browse Menu →
              </a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Left: Checkout Form (3/5) */}
              <div className="lg:col-span-3">
                <CheckoutForm
                  items={cart}
                  isDark={isDark}
                  deliveryType={deliveryType}
                  onDeliveryTypeChange={setDeliveryType}
                  onOrderSuccess={(orderData) => {
                    clearCart();
                    router.push(`/order-status?orderId=${orderData.orderId}`);
                  }}
                  orderPlacing={orderPlacing}
                  setOrderPlacing={setOrderPlacing}
                />
              </div>

              {/* Right: Order Summary (2/5) */}
              <div className="lg:col-span-2 lg:sticky lg:top-28">
                <OrderSummary
                  items={cart}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                  isDark={isDark}
                  deliveryType={deliveryType}
                />

                {/* Trust Badges */}
                <div
                  className="mt-4 rounded-3xl p-5"
                  style={{
                    background: isDark ? '#111118' : '#FFFFFF',
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: '🔒', label: 'Secure', desc: 'SSL Encrypted' },
                      { icon: '⚡', label: 'Fast', desc: '25 min delivery' },
                      { icon: '🔄', label: 'Easy', desc: 'Free cancellation' },
                    ].map((badge, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl mb-1">{badge.icon}</div>
                        <div className="text-xs font-bold" style={{ color: textPrimary }}>
                          {badge.label}
                        </div>
                        <div className="text-xs" style={{ color: textMuted }}>
                          {badge.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Support */}
                <div
                  className="mt-4 rounded-3xl p-5 flex items-center gap-3"
                  style={{
                    background: isDark ? '#111118' : '#FFFFFF',
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-lg flex-shrink-0">
                    📞
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold" style={{ color: textPrimary }}>
                      Need help?
                    </div>
                    <div className="text-xs" style={{ color: textMuted }}>
                      Call us: +92 321 6638470
                    </div>
                  </div>
                  <a
                    href="tel:+923216638470"
                    className="text-xs font-bold text-amber-500 hover:underline flex-shrink-0"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
