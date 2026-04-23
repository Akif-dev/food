'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '../menu/components/CartSidebar';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';

export default function TermsPage() {
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
              Terms of <span className="gradient-text-amber italic">Service</span>
            </h1>
            <p className={`text-base ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              Last updated: April 2026
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Acceptance of Terms
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                By accessing or using Ice n Spice&apos;s website and ordering services, you agree to
                be bound by these Terms of Service. If you do not agree to these terms, please do
                not use our services.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Orders and Payment
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                All orders are subject to availability. We reserve the right to refuse or cancel any
                order for any reason. Prices are subject to change without notice. Payment is due at
                the time of ordering unless otherwise specified.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Delivery
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                Delivery times are estimates and not guaranteed. We are not responsible for delays
                caused by weather, traffic, or other circumstances beyond our control. Free delivery
                may be subject to minimum order requirements.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Cancellations and Refunds
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                Orders may be cancelled within 15 minutes of placement. After that time,
                cancellations are at our discretion. Refunds will be processed within 5-7 business
                days to the original payment method.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Allergies and Dietary Restrictions
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                While we take precautions to accommodate dietary restrictions, we cannot guarantee
                that our food is completely free of allergens. Please inform us of any allergies
                when placing your order.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                User Accounts
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                You are responsible for maintaining the confidentiality of your account information.
                You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Limitation of Liability
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                Ice n Spice shall not be liable for any indirect, incidental, special, or
                consequential damages arising out of or in connection with the use of our services.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Changes to Terms
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                We reserve the right to modify these terms at any time. Continued use of our
                services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contact Us
              </h2>
              <p
                className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              >
                For questions about these Terms of Service, please contact us at:
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
