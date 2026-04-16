'use client';

import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

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

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  isDark: boolean;
}

export default function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  isDark,
}: CartSidebarProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 2000 ? 0 : 200;
  const total = subtotal + deliveryFee;

  const bg = isDark ? '#111118' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';
  const itemBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      )}
      <div
        className={`cart-sidebar fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 flex flex-col shadow-2xl ${isOpen ? 'open' : 'closed'}`}
        style={{ background: bg, borderLeft: `1px solid ${borderColor}` }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor }}
        >
          <div>
            <h2 className="font-display font-black text-xl" style={{ color: textPrimary }}>
              Your Cart
            </h2>
            <p className="text-xs mt-0.5" style={{ color: textMuted }}>
              {items.length === 0 ? 'Empty' : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
              color: textPrimary,
            }}
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <div className="text-6xl">🛒</div>
              <div className="text-center">
                <p className="font-bold text-base" style={{ color: textPrimary }}>
                  Your cart is empty
                </p>
                <p className="text-sm mt-1" style={{ color: textMuted }}>
                  Add some delicious items!
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl p-4 flex gap-3"
                style={{ background: itemBg, border: `1px solid ${borderColor}` }}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <AppImage src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className="text-sm font-bold leading-tight truncate"
                      style={{ color: textPrimary }}
                    >
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all hover:bg-red-500/20 hover:text-red-400"
                      style={{ color: textMuted }}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                  {item.variation && (
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      {item.variation}
                    </p>
                  )}
                  {item.addons.length > 0 && (
                    <p className="text-xs mt-0.5 truncate" style={{ color: textMuted }}>
                      + {item.addons.join(', ')}
                    </p>
                  )}
                  {item.spiceLevel && (
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      🌶️ {item.spiceLevel}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-black text-amber-500">
                      ₨{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="qty-btn w-7 h-7 text-base hover:bg-amber-500/15 transition-colors"
                        style={{ color: textPrimary }}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span
                        className="w-6 text-center text-sm font-black"
                        style={{ color: textPrimary }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="qty-btn w-7 h-7 text-base bg-amber-500 text-white hover:bg-amber-400 transition-colors"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t space-y-4" style={{ borderColor }}>
            <div className="space-y-2">
              <div className="flex justify-between text-sm" style={{ color: textMuted }}>
                <span>Subtotal</span>
                <span>₨{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: textMuted }}>
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-emerald-400 font-semibold' : ''}>
                  {deliveryFee === 0 ? 'FREE 🎉' : `₨${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs" style={{ color: textMuted }}>
                  Add ₨{(2000 - subtotal).toLocaleString()} more for free delivery
                </p>
              )}
              <div
                className="flex justify-between font-black text-base pt-2 border-t"
                style={{ borderColor, color: textPrimary }}
              >
                <span>Total</span>
                <span className="text-amber-500">₨{total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-4 rounded-2xl font-bold text-white text-center text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
              }}
            >
              Proceed to Checkout →
            </Link>

            <a
              href={`https://wa.me/923001234567?text=Hi! I'd like to order: ${items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}. Total: ₨${total.toLocaleString()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-2xl font-bold text-white text-center text-sm whatsapp-btn"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </span>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
