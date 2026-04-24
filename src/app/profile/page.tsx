'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Order {
  id: number;
  created_at: string;
  total: number;
  status: string;
  items: any[];
  delivery_type: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateUser, loading: authLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/profile');
      return;
    }

    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setArea(user.area || '');
      setCity(user.city || 'Karachi');
      fetchOrders();
    }
  }, [user, router, authLoading]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError('');
    setUpdateSuccess('');

    const result = await updateUser({ name, phone, address, area, city });

    if (result.success) {
      setUpdateSuccess('Profile updated successfully');
      setEditing(false);
      setTimeout(() => setUpdateSuccess(''), 3000);
    } else {
      setUpdateError(result.error || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-amber-500';
      case 'preparing':
        return 'text-blue-500';
      case 'ready':
        return 'text-purple-500';
      case 'delivered':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (authLoading || loading) {
    return (
      <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
        <Header cartCount={0} onCartClick={() => {}} isDark={isDark} onThemeToggle={toggleTheme} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-amber-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <Header cartCount={0} onCartClick={() => {}} isDark={isDark} onThemeToggle={toggleTheme} />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8" style={{ color: textPrimary }}>
            My Profile
          </h1>

          {/* Profile Section */}
          <div
            className="p-6 rounded-2xl mb-8"
            style={{
              background: isDark ? '#111118' : '#FFFFFF',
              border: `1px solid ${borderColor}`,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: textPrimary }}>
                Account Information
              </h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                    color: 'white',
                  }}
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: textPrimary }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: inputBg,
                      border: `1px solid ${borderColor}`,
                      color: textPrimary,
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: textPrimary }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 opacity-50"
                    style={{
                      background: inputBg,
                      border: `1px solid ${borderColor}`,
                      color: textPrimary,
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: textPrimary }}
                  >
                    Phone
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
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: textPrimary }}
                  >
                    Street Address
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
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: textPrimary }}
                  >
                    Area / Locality
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
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: textPrimary }}
                  >
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
                  />
                </div>

                {updateError && <p className="text-red-400 text-sm">{updateError}</p>}
                {updateSuccess && <p className="text-green-400 text-sm">{updateSuccess}</p>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setName(user.name);
                      setPhone(user.phone || '');
                      setAddress(user.address || '');
                      setArea(user.area || '');
                      setCity(user.city || 'Karachi');
                      setUpdateError('');
                      setUpdateSuccess('');
                    }}
                    className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: textPrimary,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    Full Name
                  </label>
                  <p className="text-lg font-semibold" style={{ color: textPrimary }}>
                    {user.name}
                  </p>
                </div>
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    Email
                  </label>
                  <p className="text-lg font-semibold" style={{ color: textPrimary }}>
                    {user.email}
                  </p>
                </div>
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    Phone
                  </label>
                  <p className="text-lg font-semibold" style={{ color: textPrimary }}>
                    {user.phone || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    Address
                  </label>
                  <p className="text-lg font-semibold" style={{ color: textPrimary }}>
                    {user.address || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    Area / Locality
                  </label>
                  <p className="text-lg font-semibold" style={{ color: textPrimary }}>
                    {user.area || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    City
                  </label>
                  <p className="text-lg font-semibold" style={{ color: textPrimary }}>
                    {user.city || 'Not provided'}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t" style={{ borderColor }}>
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-xl font-semibold text-red-500 transition-all hover:scale-105"
                style={{
                  background: isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.05)',
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Order History Section */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: isDark ? '#111118' : '#FFFFFF',
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: textPrimary }}>
              Order History
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-amber-500 animate-pulse">Loading orders...</div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}>
                  No orders yet.{' '}
                  <Link href="/menu" className="text-amber-500 hover:underline">
                    Start ordering
                  </Link>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold" style={{ color: textPrimary }}>
                          Order #{order.id}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                        >
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg" style={{ color: textPrimary }}>
                          ₨{order.total.toLocaleString()}
                        </p>
                        <p className={`text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-2 text-sm"
                      style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                    >
                      <span>
                        {order.delivery_type === 'delivery' ? '🚗 Delivery' : '🏃 Pickup'}
                      </span>
                      <span>•</span>
                      <span>
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
