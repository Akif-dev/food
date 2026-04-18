'use client';

import { useState } from 'react';

import { supabase } from '@/lib/supabase';

interface CartItem {
  id: string;

  itemId: number;

  name: string;

  price: number;

  quantity: number;

  image: string;

  variation?: string;

  addons: string[];

  spiceLevel?: string;
}

interface CheckoutFormProps {
  items: CartItem[];

  isDark: boolean;

  deliveryType: 'delivery' | 'pickup';

  onDeliveryTypeChange: (type: 'delivery' | 'pickup') => void;

  onOrderSuccess: (orderData: any) => void;

  orderPlacing: boolean;

  setOrderPlacing: (placing: boolean) => void;
}

export default function CheckoutForm({
  items,

  isDark,

  deliveryType,

  onDeliveryTypeChange,

  onOrderSuccess,

  setOrderPlacing,
}: CheckoutFormProps) {
  const [form, setForm] = useState({
    name: '',

    phone: '',

    email: '',

    address: '',

    area: '',

    city: 'Karachi',

    notes: '',

    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const deliveryFee = deliveryType === 'delivery' ? (subtotal > 2000 ? 0 : 200) : 0;

  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + deliveryFee + tax;

  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';

  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';

  const sectionBg = isDark ? '#111118' : '#FFFFFF';

  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-300`;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';

    if (!form.phone.trim() || form.phone.length < 10)
      newErrors.phone = 'Valid phone number required';

    if (deliveryType === 'delivery' && !form.address.trim())
      newErrors.address = 'Delivery address is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (items.length === 0) return;

    setSubmitting(true);

    setOrderPlacing(true);

    try {
      // Prepare order items

      const orderItems = items.map((item) => ({
        id: `${item.id}-${Date.now()}`,

        menu_item_id: item.itemId,

        name: item.name,

        price: item.price,

        quantity: item.quantity,

        variation: item.variation,

        addons: item.addons,

        spice_level: item.spiceLevel,
      }));

      console.warn('Submitting order:', {
        customer_name: form.name,

        customer_phone: form.phone,

        delivery_type: deliveryType,

        items: orderItems,

        subtotal,

        delivery_fee: deliveryFee,

        tax,

        total,
      });

      // Save order to Supabase

      const { data, error } = await supabase

        .from('orders')

        .insert({
          customer_name: form.name,

          customer_phone: form.phone,

          customer_email: form.email || null,

          delivery_address: deliveryType === 'delivery' ? form.address : null,

          delivery_type: deliveryType,

          items: orderItems,

          subtotal,

          delivery_fee: deliveryFee,

          tax,

          total,

          status: 'pending',

          payment_method: form.paymentMethod,

          special_instructions: form.notes || null,
        })

        .select()

        .single();

      if (error) {
        console.error('Supabase error:', error);

        throw error;
      }

      console.warn('Order saved successfully:', data);

      const orderNumber = `RO-${data.id.toString().padStart(6, '0')}`;

      onOrderSuccess({ ...form, deliveryType, total, orderNumber, items, orderId: data.id });
    } catch (error: any) {
      console.error('Error saving order:', error);

      alert(`Failed to place order: ${error.message || 'Unknown error'}. Please try again.`);
    } finally {
      setSubmitting(false);
      setOrderPlacing(false);
    }
  };

  const handleWhatsApp = () => {
    if (!validate()) return;

    const orderText = items

      .map(
        (i) =>
          `• ${i.quantity}x ${i.name}${i.variation ? ` (${i.variation})` : ''}${i.addons.length ? ` [+${i.addons.join(', ')}]` : ''} - ₨${(i.price * i.quantity).toLocaleString()}`
      )

      .join('\n');

    const msg = `🍽️ *New Order from Ice n Spice*\n\n*Customer:* ${form.name}\n*Phone:* ${form.phone}\n*Type:* ${deliveryType === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}${deliveryType === 'delivery' ? `\n*Address:* ${form.address}, ${form.area}, ${form.city}` : ''}\n\n*Order Details:*\n${orderText}\n\n*Subtotal:* ₨${subtotal.toLocaleString()}\n*Delivery:* ${deliveryFee === 0 ? 'FREE' : `₨${deliveryFee}`}\n*Tax:* ₨${tax.toLocaleString()}\n*Total:* ₨${total.toLocaleString()}\n\n*Payment:* ${form.paymentMethod === 'cod' ? 'Cash on Delivery' : form.paymentMethod === 'card' ? 'Card' : 'Bank Transfer'}${form.notes ? `\n\n*Notes:* ${form.notes}` : ''}`;

    window.open(`https://wa.me/923216638470?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const inputStyle = (field: string) => ({
    background: errors[field] ? 'rgba(239,68,68,0.08)' : inputBg,

    border: `1.5px solid ${errors[field] ? '#EF4444' : borderColor}`,

    color: textPrimary,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Delivery Type */}

      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
      >
        <div className="px-6 py-5 border-b" style={{ borderColor }}>
          <h2 className="font-display font-black text-xl" style={{ color: textPrimary }}>
            Delivery Method
          </h2>
        </div>

        <div className="px-6 py-5 grid grid-cols-2 gap-3">
          {[
            { id: 'delivery', label: 'Home Delivery', icon: '🚚', desc: 'Delivered to your door' },

            { id: 'pickup', label: 'Self Pickup', icon: '🏪', desc: 'Pick up from restaurant' },
          ].map((opt) => {
            const isSelected = deliveryType === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onDeliveryTypeChange(opt.id as 'delivery' | 'pickup')}
                className={`p-4 rounded-2xl text-left transition-all duration-300 ${isSelected ? 'scale-105' : 'hover:scale-102'}`}
                style={{
                  background: isSelected ? 'rgba(245,158,11,0.12)' : inputBg,

                  border: `1.5px solid ${isSelected ? '#F59E0B' : borderColor}`,

                  boxShadow: isSelected ? '0 4px 20px rgba(245,158,11,0.2)' : 'none',
                }}
              >
                <div className="text-2xl mb-2">{opt.icon}</div>

                <div
                  className="text-sm font-bold"
                  style={{ color: isSelected ? '#F59E0B' : textPrimary }}
                >
                  {opt.label}
                </div>

                <div className="text-xs mt-0.5" style={{ color: textMuted }}>
                  {opt.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Details */}

      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
      >
        <div className="px-6 py-5 border-b" style={{ borderColor }}>
          <h2 className="font-display font-black text-xl" style={{ color: textPrimary }}>
            Your Details
          </h2>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                style={{ color: textMuted }}
              >
                Full Name *
              </label>

              <input
                type="text"
                placeholder="Ahmed Raza"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
                style={inputStyle('name')}
                aria-label="Full name"
              />

              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label
                className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                style={{ color: textMuted }}
              >
                Phone Number *
              </label>

              <input
                type="tel"
                placeholder="+92 300 1234567"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={inputClass}
                style={inputStyle('phone')}
                aria-label="Phone number"
              />

              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
              style={{ color: textMuted }}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="ahmed@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputClass}
              style={{
                background: inputBg,

                border: `1.5px solid ${borderColor}`,

                color: textPrimary,
              }}
              aria-label="Email address"
            />
          </div>

          {deliveryType === 'delivery' && (
            <>
              <div>
                <label
                  className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                  style={{ color: textMuted }}
                >
                  Street Address *
                </label>

                <input
                  type="text"
                  placeholder="House No. 12, Street 5, DHA Phase 6"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className={inputClass}
                  style={inputStyle('address')}
                  aria-label="Street address"
                />

                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                    style={{ color: textMuted }}
                  >
                    Area / Locality
                  </label>

                  <input
                    type="text"
                    placeholder="DHA, Gulshan, PECHS..."
                    value={form.area}
                    onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                    className={inputClass}
                    style={{
                      background: inputBg,

                      border: `1.5px solid ${borderColor}`,

                      color: textPrimary,
                    }}
                    aria-label="Area"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                    style={{ color: textMuted }}
                  >
                    City
                  </label>

                  <select
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className={inputClass}
                    style={{
                      background: inputBg,

                      border: `1.5px solid ${borderColor}`,

                      color: textPrimary,
                    }}
                    aria-label="City"
                  >
                    {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'].map(
                      (c) => (
                        <option
                          key={c}
                          value={c}
                          style={{ background: isDark ? '#111118' : '#fff' }}
                        >
                          {c}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label
              className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
              style={{ color: textMuted }}
            >
              Special Instructions
            </label>

            <textarea
              placeholder="Any special requests? Allergies? Preferred spice level?"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              className={`${inputClass} resize-none`}
              style={{
                background: inputBg,

                border: `1.5px solid ${borderColor}`,

                color: textPrimary,
              }}
              aria-label="Special instructions"
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}

      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
      >
        <div className="px-6 py-5 border-b" style={{ borderColor }}>
          <h2 className="font-display font-black text-xl" style={{ color: textPrimary }}>
            Payment Method
          </h2>
        </div>

        <div className="px-6 py-5 space-y-3">
          {[
            {
              id: 'cod',

              label: 'Cash on Delivery',

              icon: '💵',

              desc: 'Pay when your order arrives',
            },

            {
              id: 'card',

              label: 'Debit / Credit Card',

              icon: '💳',

              desc: 'Visa, Mastercard, UnionPay',
            },

            { id: 'bank', label: 'Bank Transfer', icon: '🏦', desc: 'JazzCash, EasyPaisa, HBL' },
          ].map((method) => {
            const isSelected = form.paymentMethod === method.id;

            return (
              <div
                key={method.id}
                onClick={() => setForm((f) => ({ ...f, paymentMethod: method.id }))}
                className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300"
                style={{
                  background: isSelected ? 'rgba(245,158,11,0.08)' : inputBg,

                  border: `1.5px solid ${isSelected ? '#F59E0B' : borderColor}`,
                }}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' && setForm((f) => ({ ...f, paymentMethod: method.id }))
                }
              >
                <div className="text-2xl">{method.icon}</div>

                <div className="flex-1">
                  <div
                    className="text-sm font-bold"
                    style={{ color: isSelected ? '#F59E0B' : textPrimary }}
                  >
                    {method.label}
                  </div>

                  <div className="text-xs mt-0.5" style={{ color: textMuted }}>
                    {method.desc}
                  </div>
                </div>

                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ borderColor: isSelected ? '#F59E0B' : borderColor }}
                >
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={submitting || items.length === 0}
          className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-3"
          style={{
            background: submitting ? '#10B981' : 'linear-gradient(135deg, #F59E0B, #F97316)',

            boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
          }}
        >
          {submitting ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Processing Order...
            </>
          ) : (
            <>
              🎉 Place Order — ₨
              {(
                items.reduce((s, i) => s + i.price * i.quantity, 0) +
                (deliveryType === 'delivery'
                  ? items.reduce((s, i) => s + i.price * i.quantity, 0) > 2000
                    ? 0
                    : 200
                  : 0) +
                Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 0.05)
              ).toLocaleString()}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          disabled={items.length === 0}
          className="whatsapp-btn w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-3 disabled:opacity-60"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Order via WhatsApp
        </button>
      </div>
    </form>
  );
}
