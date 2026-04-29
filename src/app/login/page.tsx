'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // PRODUCTION FIX:
        // Localhost par router.push chal jata hai, lekin live URL par
        // Middleware ko fresh cookies dene ke liye window.location zaroori hai.
        const redirect = searchParams.get('redirect') || '/admin';

        if (typeof window !== 'undefined') {
          window.location.href = redirect;
        }
      } else {
        setError(result.error || 'Login failed');
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
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
              Welcome Back
            </h1>
            <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                style={{
                  background: inputBg,
                  border: `1px solid ${error ? '#EF4444' : borderColor}`,
                  color: textPrimary,
                }}
                placeholder="Enter your email"
                required
                autoFocus
              />
            </div>

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
                placeholder="Enter your password"
                required
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}>
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-semibold hover:text-amber-500 transition-colors"
                style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
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
