'use client';

import { useEffect, useState } from 'react';
import { supabase, MenuItem, Category } from '@/lib/supabase';
import { useTheme } from '@/contexts/ThemeContext';

export default function MenuManagement() {
  const { isDark } = useTheme();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    available: true,
  });

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        image_url: formData.image_url,
        available: formData.available,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update(payload)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('menu_items').insert(payload);
        if (error) throw error;
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
        available: true,
      });
      fetchMenuItems();
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Error saving menu item');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) throw error;
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Error deleting menu item');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category_id: item.category || '',
      image_url: item.image_url,
      available: item.available,
    });
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-amber-500 text-xl animate-pulse font-bold">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold" style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>
          Menu Management
        </h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category_id: '',
              image_url: '',
              available: true,
            });
            setShowModal(true);
          }}
          className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
        >
          + Add Item
        </button>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: isDark ? '#111118' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
              <th
                className="px-6 py-4 text-left text-sm font-semibold"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
              >
                Image
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
              >
                Name
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
              >
                Price
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
              >
                Category
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
              >
                Status
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr
                key={item.id}
                className="border-t transition-colors hover:bg-amber-500/5"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              >
                <td className="px-6 py-4">
                  <img
                    src={item.image_url || '/assets/images/no_image.png'}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold" style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}>
                    {item.name}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    {item.description}
                  </div>
                </td>
                <td
                  className="px-6 py-4 font-semibold"
                  style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}
                >
                  ₨{item.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div
                    className="text-sm"
                    style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                  >
                    {item.category_id
                      ? categories.find((c) => c.id === item.category_id)?.name || 'Unknown'
                      : 'No Category'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.available
                        ? 'bg-emerald-500/15 text-emerald-500'
                        : 'bg-red-500/15 text-red-500'
                    }`}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        background: isDark
                          ? 'bg-blue-500/15 text-blue-500'
                          : 'bg-blue-100 text-blue-700',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        background: isDark
                          ? 'bg-red-500/15 text-red-500'
                          : 'bg-red-100 text-red-700',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6"
            style={{ background: isDark ? '#111118' : '#FFFFFF' }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}
            >
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: isDark ? '#F5F5F0' : '#1A1A24',
                  }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                >
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: isDark ? '#F5F5F0' : '#1A1A24',
                  }}
                  rows={3}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                >
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: isDark ? '#F5F5F0' : '#1A1A24',
                  }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                >
                  Category
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: isDark ? '#F5F5F0' : '#1A1A24',
                  }}
                >
                  <option value="">No Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                >
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: isDark ? '#F5F5F0' : '#1A1A24',
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="w-5 h-5"
                />
                <label
                  htmlFor="available"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#6B6B7A' }}
                >
                  Available
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
                >
                  {editingItem ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold transition-all"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    color: isDark ? '#F5F5F0' : '#1A1A24',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
