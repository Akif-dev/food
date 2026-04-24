'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { isDark } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Karachi');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(name, email, phone, password, address, area, city);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
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
              Create Account
            </h1>
            <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}>
              Join us and start ordering delicious food
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                style={{
                  background: inputBg,
                  border: `1px solid ${error ? '#EF4444' : borderColor}`,
                  color: textPrimary,
                }}
                placeholder="Enter your full name"
                required
              />
            </div>

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
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                Phone (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                style={{
                  background: inputBg,
                  border: `1px solid ${borderColor}`,
                  color: textPrimary,
                }}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                Street Address (Optional)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                style={{
                  background: inputBg,
                  border: `1px solid ${borderColor}`,
                  color: textPrimary,
                }}
                placeholder="Enter your street address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                Area / Locality (Optional)
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                style={{
                  background: inputBg,
                  border: `1px solid ${borderColor}`,
                  color: textPrimary,
                }}
                placeholder="e.g., DHA, Gulshan, PECHS..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                style={{
                  background: inputBg,
                  border: `1px solid ${borderColor}`,
                  color: textPrimary,
                }}
                placeholder="Enter your city"
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
                placeholder="Create a password (min 6 characters)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                style={{
                  background: inputBg,
                  border: `1px solid ${error ? '#EF4444' : borderColor}`,
                  color: textPrimary,
                }}
                placeholder="Confirm your password"
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}>
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold hover:text-amber-500 transition-colors"
                style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}
              >
                Sign in
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
