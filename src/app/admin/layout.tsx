'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      // Use touch capability and screen size for better mobile detection
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024; // Use 1024 for tablet/mobile
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, sidebarOpen]);

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/menu', label: 'Menu Items', icon: '🍔' },
    { href: '/admin/orders', label: 'Orders', icon: '📋' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/categories', label: 'Categories', icon: '📁' },
  ];

  return (
    <div
      style={{ background: isDark ? '#0A0A0F' : '#FAF8F3', minHeight: '100vh' }}
      className="theme-transition"
    >
      {/* Mobile Backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 flex flex-col ${
          isMobile
            ? sidebarOpen
              ? 'w-72 translate-x-0'
              : 'w-72 -translate-x-full'
            : sidebarOpen
              ? 'w-64'
              : 'w-20'
        }`}
        style={{ background: isDark ? '#111118' : '#FFFFFF' }}
      >
        <div
          className="p-4 border-b flex items-center justify-between flex-shrink-0"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              🍽️
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <h1
                  className="font-bold text-lg truncate"
                  style={{ color: isDark ? '#F5F5F0' : '#1A1A24' }}
                >
                  Ice n Spice
                </h1>
                <p
                  className="text-xs truncate"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7A' }}
                >
                  Restaurant Management
                </p>
              </div>
            )}
          </div>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/5 text-gray-600'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <nav className="p-4 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-500'
                    : isDark
                      ? 'text-white/70 hover:bg-white/5'
                      : 'text-gray-600 hover:bg-black/5'
                }`}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="font-medium truncate">{item.label}</span>}
              </Link>
            );
          })}

          <div
            className="mt-6 pt-4 border-t"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
          >
            <Link
              href="/"
              onClick={() => isMobile && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isDark ? 'text-white/70 hover:bg-white/5' : 'text-gray-600 hover:bg-black/5'
              }`}
            >
              <span className="text-xl flex-shrink-0">🏠</span>
              {sidebarOpen && <span className="font-medium truncate">Back to Site</span>}
            </Link>
            <button
              onClick={() => {
                document.cookie = 'admin_password=; path=/; max-age=0';
                window.location.href = '/admin/login';
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full mt-2 ${
                isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-500/10'
              }`}
            >
              <span className="text-xl flex-shrink-0">🚪</span>
              {sidebarOpen && <span className="font-medium truncate">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${isMobile ? 'ml-0' : sidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        {/* Top Bar */}
        <header
          className="h-16 px-6 flex items-center justify-between border-b sticky top-0 z-30"
          style={{
            background: isDark ? '#111118' : '#FFFFFF',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/5 text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/5 text-gray-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <div
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              Admin
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 overflow-x-auto">{children}</div>
      </main>
    </div>
  );
}
