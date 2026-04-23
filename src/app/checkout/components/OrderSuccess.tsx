'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface OrderSuccessProps {
  orderId?: number;
  isDark: boolean;
}

export default function OrderSuccess({ orderId, isDark }: OrderSuccessProps) {
  const [show, setShow] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').eq('id', orderId).single();
    if (data) {
      setOrderData(data);
    }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;
    fetchOrder();
  }, [fetchOrder, orderId]);

  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const sectionBg = isDark ? '#111118' : '#FFFFFF';

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-all duration-700 ${show ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: isDark ? '#0A0A0F' : '#FAF8F3' }}
    >
      <div className="max-w-lg w-full text-center">
        {loading ? (
          <div className="py-20">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto mb-4" />
            <p style={{ color: textMuted }}>Loading order details...</p>
          </div>
        ) : !orderData ? (
          <div className="py-20">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-display font-black mb-2" style={{ color: textPrimary }}>
              Order Not Found
            </h2>
            <p className="text-sm mb-6" style={{ color: textMuted }}>
              Unable to load order details.
            </p>
            <Link
              href="/menu"
              className="inline-block px-8 py-3 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
              }}
            >
              Go to Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Success Animation */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div
                className="absolute w-32 h-32 rounded-full opacity-20 animate-ping"
                style={{ background: '#10B981' }}
              />
              <div
                className="absolute w-24 h-24 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, #10B981, transparent)' }}
              />
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  boxShadow: '0 0 40px rgba(16,185,129,0.5)',
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-display font-black mb-2" style={{ color: textPrimary }}>
              Order <span className="gradient-text-amber italic">Confirmed!</span>
            </h1>
            <p className="text-base mb-2" style={{ color: textMuted }}>
              Thank you,{' '}
              <span className="font-bold" style={{ color: textPrimary }}>
                {orderData.customer_name}
              </span>
              ! 🎉
            </p>
            <p className="text-sm mb-8" style={{ color: textMuted }}>
              Your order has been received and is being prepared with love.
            </p>

            {/* Order Details Card */}
            <div
              className="rounded-3xl p-6 text-left mb-6"
              style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
            >
              <div
                className="flex items-center justify-between mb-4 pb-4 border-b"
                style={{ borderColor }}
              >
                <div>
                  <div
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ color: textMuted }}
                  >
                    Order Number
                  </div>
                  <div className="text-xl font-display font-black text-amber-500">
                    RO-{orderData.id.toString().padStart(6, '0')}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ color: textMuted }}
                  >
                    Total Paid
                  </div>
                  <div className="text-xl font-display font-black" style={{ color: textPrimary }}>
                    ₨{orderData.total?.toLocaleString() || 0}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {orderData.items?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl"
                    style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                  >
                    <div className="flex justify-between items-center text-sm font-bold mb-1">
                      <span style={{ color: textPrimary }}>
                        {item.quantity}× {item.name}
                      </span>
                      <span className="font-bold text-amber-500">
                        ₨{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    {item.variation && (
                      <div className="text-xs" style={{ color: textMuted }}>
                        Size: {item.variation}
                      </div>
                    )}
                    {item.spice_level && (
                      <div className="text-xs" style={{ color: textMuted }}>
                        🌶️ {item.spice_level}
                      </div>
                    )}
                    {item.addons && item.addons.length > 0 && (
                      <div className="text-xs" style={{ color: textMuted }}>
                        ✨ Addons: {item.addons.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor }}>
                <div
                  className="rounded-2xl p-3"
                  style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wide mb-1"
                    style={{ color: textMuted }}
                  >
                    Delivery
                  </div>
                  <div className="text-sm font-bold" style={{ color: textPrimary }}>
                    {orderData.delivery_type === 'delivery' ? '🚚 Home Delivery' : '🏪 Self Pickup'}
                  </div>
                </div>
                <div
                  className="rounded-2xl p-3"
                  style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wide mb-1"
                    style={{ color: textMuted }}
                  >
                    Est. Time
                  </div>
                  <div className="text-sm font-bold" style={{ color: textPrimary }}>
                    {orderData.delivery_type === 'delivery' ? '⚡ 25–35 min' : '⏱ 15–20 min'}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/menu"
                className="flex-1 py-4 rounded-2xl font-bold text-white text-center text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                  boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
                }}
              >
                Order More 🍽️
              </Link>
              <Link
                href="/"
                className="flex-1 py-4 rounded-2xl font-bold text-base text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  color: textPrimary,
                  border: `1.5px solid ${borderColor}`,
                }}
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
