'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function LoadingSkeleton() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen" style={{ background: isDark ? '#0A0A0F' : '#FAF8F3' }}>
      {/* Header Skeleton */}
      <div className="h-20 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="w-40 h-10 skeleton" />
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl skeleton" />
            <div className="w-10 h-10 rounded-xl skeleton" />
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="h-[500px] relative overflow-hidden">
        <div className="absolute inset-0 skeleton" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-64 h-12 skeleton mx-auto" />
            <div className="w-96 h-6 skeleton mx-auto" />
            <div className="w-48 h-12 skeleton mx-auto mt-8" />
          </div>
        </div>
      </div>

      {/* Menu Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="w-48 h-8 skeleton mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-3xl overflow-hidden">
              <div className="h-48 skeleton" />
              <div className="p-4 space-y-3">
                <div className="w-3/4 h-6 skeleton" />
                <div className="w-full h-4 skeleton" />
                <div className="w-1/2 h-5 skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
