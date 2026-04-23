'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDark, toggleTheme } = useTheme();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredPassword =
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'admin123';

    if (password === requiredPassword) {
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `admin_password=${password}; path=/; max-age=86400${isSecure ? '; Secure' : ''}; SameSite=Lax`;
      const redirect = searchParams.get('redirect') || '/admin';
      router.push(redirect);
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="w-full max-w-md p-8 rounded-3xl"
          style={{
            background: isDark ? '#111118' : '#FFFFFF',
            border: `1px solid ${borderColor}`,
          }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
              🍽️
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: textPrimary }}>
              Admin Login
            </h1>
            <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}>
              Enter your password to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                style={{
                  background: inputBg,
                  border: `1px solid ${error ? '#EF4444' : borderColor}`,
                  color: textPrimary,
                }}
                placeholder="Enter password"
                autoFocus
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
              }}
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm hover:text-amber-500 transition-colors"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
            >
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
