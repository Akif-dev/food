'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/contexts/ThemeContext';

interface User {
  id: number;
  email: string;
  phone: string | null;
  name: string;
  address: string | null;
  area: string | null;
  city: string | null;
  created_at: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: '',
    area: '',
    city: '',
  });

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const cardBg = isDark ? '#111118' : '#FFFFFF';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      phone: user.phone || '',
      address: user.address || '',
      area: user.area || '',
      city: user.city || 'Karachi',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: editForm.name,
          phone: editForm.phone || null,
          address: editForm.address || null,
          area: editForm.area || null,
          city: editForm.city || 'Karachi',
        })
        .eq('id', editingUser.id);

      if (error) throw error;

      await fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const handleDelete = async (userId: number) => {
    if (
      !confirm(
        'Are you sure you want to delete this user? This will also delete their addresses and favorites.'
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase.from('users').delete().eq('id', userId);

      if (error) throw error;

      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
  );

  if (loading) {
    return (
      <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-amber-500">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: textPrimary }}>
            User Management
          </h1>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
            style={{
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: textPrimary,
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
            style={{
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${borderColor}`,
              color: textPrimary,
            }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            className="p-6 rounded-2xl"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
            >
              Total Users
            </p>
            <p className="text-3xl font-bold mt-2" style={{ color: textPrimary }}>
              {users.length}
            </p>
          </div>
          <div
            className="p-6 rounded-2xl"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
            >
              Users with Phone
            </p>
            <p className="text-3xl font-bold mt-2" style={{ color: textPrimary }}>
              {users.filter((u) => u.phone).length}
            </p>
          </div>
          <div
            className="p-6 rounded-2xl"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
            >
              New This Month
            </p>
            <p className="text-3xl font-bold mt-2" style={{ color: textPrimary }}>
              {
                users.filter((u) => {
                  const created = new Date(u.created_at);
                  const now = new Date();
                  const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                  return created > monthAgo;
                }).length
              }
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: cardBg, border: `1px solid ${borderColor}` }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                style={{
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <tr>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    ID
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    Name
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    Email
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    Phone
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    Address
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    Area
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    City
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    Joined
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ color: textPrimary }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-8 text-center"
                      style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      style={{ borderBottom: `1px solid ${borderColor}` }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: textPrimary }}>
                        #{user.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold" style={{ color: textPrimary }}>
                          {user.name}
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                      >
                        {user.email}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                      >
                        {user.phone || '-'}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                      >
                        {user.address || '-'}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                      >
                        {user.area || '-'}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                      >
                        {user.city || '-'}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                      >
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                              color: 'white',
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                            style={{
                              background: isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.1)',
                              color: '#EF4444',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <div
              className="w-full max-w-md p-6 rounded-2xl"
              style={{ background: cardBg, border: `1px solid ${borderColor}` }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: textPrimary }}>
                Edit User
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: textPrimary }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
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
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
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
                    Address
                  </label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
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
                    Area
                  </label>
                  <input
                    type="text"
                    value={editForm.area}
                    onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
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
                    City
                  </label>
                  <input
                    type="text"
                    value={editForm.city}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${borderColor}`,
                      color: textPrimary,
                    }}
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: textPrimary,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
