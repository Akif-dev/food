'use client';

import AppImage from '@/components/ui/AppImage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variation?: string;
  addons: string[];
  spiceLevel?: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  isDark: boolean;
  deliveryType: 'delivery' | 'pickup';
}

export default function OrderSummary({
  items,
  onUpdateQty,
  onRemove,
  isDark,
  deliveryType,
}: OrderSummaryProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = deliveryType === 'delivery' ? (subtotal > 2000 ? 0 : 200) : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';
  const itemBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const sectionBg = isDark ? '#111118' : '#FFFFFF';

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b" style={{ borderColor }}>
        <h2 className="font-display font-black text-xl" style={{ color: textPrimary }}>
          Order Summary
        </h2>
        <p className="text-xs mt-0.5" style={{ color: textMuted }}>
          {items.reduce((s, i) => s + i.quantity, 0)} items
        </p>
      </div>

      {/* Items */}
      <div className="px-6 py-4 space-y-3 max-h-80 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🛒</div>
            <p className="text-sm font-semibold" style={{ color: textPrimary }}>
              Your cart is empty
            </p>
            <a
              href="/menu"
              className="inline-block mt-3 text-xs font-bold text-amber-500 hover:underline"
            >
              Browse Menu →
            </a>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 rounded-2xl"
              style={{ background: itemBg, border: `1px solid ${borderColor}` }}
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                <AppImage src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="text-sm font-bold leading-tight" style={{ color: textPrimary }}>
                    {item.name}
                  </h4>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="flex-shrink-0 text-xs w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-all"
                    style={{ color: textMuted }}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
                {item.variation && (
                  <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                    Size: {item.variation}
                  </p>
                )}
                {item.spiceLevel && (
                  <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                    🌶️ {item.spiceLevel}
                  </p>
                )}
                {item.addons.length > 0 && (
                  <p className="text-xs mt-0.5 truncate" style={{ color: textMuted }}>
                    ✨ + {item.addons.join(', ')}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-amber-500/15 transition-colors"
                      style={{ color: textPrimary }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span
                      className="w-5 text-center text-sm font-black"
                      style={{ color: textPrimary }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold bg-amber-500 text-white hover:bg-amber-400 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-black text-amber-500">
                    ₨{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Price Breakdown */}
      <div className="px-6 py-5 border-t space-y-2.5" style={{ borderColor }}>
        <div className="flex justify-between text-sm" style={{ color: textMuted }}>
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>₨{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm" style={{ color: textMuted }}>
          <span>{deliveryType === 'pickup' ? 'Pickup' : 'Delivery Fee'}</span>
          <span className={deliveryFee === 0 ? 'text-emerald-400 font-semibold' : ''}>
            {deliveryType === 'pickup'
              ? 'FREE 🎉'
              : deliveryFee === 0
                ? 'FREE 🎉'
                : `₨${deliveryFee}`}
          </span>
        </div>
        <div className="flex justify-between text-sm" style={{ color: textMuted }}>
          <span>Service Tax (5%)</span>
          <span>₨{tax.toLocaleString()}</span>
        </div>
        {deliveryType === 'delivery' && deliveryFee > 0 && (
          <p className="text-xs" style={{ color: textMuted }}>
            💡 Add ₨{(2000 - subtotal).toLocaleString()} more for free delivery
          </p>
        )}
        <div
          className="flex justify-between font-black text-lg pt-3 border-t"
          style={{ borderColor, color: textPrimary }}
        >
          <span>Total</span>
          <span style={{ color: '#F59E0B' }}>₨{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="px-6 pb-5">
        <div
          className="flex gap-2 p-1 rounded-2xl"
          style={{ background: itemBg, border: `1px solid ${borderColor}` }}
        >
          <input
            type="text"
            placeholder="Promo code..."
            className="flex-1 bg-transparent text-sm font-medium outline-none px-3 py-2"
            style={{ color: textPrimary }}
            aria-label="Promo code input"
          />
          <button
            className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
