'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function NotFound() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <h1
              className="text-[150px] font-display font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: 0.15,
              }}
            >
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="text-6xl">🍽️</div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-black mb-4" style={{ color: textPrimary }}>
            Page Not Found
          </h2>
          <p className="text-lg mb-8" style={{ color: textMuted }}>
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to
            delicious food!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                color: textPrimary,
              }}
            >
              ← Go Back
            </button>

            <Link
              href="/"
              className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
