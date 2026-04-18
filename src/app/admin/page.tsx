'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    menuItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ordersResult, menuItemsResult] = await Promise.all([
        supabase.from('orders').select('total, status'),
        supabase.from('menu_items').select('id', { count: 'exact', head: true }),
      ]);

      if (ordersResult.data) {
        const orders = ordersResult.data;
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const pendingOrders = orders.filter((order) => order.status === 'pending').length;

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          pendingOrders,
          menuItems: menuItemsResult.count || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '📋',
      color: 'bg-blue-500/15',
      textColor: 'text-blue-500',
    },
    {
      title: 'Total Revenue',
      value: `₨${stats.totalRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'bg-green-500/15',
      textColor: 'text-green-500',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: '⏳',
      color: 'bg-amber-500/15',
      textColor: 'text-amber-500',
    },
    {
      title: 'Menu Items',
      value: stats.menuItems,
      icon: '🍔',
      color: 'bg-purple-500/15',
      textColor: 'text-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-amber-500 text-xl animate-pulse font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6" style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className={`p-6 rounded-2xl ${stat.color} ${stat.textColor}`}
            style={{
              background: isDark ? '#111118' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <div
                className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div
              className="text-sm font-medium"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
            >
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      <div
        className="p-6 rounded-2xl"
        style={{
          background: isDark ? '#111118' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="p-4 rounded-xl text-left transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #F97316)',
              color: 'white',
            }}
          >
            <div className="text-2xl mb-2">🍔</div>
            <div className="font-bold">Add Menu Item</div>
            <div className="text-sm opacity-80">Create new dish</div>
          </button>
          <button
            className="p-4 rounded-xl text-left transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: 'white',
            }}
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-bold">View Orders</div>
            <div className="text-sm opacity-80">Manage orders</div>
          </button>
          <button
            className="p-4 rounded-xl text-left transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: 'white',
            }}
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-bold">Analytics</div>
            <div className="text-sm opacity-80">View reports</div>
          </button>
        </div>
      </div>
    </div>
  );
}
