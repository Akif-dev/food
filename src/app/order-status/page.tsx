'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderSuccess from '../checkout/components/OrderSuccess';
import { useTheme } from '@/contexts/ThemeContext';

export default function OrderStatusPage() {
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
