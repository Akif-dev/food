'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase, Order } from '@/lib/supabase';
import { useTheme } from '@/contexts/ThemeContext';

export default function OrderManagement() {
  const { isDark } = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const fetchOrders = useCallback(async () => {
    try {
      let query = supabase.from('orders').select('*').order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  const statusColors = {
    pending: 'bg-amber-500/15 text-amber-500',
    completed: 'bg-green-500/15 text-green-500',
    cancelled: 'bg-red-500/15 text-red-500',
  };

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  if (loading) {
    return <div className="text-amber-500 text-xl animate-pulse font-bold">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6" style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>
        Order Management
      </h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value as any)}
            className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
              filter === option.value
                ? 'bg-amber-500 text-white'
                : isDark
                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                  : 'bg-black/5 text-gray-600 hover:bg-black/10'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-2xl"
            style={{
              background: isDark ? '#111118' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-bold text-lg"
                    style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}
                  >
                    Order #{order.id}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status as keyof typeof statusColors]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div
                  className="text-sm"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                >
                  {new Date(order.created_at).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="font-bold text-xl"
                  style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}
                >
                  ₨{order.total.toLocaleString()}
                </div>
                <div
                  className="text-sm"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                >
                  {order.delivery_type}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div
                  className="text-xs font-medium mb-1"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                >
                  Customer
                </div>
                <div style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>{order.customer_name}</div>
                <div style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}>
                  {order.customer_phone}
                </div>
              </div>
              {order.delivery_address && (
                <div>
                  <div
                    className="text-xs font-medium mb-1"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    Address
                  </div>
                  <div style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>
                    {order.delivery_address}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="text-xs font-medium mb-2"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
              >
                Items
              </div>
              <div className="space-y-3">
                {Array.isArray(order.items) &&
                  order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl"
                      style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                    >
                      <div
                        className="flex justify-between text-sm font-bold mb-1"
                        style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}
                      >
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>₨{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                      {item.variation && (
                        <div
                          className="text-xs"
                          style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                        >
                          Size: {item.variation}
                        </div>
                      )}
                      {item.spice_level && (
                        <div
                          className="text-xs"
                          style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                        >
                          🌶️ Spice: {item.spice_level}
                        </div>
                      )}
                      {item.addons && Array.isArray(item.addons) && item.addons.length > 0 && (
                        <div
                          className="text-xs"
                          style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                        >
                          ✨ Addons: {item.addons.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {order.special_instructions && (
              <div className="mb-4">
                <div
                  className="text-xs font-medium mb-1"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                >
                  Special Instructions
                </div>
                <div className="text-sm" style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>
                  {order.special_instructions}
                </div>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="px-4 py-2 rounded-xl font-medium transition-all bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    Accept & Complete
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="px-4 py-2 rounded-xl font-medium transition-all bg-red-500 text-white hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <div className="text-xl font-bold mb-2" style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>
            No orders found
          </div>
          <div style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}>
            Orders will appear here when customers place them
          </div>
        </div>
      )}
    </div>
  );
}
