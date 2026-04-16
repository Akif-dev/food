'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Addon {
  id: string;
  name: string;
  price: number;
}
interface Variation {
  id: string;
  name: string;
  priceAdd: number;
}
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
  category: string;
  isVeg: boolean;
  badge?: string;
  prepTime: string;
  calories: string;
  variations?: Variation[];
  addons?: Addon[];
  spiceLevels?: string[];
}
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

interface FoodModalProps {
  item: MenuItem;
  isDark: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function FoodModal({ item, isDark, onClose, onAddToCart }: FoodModalProps) {
  const [selectedVariation, setSelectedVariation] = useState<string>(
    item.variations?.[0]?.id || ''
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedSpice, setSelectedSpice] = useState<string>(item.spiceLevels?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const variationExtra = item.variations?.find((v) => v.id === selectedVariation)?.priceAdd || 0;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    return sum + (item.addons?.find((a) => a.id === addonId)?.price || 0);
  }, 0);
  const unitPrice = item.price + variationExtra + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const handleAdd = () => {
    setAdding(true);
    const cartItem: CartItem = {
      id: `${item.id}-${selectedVariation}-${selectedAddons.join(',')}-${Date.now()}`,
      itemId: item.id,
      name: item.name,
      price: unitPrice,
      quantity,
      image: item.image,
      variation: item.variations?.find((v) => v.id === selectedVariation)?.name,
      addons: selectedAddons.map((id) => item.addons?.find((a) => a.id === id)?.name || ''),
      spiceLevel: selectedSpice,
    };
    setTimeout(() => {
      onAddToCart(cartItem);
      setAdding(false);
      onClose();
    }, 600);
  };

  const cardBg = isDark ? '#1A1A24' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const textMuted = isDark ? 'rgba(245,245,240,0.5)' : '#6B6B7A';
  const sectionBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal-content w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: cardBg, border: `1px solid ${borderColor}` }}
      >
        {/* Image */}
        <div className="relative h-64 sm:h-72">
          <AppImage src={item.image} alt={item.alt} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all"
            aria-label="Close modal"
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

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {item.badge && (
              <span className="badge-popular text-white px-3 py-1 rounded-xl text-xs font-bold">
                {item.badge}
              </span>
            )}
            {item.isVeg && (
              <span className="badge-veg text-white px-2 py-1 rounded-xl text-xs font-bold">
                VEG
              </span>
            )}
          </div>

          {/* Meta on image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <h2 className="text-white font-display font-black text-2xl leading-tight">
                {item.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-white/70 text-xs">{item.category}</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/70 text-xs">⏱ {item.prepTime}</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/70 text-xs">🔥 {item.calories}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-amber-400 font-display font-black text-xl">
                ₨{item.price.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <svg className="w-3 h-3 star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white/70 text-xs">
                  {item.rating} ({item.reviews})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
            {item.description}
          </p>

          {/* Variations */}
          {item.variations && item.variations.length > 0 && (
            <div
              className="rounded-2xl p-4"
              style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
            >
              <h4 className="text-sm font-bold mb-3" style={{ color: textPrimary }}>
                Size / Variation
                <span className="text-xs font-normal ml-2" style={{ color: textMuted }}>
                  Required
                </span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.variations.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariation(v.id)}
                    className={`variation-btn ${selectedVariation === v.id ? 'selected' : ''}`}
                    style={{
                      color: selectedVariation === v.id ? '#F59E0B' : textMuted,
                      borderColor: selectedVariation === v.id ? '#F59E0B' : borderColor,
                      background:
                        selectedVariation === v.id ? 'rgba(245,158,11,0.1)' : 'transparent',
                    }}
                  >
                    {v.name}
                    {v.priceAdd > 0 && (
                      <span className="ml-1 text-xs opacity-70">+₨{v.priceAdd}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level */}
          {item.spiceLevels && item.spiceLevels.length > 0 && (
            <div
              className="rounded-2xl p-4"
              style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
            >
              <h4 className="text-sm font-bold mb-3" style={{ color: textPrimary }}>
                🌶️ Spice Level
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.spiceLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSpice(level)}
                    className={`spice-btn ${selectedSpice === level ? 'selected' : ''}`}
                    style={{
                      color: selectedSpice === level ? '#EF4444' : textMuted,
                      borderColor: selectedSpice === level ? '#EF4444' : borderColor,
                      background: selectedSpice === level ? 'rgba(239,68,68,0.1)' : 'transparent',
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Addons */}
          {item.addons && item.addons.length > 0 && (
            <div
              className="rounded-2xl p-4"
              style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
            >
              <h4 className="text-sm font-bold mb-3" style={{ color: textPrimary }}>
                ✨ Extras & Add-ons
                <span className="text-xs font-normal ml-2" style={{ color: textMuted }}>
                  Optional
                </span>
              </h4>
              <div className="space-y-2">
                {item.addons.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-amber-500/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`addon-check ${checked ? 'checked' : ''}`}>
                          {checked && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium" style={{ color: textPrimary }}>
                          {addon.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-amber-500">+₨{addon.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 pt-2">
            {/* Quantity */}
            <div
              className="flex items-center gap-1 rounded-2xl p-1"
              style={{ background: sectionBg, border: `1px solid ${borderColor}` }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="qty-btn hover:bg-amber-500/15 transition-colors"
                style={{ color: textPrimary }}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span
                className="w-10 text-center font-black text-base"
                style={{ color: textPrimary }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="qty-btn bg-amber-500 text-white hover:bg-amber-400 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAdd}
              disabled={adding}
              className="flex-1 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
              style={{
                background: adding ? '#10B981' : 'linear-gradient(135deg, #F59E0B, #F97316)',
                boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
              }}
            >
              {adding ? (
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
                  Adding...
                </>
              ) : (
                <>
                  Add {quantity > 1 ? `${quantity}x ` : ''}to Cart
                  <span className="font-display font-black">₨{totalPrice.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
