'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderSuccess from '../checkout/components/OrderSuccess';
import { useTheme } from '@/contexts/ThemeContext';

// 1. Ek alag component banayein jo searchParams use karega
function OrderStatusContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { isDark, toggleTheme } = useTheme();

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <Header cartCount={0} isDark={isDark} onThemeToggle={toggleTheme} />
      <div className="pt-16 lg:pt-20">
        <OrderSuccess orderId={orderId ? parseInt(orderId) : undefined} isDark={isDark} />
      </div>
      <Footer isDark={isDark} />
    </div>
  );
}

// 2. Main export mein Suspense wrap kar dein
export default function OrderStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading order details...</p>
        </div>
      }
    >
      <OrderStatusContent />
    </Suspense>
  );
}
