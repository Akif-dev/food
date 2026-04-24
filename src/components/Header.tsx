'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

export default function Header({
  cartCount = 0,
  onCartClick,
  isDark = true,
  onThemeToggle,
}: HeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [badgeAnimate, setBadgeAnimate] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setBadgeAnimate(true);
      const t = setTimeout(() => setBadgeAnimate(false), 400);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const navLinks = [
    { href: '/', label: 'Home', icon: 'HomeIcon' },
    { href: '/about', label: 'About', icon: 'InformationCircleIcon' },
    { href: '/contact', label: 'Contact', icon: 'PhoneIcon' },
  ];

  const glassClass = isDark
    ? 'bg-brand-dark/80 border-white/8 backdrop-blur-xl'
    : 'bg-white/80 border-black/6 backdrop-blur-xl';

  const scrolledClass = scrolled ? `${glassClass} shadow-2xl` : 'bg-transparent border-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolledClass}`}
      style={{
        borderColor: scrolled
          ? isDark
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(0,0,0,0.05)'
          : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo-ins-akif.png"
                alt="Ice n Spice Logo"
                className="w-40 transition-all duration-300 group-hover:scale-110"
              />
              <div
                className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-current animate-pulse"
                style={{ borderColor: isDark ? '#0A0A0F' : '#FAF8F3' }}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'text-amber-400'
                      : isDark
                        ? 'text-white/60 hover:text-white hover:bg-white/5'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/20" />
                  )}
                  <Icon
                    name={link.icon as any}
                    size={16}
                    variant={isActive ? 'solid' : 'outline'}
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? 'bg-white/8 hover:bg-white/15 text-white/70'
                  : 'bg-black/5 hover:bg-black/10 text-gray-600'
              }`}
              aria-label="Toggle theme"
            >
              <Icon name={isDark ? 'SunIcon' : 'MoonIcon'} size={18} variant="outline" />
            </button>

            {/* User Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? 'bg-white/8 hover:bg-white/15 text-white/70'
                      : 'bg-black/5 hover:bg-black/10 text-gray-600'
                  }`}
                  aria-label="User menu"
                >
                  <Icon name="UserIcon" size={18} variant="outline" />
                </button>

                {userMenuOpen && (
                  <div
                    className={`absolute right-0 top-12 w-48 rounded-xl shadow-2xl py-2 z-50 ${
                      isDark
                        ? 'bg-brand-dark border border-white/8'
                        : 'bg-white border border-black/6'
                    }`}
                  >
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className={`block px-4 py-2 text-sm font-semibold transition-colors ${
                        isDark
                          ? 'text-white/70 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                      }`}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                        isDark
                          ? 'text-red-400 hover:text-red-300 hover:bg-white/5'
                          : 'text-red-500 hover:text-red-600 hover:bg-black/5'
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isDark
                    ? 'bg-white/8 hover:bg-white/15 text-white/70'
                    : 'bg-black/5 hover:bg-black/10 text-gray-600'
                }`}
              >
                Login
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-neon-amber transition-all duration-300 hover:scale-105"
              aria-label="View cart"
            >
              <Icon name="ShoppingCartIcon" size={18} variant="outline" />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 rounded-full bg-crimson-DEFAULT text-white text-xs font-black flex items-center justify-center px-1 border-2 ${isDark ? 'border-brand-dark' : 'border-white'} ${badgeAnimate ? 'cart-badge-animate' : ''}`}
                  style={{ borderColor: isDark ? '#0A0A0F' : '#FAF8F3', background: '#EF4444' }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? 'bg-white/8 hover:bg-white/15 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-gray-700'
              }`}
              aria-label="Toggle menu"
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} variant="outline" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: isDark ? 'rgba(10,10,15,0.98)' : 'rgba(250,248,243,0.98)' }}
      >
        <div className="px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-400 border border-amber-500/20'
                    : isDark
                      ? 'text-white/60 hover:text-white hover:bg-white/5'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                }`}
              >
                <Icon name={link.icon as any} size={18} variant={isActive ? 'solid' : 'outline'} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
