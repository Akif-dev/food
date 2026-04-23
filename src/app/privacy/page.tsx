'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '../menu/components/CartSidebar';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';

export default function PrivacyPage() {
  const { isDark, toggleTheme } = useTheme();
  const { cartCount, cart, updateQty, removeItem } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      <main className="pt-16 lg:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h1
              className={`text-4xl lg:text-5xl font-display font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Privacy <span className="gradient-text-amber italic">Policy</span>
            </h1>
            <p className={`text-base ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              Last updated: April 2026
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Information We Collect
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                We collect information you provide directly to us, such as when you create an
                account, place an order, or contact us. This includes your name, email address,
                phone number, delivery address, and payment information.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                How We Use Your Information
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                We use the information we collect to process your orders, communicate with you about
                your orders, provide customer support, improve our services, and send you
                promotional messages (with your consent).
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Information Sharing
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                We do not sell your personal information. We may share your information with third
                parties who assist us in operating our website, conducting our business, or
                servicing you, such as payment processors and delivery partners.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Data Security
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                We implement appropriate security measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no
                method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Your Rights
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                You have the right to access, correct, or delete your personal information. You may
                also opt out of receiving promotional communications from us at any time.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contact Us
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className={`text-base mt-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Email: contact@icenspice.pk
                <br />
                Phone: +92 321 6638470
              </p>
            </section>
          </div>
        </div>
      </main>

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        isDark={isDark}
      />
      <Footer isDark={isDark} />
    </div>
  );
}
